import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavHeader = styled.header`
  background-color: rgba(0, 0, 0, 0.11);
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 99;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  backdrop-filter: blur(2px);
`;

export const NavLink = styled(Link)`
  color: #a80101;
  font-size: 30px;
  font-weight: bold;
  font-family: 'chiller', sans-serif;
  text-decoration: none;
  margin: 0 15px;
  cursor: pointer;

  &:hover {
    text-shadow: 0 0 10px #ff0000; /* 호버 효과 */
  }
`;

export const NavButton = styled.button`
  font-family: 'chiller', sans-serif;
  color: #a80101;
  background-color: transparent;
  border: none;
  font-size: 30px;
  font-weight: bold;
  margin: 0 15px;
  cursor: pointer;
  &:hover {
    text-shadow: 0 0 10px #ff0000; /* 호버 효과 */
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ModalOverlay = styled.div`
  inset: 0; //position을 줬을 때 상하좌우 모두 0으로
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 999;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalContent = styled.div`
  position: relative;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 1000px;
  }
`;
