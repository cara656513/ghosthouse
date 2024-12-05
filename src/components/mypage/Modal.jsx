import styled from 'styled-components';
import {
  OverlayModal,
  ModalContent,
  ProfileContainer,
  ProfileImage,
  ProfileInput,
  ModalProfile,
  NicknameEditBtn,
  CloseModalBtn,
  ModalInput,
  Nickname
} from '../../components/mypage/modalstyle';

const UploadProfileBtn = styled.button`
  padding: 10px;
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: #575555;
  color: white;
  cursor: pointer;

`;

const ModalbackImg = styled.div`
  position: absolute;
  background-image: url('/background-img2.jpg');
  opacity: 0.7;
  height: 600px;
  width: 900px;
`;

const ProfileImageNone = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin: 20px auto;
  background-color: #575555;
`;

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
        <ModalbackImg />
        <ProfileContainer>
          {profileImg ? <ProfileImage src={profileImg} alt="Profile" /> : <ProfileImageNone />}
          <div>
            <UploadProfileBtn onClick={uploadAndSaveProfile}>프로필 수정하기</UploadProfileBtn>
            <label>
              +
              <ProfileInput type="file" accept="image/*" onChange={handleFileChange} />
            </label>
          </div>
        </ProfileContainer>
        <ModalProfile>
          <Nickname>{nickname}님</Nickname>
          <ModalInput
            type="text"
            placeholder="nickname"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
          />
          <NicknameEditBtn onClick={updateNickname}>닉네임 변경</NicknameEditBtn>
        </ModalProfile>
        <CloseModalBtn onClick={() => setIsModalOpen(false)}>X</CloseModalBtn>
      </ModalContent>
    </OverlayModal>
  );
};

export default Modal;
