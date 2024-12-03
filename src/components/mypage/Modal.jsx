import styled from 'styled-components';
import {
  OverlayModal,
  ModalContent,
  ProfileContainer,
  ProfileImage,
  ProfileInput,
  ModalProfile,
  NicknameText,
  NicknameEditBtn,
  CloseModalBtn,
  ModalInput
} from '../../components/mypage/modalstyle';

const UploadProfileBtn = styled.button`
  padding: 10px;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-right: 50px;
  background-color: black;
  color: red;
`;

import React from 'react';

const Modal = ({
  profileImg,
  handleFileChange,
  uploadAndSaveProfile,
  nickname,
  newNickname,
  setNewNickname,
  updateNickname,
  setIsModalOpen
}) => {
  return (
    <OverlayModal onClick={() => setIsModalOpen(false)}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ProfileContainer>
          <ProfileImage src={profileImg || '/default-profile.png'} alt="Profile" />
          <ProfileInput type="file" accept="image/*" onChange={handleFileChange} />
          <UploadProfileBtn onClick={uploadAndSaveProfile}>프로필 수정하기</UploadProfileBtn>
        </ProfileContainer>
        <ModalProfile>
          <p>{nickname}님</p>
          <ModalInput
            type="text"
            placeholder="nickname"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
          />
          <NicknameEditBtn onClick={updateNickname}>닉네임 변경</NicknameEditBtn>
        </ModalProfile>
        <CloseModalBtn onClick={() => setIsModalOpen(false)}>닫기</CloseModalBtn>
      </ModalContent>
    </OverlayModal>
  );
};

export default Modal;
