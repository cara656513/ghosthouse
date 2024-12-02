import React, { useState, useEffect } from 'react';
import supabase from '../utils/supabaseClient';
import styled from 'styled-components';
import { data, Navigate, useNavigate } from 'react-router-dom';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { v4 as uuidv4 } from 'uuid';
import {
  OverlayModal,
  ModalContent,
  ProfileContainer,
  ProfileImage,
  ProfileInput,
  ModalProfile,
  NicknameText,
  NicknameEditBtn,
  CloseModalBtn
} from '../components/mypage/modalstyle';

import {
  MyPofileTable,
  ProfileImageWrap,
  MyPageListProfileImg,
  MyNickname,
  OpenModalBtn
} from '../components/mypage/myfrofilestyle';

import {
  MypostList,
  PostCard,
  PostTitle,
  PostCreated,
  Popo,
  PostMap,
  PostImage,
  PostText,
  PostBut,
  PostEditDelete
} from '../components/mypage/postliststyle';

const Wrap = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  height: auto;
`;

const MyPage = () => {
  const [contents, setContents] = useState({ posts: [], postCount: 0 }); // 게시글 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [profileImg, setProfileImg] = useState(null); // 프로필 이미지 상태
  const [selectedFile, setSelectedFile] = useState(null); // 업로드 파일 상태
  const [newNickname, setNewNickname] = useState(''); // 새 닉네임 상태
  const [userData, setUserData] = useState(null); // 사용자 데이터 상태
  const [nickname, setNickname] = useState('');
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const navigate = useNavigate();

  // 사용자 정보 가져오기
  const fetchUserData = async () => {
    try {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;

      const userId = authData.user?.id;
      if (!userId) throw new Error('User ID not found.');

      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id, nickname, profile_img')
        .eq('id', userId)
        .single();

      if (userError) throw userError;

      setUserData(user);
      setNickname(user.nickname);
      setProfileImg(user.profile_img);
    } catch (err) {
      console.error('Failed to fetch user data:', err.message);
    }
  };

  // 게시글 데이터 가져오기
  const fetchContents = async () => {
    if (!userData?.id) {
      console.warn('User data is not initialized.');
      return;
    }

    try {
      const { data, count, error } = await supabase
        .from('posts')
        .select('id, title, content, created_at, post_img, longitude, latitude', { count: 'exact' })
        .eq('user_id', userData.id);
      setLongitude(data[0].longitude);
      setLatitude(data[0].latitude);
      if (error) throw error;

      const formattedData = data.map((item) => ({
        ...item,
        created_at: new Date(item.created_at).toISOString().slice(0, 16).replace('T', ' ')
      }));

      setContents({ posts: formattedData, postCount: count });
    } catch (err) {
      console.error('Failed to fetch posts:', err.message);
    }
  };

  console.log(longitude, latitude);
  // 닉네임 변경하기
  const updateNickname = async () => {
    if (!newNickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    if (!userData?.id) {
      console.error('User data is not initialized.');
      alert('사용자 데이터가 준비되지 않았습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    try {
      const { error } = await supabase.from('users').update({ nickname: newNickname }).eq('id', userData.id);

      if (error) {
        throw error;
      }

      alert('닉네임이 성공적으로 변경되었습니다!');
      setNewNickname('');
      await fetchUserData(); // 사용자 데이터 다시 로드
    } catch (err) {
      console.error('닉네임 변경 실패:', err.message);
      alert('닉네임 변경에 실패했습니다.');
    }
  };

  // 파일 변경 핸들러
  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // 파일 선택
    if (file) {
      setSelectedFile(file); // 선택된 파일 상태로 저장

      // 이미지 미리보기 URL 생성 (로컬)
      const previewUrl = URL.createObjectURL(file);
      setProfileImg(previewUrl); // 미리보기 이미지로 설정

      console.log('미리보기 URL:', previewUrl); // 디버그용 로그
    }
  };

  // 이미지 업로드 함수
  const uploadImage = async (file) => {
    const fileName = `${userData.id}-${Date.now()}.png`; // 고유 파일 이름 생성
    const filePath = `Profile_img/${fileName}`; // 업로드 경로

    try {
      // 파일 업로드
      const { data, error } = await supabase.storage.from('Image').upload(filePath, file);

      if (error) {
        console.error('파일 업로드 실패:', error.message);
        throw error;
      }

      // 업로드된 파일 경로 확인
      console.log('업로드된 경로:', data.path);

      // Public URL 가져오기
      const { data: publicData, error: publicError } = supabase.storage.from('Image').getPublicUrl(data.path);

      if (publicError) {
        console.error('Public URL 가져오기 실패:', publicError.message);
        throw publicError;
      }

      console.log('업로드된 이미지 URL:', publicData.publicUrl);
      return publicData.publicUrl;
    } catch (err) {
      console.error('이미지 업로드 중 오류 발생:', err.message);
      return null;
    }
  };

  // 프로필 업로드 및 업데이트 함수
  const uploadAndSaveProfile = async () => {
    if (!selectedFile) {
      alert('파일을 선택해주세요.');
      return;
    }

    if (!userData?.id) {
      console.error('사용자 데이터가 초기화되지 않았습니다.');
      return;
    }

    // 이미지 업로드
    const imageUrl = await uploadImage(selectedFile);
    if (!imageUrl) {
      alert('이미지 업로드에 실패했습니다.');
      return;
    }

    console.log('최종 업로드된 이미지 URL:', imageUrl); // 디버깅용 로그

    try {
      // 사용자 데이터베이스에 프로필 URL 업데이트
      const { error } = await supabase.from('users').update({ profile_img: imageUrl }).eq('id', userData.id);

      if (error) throw error;

      alert('프로필 이미지가 성공적으로 업데이트되었습니다!');
      setProfileImg(imageUrl); // UI에서 새 이미지로 업데이트
    } catch (err) {
      console.error('프로필 업데이트 실패:', err.message);
    }
  };

  const handleDelete = async (postId) => {
    try {
      // 삭제를 테스트 하기 위해서 임시 값을 넣어둠
      const { error } = await supabase.from('posts').delete().eq('id', postId);
      // 현제 코드는 로그인값이 구현되지 않아서 userId값이 아니라 tsetID값을 사용중임
      if (error) {
        console.log(error);
        alert('삭제 중 문제가 발생했습니다.');
      } else {
        // posts 배열에서 삭제된 게시글을 필터링하여 상태 업데이트
        setContents((prevData) => ({
          ...prevData, // 기존 객체 유지
          posts: prevData.posts.filter((post) => post.id !== postId) // posts 배열 업데이트
        }));

        alert('게시물이 삭제되었습니다.');
      }
    } catch (err) {
      console.error('삭제 중 예외 발생:', err.message);
    }
  };

  // 사용자 정보 로드
  useEffect(() => {
    fetchUserData();
  }, []);

  // 게시글 로드
  useEffect(() => {
    if (userData) {
      fetchContents();
    }
  }, [userData]);
  const handleDitailpage = () => {
    navigate('/detail');
  };

  return (
    <Wrap>
      <MyPofileTable>
        <ProfileImageWrap>
          <MyPageListProfileImg src={profileImg || '/default-profile.png'} alt="Profile" />
        </ProfileImageWrap>
        <ul>
          <p>{nickname}님 안녕하세요.</p>
          <p>{contents.postCount}개의 게시물이 있습니다.</p>
        </ul>
        <OpenModalBtn onClick={() => setIsModalOpen(true)}>프로필 수정</OpenModalBtn>
      </MyPofileTable>

      <MypostList>
        {contents.posts.map((item) => (
          <PostCard key={item.id}>
            <PostTitle>{item.title}</PostTitle>
            <PostCreated>{item.created_at}</PostCreated>
            <Map // 지도를 표시할 Container
              id="map"
              center={{ lng: longitude, lat: latitude }}
              style={{
                width: '40%',
                height: '550px'
              }}
              level={3}
            />
            <PostImg>{item.post_img}</PostImg>
            <PostText>{item.content}</PostText>
            <PostBut>
              <PostEditDelete onClick={handleDitailpage}>수정</PostEditDelete>
              <PostEditDelete onClick={() => handleDelete(item.id)}>삭제</PostEditDelete>
            </PostBut>
          </PostCard>
        ))}
      </MypostList>

      {isModalOpen && (
        <OverlayModal onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ProfileContainer>
              <ProfileImage src={profileImg || '/default-profile.png'} alt="Profile" />
              <ProfileInput type="file" accept="image/*" onChange={handleFileChange} />
              <button onClick={uploadAndSaveProfile}>프로필 수정 업로드</button>
            </ProfileContainer>
            <ModalProfile>
              <p>{nickname}님</p>
              <input
                type="text"
                placeholder="새 닉네임"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
              />
              <button onClick={updateNickname}>닉네임 변경</button>
            </ModalProfile>
            <CloseModalBtn onClick={() => setIsModalOpen(false)}>닫기</CloseModalBtn>
          </ModalContent>
        </OverlayModal>
      )}
    </Wrap>
  );
};

const PostImg = styled.image`
  height: 500px;
`;

const NicknameEdit = styled.input`
  height: 40px;
  border-radius: 10px;
  margin-left: 70px;
`;

export default MyPage;
