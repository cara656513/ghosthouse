import React, { useState, useEffect } from 'react';
import supabase from '../utils/supabaseClient';
import styled from 'styled-components';

const OpenModalBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
  background-color: green;
`;

const OverlayModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

  // 게시글 가져오기
  const fetchContents = async () => {
    const { data, error } = await supabase.from('posts').select('id, content, image_url');

    if (error) {
      setError(error.message);
      console.error('Error fetching contents:', error);
    } else {
      setContents(data);
      console.log('Fetched contents:', data);
    }
  };

  // 파일 선택 핸들러
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
      alert('Failed to fetch user information.');
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
      alert('프로필 URL 저장 실패!');
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

  return (
    <div>
      <h1>마이 페이지</h1>
      <OpenModalBtn onClick={openModal}>프로필 수정</OpenModalBtn>
      {isModalOpen && (
        <OverlayModal onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h1>프로필 수정</h1>
            <ProfileContainer>
              <ProfileImage src={profileImg} alt="Profile" /> {/* 수정: 현재 프로필 이미지 표시 */}
              <ProfileInput type="file" accept="image/*" onChange={handleFileChange} />
              <button onClick={uploadAndSaveProfile}>프로필 수정 업로드</button>
            </ProfileContainer>
            <CloseModalBtn onClick={closeModal}>Close Modal</CloseModalBtn>
          </ModalContent>
        </OverlayModal>
      )}
      <ul>
        {contents.map((item) => (
          <li key={item.id}>
            <p>{item.content}</p>
            <img src={item.image_url} alt={item.content || 'Image'} />
          </li>
        ))}
      </ul>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 30%;
  border: 1px solid red;
  position: relative;
`;

export default MyPage;
