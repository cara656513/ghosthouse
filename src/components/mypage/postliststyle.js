import styled from 'styled-components';

export const MypostList = styled.ul`
  height: auto;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

export const PostCard = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 1000px;
  background-color: rgba(128, 128, 128, 0.5); /* 회색 + 50% 투명도 */
  margin-bottom: 100px;
  flex-direction: column;
`;

export const PostTitle = styled.h1`
  height: 10px;
  margin-bottom: 30px;
  font-size: 30px;
`;

export const PostCreated = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  margin-bottom: 20px;
`;

export const Popo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PostMap = styled.div`
  height: 300px;
  width: 350px;
  margin-right: 5px;
  background-color: yellow;
`;

export const PostImage = styled.img`
  width: 350px;
  height: 300px;
  background-color: red;
  margin-left: 5px;
`;

export const PostText = styled.p`
  background-color: rgba(128, 128, 128, 0.2); /* 회색 + 50% 투명도 */
  height: 300px;
  width: 710px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: start;
`;

export const PostBut = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 500px;
  padding: 10px;
  margin-top: 10px;
`;

export const PostEditDelete = styled.button`
  display: flex;
  justify-content: end;
  align-items: end;
  height: 35px;
  width: 55px;
  border-radius: 10px;
  /* background-color: #383737; */
  background-color: black;
  color: #a80101;
`;
