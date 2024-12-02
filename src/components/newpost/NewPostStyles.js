import styled from 'styled-components';

export const WholeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  margin-top: 100px;
  padding: 100px;
  height: 100%;
  background-color: #ffffff36;
`;

export const Form = styled.form`
  display: grid;
  place-items: center;

  input,
  label {
    width: 400px;
    border-radius: 10px;
    margin: 5px;
    padding: 20px;
    background-color: #000000ab;
    color: #ffffff;
    border: transparent;

    &::placeholder {
      color: white;
    }
  }

  button {
    border: transparent;
    border-radius: 10px;
    background-color: black;
    color: red;
    margin: 5px;
    padding: 10px;
    width: 200px;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed; /* 화면에 고정 */
  top: 0;
  left: 0;
  width: 100vw; /* 전체 화면 가로 채우기 */
  height: 100vh; /* 전체 화면 세로 채우기 */
  background-color: rgba(0, 0, 0, 0.5); /* 반투명한 배경 */
  z-index: 1000; /* 다른 요소들 위로 올라오게 */
`;

export const ModalContent = styled.div`
  position: absolute; /* 부모 요소 기준 배치 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 중앙 정렬 */
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  z-index: 1001; /* overlay보다 위에 위치 */
`;

export const Input = styled.input`
  height: 285px;
`;
