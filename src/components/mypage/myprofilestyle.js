import styled from 'styled-components';

export const MyPofileTable = styled.div`
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

export const ProfileImageWrap = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: white;
  background: url(./ghostProfileImg.png) no-repeat center/cover;
  text-indent: -9999em;
`;

export const MyPageListProfileImg = styled.img`
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

export const MyNickname = styled.p`
  color: #a80101;
`;

export const OpenModalBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 70px;
  background-color: red;
  font-size: 10px;
  border-radius: 10px;
  margin-left: 30px;
`;
