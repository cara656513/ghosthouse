import React, { useState, useEffect } from 'react';
import supabase from '../utils/supabaseClient';
import styled from 'styled-components';
import { Navigate, useNavigate } from 'react-router-dom';

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
  margin-left: 170px;
`;

const OverlayModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: green; */
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const ModalContent = styled.div`
  background-color: #252525;
  padding: 50px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 700px;
  width: 1000px;
  max-width: 90%;
  z-index: 10;
  text-align: center;
  box-sizing: border-box;
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

const CloseModalBtn = styled.button`
  padding: 10px 20px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  &:hover {
    background-color: #a71d2a;
  }
`;

const ProfileImage = styled.img`
  display: block;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin: 20px auto;
  background-color: white;
  object-fit: cover;
`;

const ProfileInput = styled.input`
  text-indent: -99999em;
  border: 1px solid red;
  background-color: red;
  width: 25px;
  position: absolute;
  bottom: 70px;
  right: 50px;
`;

const MyPage = () => {
  const [contents, setContents] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImg, setProfileImg] = useState(null); // 기존 프로필 이미지
  const [selectedFile, setSelectedFile] = useState();
  const navigate = useNavigate();
  // const [data, setData] = useState([]);

  // 게시글 가져오기
  const fetchContents = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('id, content, image_url, created_at, title, latitude, longitude ');

    if (error) {
      setError(error.message);
      console.error('Error fetching contents:', error);
    } else {
      setContents(data);
      console.log('Fetched contents:', data);
    }
    // posts라는 테이블에 있는 created_at의 표시형식 바꾸는 법
    const formattedData = data.map((item) => ({
      ...item,
      created_at: new Date(item.created_at).toISOString().slice(0, 16).replace('T', '　')
    }));
    setContents(formattedData);
  };

  // 파일 선택 핸들
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setProfileImg(previewUrl);
    }
  };

  // 이미지 업로드
  const uploadImage = async (file, userId) => {
    const fileName = `${userId}-${Date.now()}`;
    const filePath = `Profile/${fileName}`;

    try {
      const { data, error } = await supabase.storage.from('Image').upload(filePath, file);

      if (error) {
        console.error('Failed to upload image:', error.message);
        return null;
      }

      const { publicUrl } = supabase.storage.from('Image').getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      console.error('Storage upload error:', err.message);
      return null;
    }
  };

  // 프로필 업데이트
  const updateUserProfile = async (userId, imageUrl) => {
    try {
      const { error } = await supabase.from('users').update({ profile: imageUrl }).eq('id', userId);

      if (error) {
        console.error('Failed to update profile URL:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.error('Profile update error:', err.message);
      return false;
    }
  };

  // 프로필 업로드 및 저장
  const uploadAndSaveProfile = async () => {
    const {
      data: { user },
      error
    } = await supabase.auth.getUser();
    if (error || !user) {
      alert('로그인 정보가 만료되었습니다 다시 로그인 해주세요.');
      return;
    }

    const userId = user.id;
    if (!selectedFile) {
      alert('파일을 선택해주세요.');
      return;
    }

    const imageUrl = await uploadImage(selectedFile, userId);
    if (!imageUrl) {
      alert('이미지 업로드 실패!');
      return;
    }

    const isUpdated = await updateUserProfile(userId, imageUrl);
    if (isUpdated) {
      alert('프로필 이미지가 성공적으로 업데이트되었습니다!');
      // 수정된 부분: 업로드 성공 시 프로필 이미지를 바로 갱신
      setProfileImg(imageUrl); // UI 상에서 새 프로필 이미지 표시
    } else {
      alert('프로필 URL 저장 실패!!');
    }
  };

  const handleDelete = async () => {
    const testId = 1;
    // 삭제를 테스트 하기 위해서 임시 값을 넣어둠
    const { error } = await supabase.from('posts').delete().eq('id', testId);
    // 현제 코드는 로그인값이 구현되지 않아서 userId값이 아니라 tsetID값을 사용중임
    if (error) {
      console.log(error);
      alert('삭제 중 문제가 발생했습니다.');
    } else {
      setContents((prevData) => prevData.filter((posts) => posts.id !== testId));
      alert('게시물이 삭제되었습니다.');
      // 현제 코드는 로그인값이 구현되지 않아서 userId값이 아니라 tsetID값을 사용중임
    }
  };

  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    // 삭제: setProfileImg(null); // 모달 닫을 때 미리보기 초기화 제거
  };

  // 게시글 가져오기 실행
  useEffect(() => {
    fetchContents();
  }, []);

  const handleDitailpage = () => {
    navigate('/detail');
  };

  return (
    <Wrap>
      <MyPofileTable>
        <ProfileImageWrap>
          <MyPageListProfileImg src={profileImg} alt="Profile" />
        </ProfileImageWrap>
        <ul>
          <p>UserNickName</p>
          <p>게시글 수</p>
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
        {contents.map((item) => (
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
        {error && <p>Error: {error}</p>}
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
            <h1>우석님 프로필 페이지</h1>
            <ProfileContainer>
              <ProfileImage src={profileImg} alt="Profile" /> {/* 수정: 현재 프로필 이미지 표시 */}
              <ProfileInput type="file" accept="image/*" onChange={handleFileChange} />
              <button onClick={uploadAndSaveProfile}>프로필 수정 업로드</button>
            </ProfileContainer>
            <p>닉네임 변경하기</p>
            <p>id</p>
            <CloseModalBtn onClick={closeModal}>Close Modal</CloseModalBtn>
          </ModalContent>
        </OverlayModal>
      )}
    </Wrap>
  );
};

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

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 30%;
  border: 1px solid red;
  position: relative;
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
