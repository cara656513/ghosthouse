import styled from 'styled-components';

export const FeedContainer = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
  padding: 0;
  list-style: none;
`;

export const FeedLi = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  background-color: rgba(0, 0, 0, 0.7);
  margin-bottom: 50px;
  padding: 20px;
`;

export const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 80%;
  margin: 30px;

  h1 {
    font-size: 1.8rem;
    color: #a80101;
    margin: 0;
    font-weight: bold;
  }
  h2 {
    font-size: 0.9rem;
    color: #e5e5e599;
    margin: 0;
  }

  span {
    font-size: 0.9rem;
    color: #e0e0e0;
    width: 100%;
  }
`;

export const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  img {
    width: 60%;
    height: 400px;
    object-fit: cover;
  }
`;

export const ContentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 30px 0;

  p {
    font-size: 1.2rem;
    color: #ffffff;
    line-height: 1.5;
    word-wrap: break-word;
    background-color: #6f0000;
    padding: 40px;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(50, 50, 50, 0.5);
    border: none;
    padding: 10px;
    font-size: 1rem;
    color: #ffffff;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-left: 10px;
  }

  svg {
    color: #a80101;
    font-size: 1.5rem;
  }

  button:hover svg {
    color: #ff4545; /* 호버 시 아이콘 색상 변경 */
  }
`;

export const CommentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin-top: 40px;

  span {
    margin-bottom: 10px;
  }
`;

export const CommentForm = styled.form`
  display: flex;
  margin-top: 20px;
  width: 100%;
  justify-content: space-between;

  input {
    color: #fff;
    display: block;
    width: 95%;
    padding: 10px 5px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #fff;
    &::placeholder {
      color: #ffffff;
      font-size: 1.1rem;
    }
  }
`;

export const CommentDiv = styled.div`
  margin: 10px 0;
  width: 100%;
  
  span {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }
`;
