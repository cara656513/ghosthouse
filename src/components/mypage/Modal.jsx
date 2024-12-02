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
} from '../../components/mypage/modalstyle';

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
  );
};

export default Modal;
