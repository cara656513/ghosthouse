import React, { useState, useEffect } from 'react';
import supabase from '../utils/supabaseClient';
import styled from 'styled-components';
import { Navigate, useNavigate } from 'react-router-dom';
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

const Wrap = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  height: auto;
`;

const OpenModalBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 70px;
  background-color: red;
  font-size: 10px;
  border-radius: 10px;
  margin-left: 30px;
`;

const MyPageListProfileImg = styled.img`
  display: block;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: white;
  position: relative; /* ::after 사용을 위해 추가 */

  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;

  &:hover {
    opacity: 0; /* 마우스 호버 시 기본 이미지 숨기기 */
  }

  &::after {
    content: '';
    background-color: black;
    position: absolute;
    top: 50;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: url(./ghostProfileImg.png) no-repeat center/cover; /* 대체 이미지 설정 */
    transform: translate(-70%, -70%) scale(1);
    opacity: 1; /* 항상 표시 */
    z-index: 1; /* 기존 이미지 위에 나타남 */
    transition: transform 0.3s ease, opacity 0.3s ease;
    text-indent: -9999em;
  }

  &:hover::after {
    transform: translate(-50%, -50%) scale(4.5); /* 호버 시 이미지 확대 */
    opacity: 1;
  }
`;

const MyPage = () => {
  const [contents, setContents] = useState({ posts: [], postCount: 0 }); // 게시글 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [profileImg, setProfileImg] = useState(null); // 프로필 이미지 상태
  const [selectedFile, setSelectedFile] = useState(null); // 업로드 파일 상태
  const [newNickname, setNewNickname] = useState(''); // 새 닉네임 상태
  const [userData, setUserData] = useState(null); // 사용자 데이터 상태
  const [nickname, setNickname] = useState();
  const navigate = useNavigate(); // 페이지 이동

  // 사용자 정보 가져오기
  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      setUserData(data.user);
      setProfileImg(data.user?.profile);
    } catch (err) {
      console.error('사용자 정보를 가져오는데 실패했습니다.', err.message);
    }
  };

  // 게시글 데이터 가져오기
  const fetchContents = async () => {
    if (!userData) return;
    try {
      const { data, count, error } = await supabase
        .from('posts')
        .select(
          `
          id,
          title,
          content,
          created_at,
          users (
            nickname,
            profile
          )
        `,
          { count: 'exact' }
        )
        .eq('user_id', userData.id);

      if (error) throw error;

      const formattedData = data.map((item) => ({
        ...item,
        created_at: new Date(item.created_at).toISOString().slice(0, 16).replace('T', ' ')
      }));
      setContents({ posts: formattedData, postCount: count });
    } catch (err) {
      console.error('게시글을 가져오는데 실패했습니다.', err.message);
    }
  };

  // 닉네임 변경하기
  const updateNickname = async () => {
    if (!newNickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    try {
      const { error } = await supabase.from('users').update({ nickname: newNickname }).eq('id', userData.id);

      if (error) throw error;
      alert('닉네임이 변경되었습니다!');
      setUserData((prev) => ({ ...prev, nickname: newNickname }));
    } catch (err) {
      console.error('닉네임 변경 실패:', err.message);
      alert('닉네임 변경에 실패했습니다.');
    }
  };

  // 파일 변경 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setNickname(data.nickname);
      setProfileImg(previewUrl);
    }
  };

  // 이미지 업로드
  const uploadImage = async (file) => {
    const fileName = `${userData.id}-${Date.now()}`;
    const filePath = `Profile/${fileName}`;

    try {
      const { data, error } = await supabase.storage.from('Image').upload(filePath, file);

      if (error) throw error;
      const { publicUrl } = supabase.storage.from('Image').getPublicUrl(filePath);
      return publicUrl;
    } catch (err) {
      console.error('이미지 업로드 실패:', err.message);
      return null;
    }
  };

  // 프로필 업로드 및 업데이트
  const uploadAndSaveProfile = async () => {
    if (!selectedFile) {
      alert('파일을 선택해주세요.');
      return;
    }

    const imageUrl = await uploadImage(selectedFile);
    if (!imageUrl) {
      alert('이미지 업로드에 실패했습니다.');
      return;
    }

    try {
      const { error } = await supabase.from('users').update({ profile: imageUrl }).eq('id', userData.id);

      if (error) throw error;
      alert('프로필 이미지가 업데이트되었습니다!');
      setProfileImg(imageUrl);
    } catch (err) {
      console.error('프로필 업데이트 실패:', err.message);
    }
  };

  // 게시글 삭제하기
  const handleDelete = async (postId) => {
    try {
      const { error } = await supabase.from('posts').delete().eq('id', postId);
      if (error) throw error;
      alert('게시글이 삭제되었습니다.');
      setContents((prev) => prev.filter((post) => post.id !== postId));
    } catch (err) {
      console.error('게시글 삭제 실패:', err.message);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  // 게시글 수정 페이지 이동
  const handleDitailpage = (postId) => {
    navigate(`/edit/${postId}`);
  };

  // 모달 열고 닫기
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 컴포넌트가 로드될 때 사용자 정보 가져오기
  useEffect(() => {
    fetchUserData();
  }, []);

  // 사용자 정보 변경 시 게시글 다시 로드
  useEffect(() => {
    fetchContents();
  }, [userData]);

  return (
    <Wrap>
      <MyPofileTable>
        <ProfileImageWrap>
          <MyPageListProfileImg src={profileImg} alt="Profile" />
        </ProfileImageWrap>
        <ul>
          <MyNickname>{nickname}님 안녕하세요.</MyNickname>
          <p>{contents.postCount}개 입니다.</p>
        </ul>
        <OpenModalBtn onClick={openModal}>프로필 수정</OpenModalBtn>
      </MyPofileTable>

      <hr style={{ borderColor: '#bebebe3', marginBottom: '40px' }} />
      {/* //
      //
      // 마이페이지 내 게시물 리스트
      //
      // 
      // */}
      <MypostList>
        {contents.posts.map((item) => (
          <PostCard key={item.id}>
            <PostTitle>{item.title}</PostTitle>
            <PostCreated>{item.created_at} </PostCreated>
            <Popo>
              <PostMap>{}</PostMap>
              <PostImage></PostImage>
            </Popo>
            <PostText>{item.content}</PostText>
            {/* <img src={item.image_url} alt={item.content || 'Image'} /> */}
            <PostBut>
              <PostEditDelete onClick={handleDitailpage}>수정</PostEditDelete>
              <PostEditDelete onClick={handleDelete}>삭제</PostEditDelete>
            </PostBut>
          </PostCard>
        ))}
        {/* {error && <p>Error: {error}</p>} */}
      </MypostList>
      {/* //
      //
      //
      //
      //
      //
      //
      // */}
      {/* // 프로필 수정하기 모달 */}
      {isModalOpen && (
        <OverlayModal onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ProfileContainer>
              <ProfileImage src={profileImg} alt="Profile" /> {/* 수정: 현재 프로필 이미지 표시 */}
              <ProfileInput type="file" accept="image/*" onChange={handleFileChange} placeholder="👻" />
              <button onClick={uploadAndSaveProfile}>프로필 수정 업로드</button>
            </ProfileContainer>
            <ModalProfile>
              {/* <h1>{userData?.nickname}님 프로필 페이지</h1> */}
              {/* <p>닉네임 변경하기</p> */}
              <NicknameText>{nickname}님 안녕하세요</NicknameText>
              <NicknameEdit
                type="text"
                placeholder="새 닉네임"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
              />
              <NicknameEditBtn onClick={updateNickname}>닉네임 변경</NicknameEditBtn>
            </ModalProfile>
            <CloseModalBtn onClick={closeModal}>X</CloseModalBtn>
          </ModalContent>
        </OverlayModal>
      )}
    </Wrap>
  );
};

const MyNickname = styled.p`
  color: #a80101;
`;

const NicknameEdit = styled.input`
  height: 40px;
  border-radius: 10px;
  margin-left: 70px;
`;

const PostImage = styled.img`
  width: 350px;
  height: 300px;
  background-color: red;
  margin-left: 5px;
`;

const PostTitle = styled.h1`
  height: 10px;
  margin-bottom: 30px;
  font-size: 30px;
`;

const PostEditDelete = styled.button`
  display: flex;
  justify-content: end;
  align-items: end;
  height: 35px;
  width: 55px;
  border-radius: 10px;
  /* background-color: #383737; */
  background-color: black;
  color: #a80101;
`;
const PostCreated = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  margin-bottom: 20px;
`;
const Popo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostMap = styled.div`
  height: 300px;
  width: 350px;
  margin-right: 5px;
  background-color: yellow;
`;

const PostBut = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 500px;
  padding: 10px;
  margin-top: 10px;
`;

const PostText = styled.p`
  background-color: rgba(128, 128, 128, 0.2); /* 회색 + 50% 투명도 */
  height: 300px;
  width: 710px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: start;
`;

const PostCard = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 1000px;
  background-color: rgba(128, 128, 128, 0.5); /* 회색 + 50% 투명도 */
  margin-bottom: 100px;
  flex-direction: column;
`;

const MypostList = styled.ul`
  height: auto;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

const ProfileImageWrap = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: white;
  background: url(./ghostProfileImg.png) no-repeat center/cover;
  text-indent: -9999em;
`;

const MyPofileTable = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-left: 230px;
  /* background-color: #444444; */
  position: static;
  /* border-bottom: 2px solid #eee; */
  width: 100%;
  margin-top: 150px;
  /* margin-left: 300px; */
  gap: 20px;
  /* border: 10px solid red; */
  margin-bottom: 19px;
`;

export default MyPage;
