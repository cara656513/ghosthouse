import styled from 'styled-components';

export const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${(props) => `url(${props.bgImage}) no-repeat center center`};
  background-size: cover;
  filter: grayscale(50%) brightness(0.8);
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  gap: 50px;
  width: 90%;
  max-width: 1200px;
  background: rgba(0, 0, 0, 0.7);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.9);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 1);
  width: 400px;
`;

export const Input = styled.input`
  font-family: 'chiller', sans-serif;
  width: 100%;
  margin: 15px 0;
  padding: 20px;
  font-size: 25px;
  border: none;
  border-radius: 5px;
  color: white;
  background: rgba(255, 255, 255, 0.514);
  transition: background 0.3s;

  &::placeholder {
    color: red;
    font-size: 2rem;
  }

  &:focus {
    background: rgba(255, 255, 255, 0.2);
    outline: none;
  }
`;

export const Message = styled.p`
  margin-top: 10px;
  font-size: 1rem;
  color: ${(props) => (props.type === 'error' ? 'red' : 'green')};
  z-index: 100;
`;

export const Button = styled.button`
  font-family: 'chiller', sans-serif;
  margin-top: 20px;
  padding: 15px 30px;
  font-size: 2rem;
  background-color: black;
  color: red;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: red;
    color: black;
  }
`;

export const SliderContainer = styled.div`
  flex: 1;
  max-width: 450px;
  height: 460px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 1);
  border-radius: 10px;
  filter: grayscale(70%) brightness(0.7);
`;
