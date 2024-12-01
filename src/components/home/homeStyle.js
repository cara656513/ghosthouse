import styled from 'styled-components';

export const HomeWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  text-align: center;
  img {
    width: 30px;
    position: fixed;
    bottom: 30px;
  }
`;

export const HomeH1 = styled.h1`
  color: #a80101;
  font-size: 200px;
  font-weight: bold;
  font-family: 'chiller', sans-serif;
`;

export const HomeForm = styled.form`
  margin-top: 20px;
  display: flex;
  align-items: center;
  input {
    background-color: rgba(0, 0, 0, 0.4);
    border: none;
    width: 500px;
    height: 50px;
    padding-left: 20px;
    color: #a80101;
    font-weight: bold;
    font-family: 'chiller', sans-serif;
    border-radius: 20px;
    font-size: 20px;
  }
  button {
    color: #a80101;
    font-size: 45px;
    font-weight: bold;
    border: none;
    background-color: transparent;
    padding: 15px;
    cursor: pointer;
    margin-top: 7px;
  }
`;
