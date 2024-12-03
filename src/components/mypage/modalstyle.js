import styled from 'styled-components';

export const OverlayModal = styled.div`
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
  /* opacity: 0.9; */
  z-index: 1;
`;

export const ModalContent = styled.div`
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

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 30%;
  margin-top: 130px;
  /* border: 1px solid red; */
  position: relative;
`;

export const ProfileImage = styled.img`
  display: block;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin: 20px auto;
  background-color: white;
  object-fit: cover;
`;

export const ProfileInput = styled.input`
  text-indent: -99999em;
  border: 1px solid red;
  background-color: #575555;
  width: 25px;
  position: absolute;
  bottom: -3px;
  right: 50px;
  padding: 10px;
  border-radius: 20px;
`;

export const ModalInput = styled.input`
  font-family: 'chiller', sans-serif;
  height: 30px;
  width: 300px;
  border-radius: 10px;
  font-size: 30px;
  margin-top: 260px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalProfile = styled.div`
  /* background-color: green; */
  position: absolute;
  font-size: 30px;
  top: 200px;
  left: 850px;
`;

export const NicknameText = styled.p`
  margin-left: 100px;
  margin-top: 100px;
`;

export const NicknameEditBtn = styled.button`
  height: 43px;
  border-radius: 10px;
  margin-left: 20px;
  margin-top: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  color: red;
`;

export const Nickname = styled.p`
  position: absolute;
  top: 120px;
  left: 100px;
`;

export const CloseModalBtn = styled.button`
  padding: 10px 20px;
  background-color: #575555;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-size: 10px;
  position: absolute;
  top: 110px;
  left: 75%;
  transform: translateX(-50%);

  &:hover {
    background-color: #a71d2a;
  }
`;
