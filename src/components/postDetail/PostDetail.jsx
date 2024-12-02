import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../utils/supabaseClient';
import styled from 'styled-components';

const PostDetail = () => {
  const id = '6f578d5b-6f56-47e0-82c6-37d5335bd641';
  // const { id } = useParams(); // post 게시글 id를 가져올거
  //   const [comments, setComments] = useState([]); // 댓글 state
  const [postData, setPostData] = useState([]); //게시글 데이터 포스트 가져오기 관리
  const [user, setUser] = useState(null); // 유저정보 가져오기

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data: post, error } = await supabase.from('posts').select('*').eq('id', id);
        if (error) {
          throw error;
        }
        setPostData(post[0]);
        console.log(post[0]);
        const {
          data: { user },
          error: userError
        } = await supabase.auth.getUser();
        // 유저 데이터 가져올거
        if (userError) {
          throw userError;
        }
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    };
    getPost();
  }, []);
  console.log(postData);
  return (
    <StBox>
      <StDiv>
        <StH>{postData.title}</StH>
        {/* <img>{postData.post_img}</img> */}
        <StP>{postData.content}</StP>
        <StP2>{postData.user_id}</StP2>
        {/* 위에가 닉네임인가 확인 */}
      </StDiv>
    </StBox>
  );
};

export default PostDetail;

const StDiv = styled.div`
  background-color: #1a1a1a; /* 어두운 배경 */
  color: #f5f5f5; /* 밝은 텍스트 */
  border: 2px solid #ff0000; /* 붉은 테두리 */
  border-radius: 10px;
  padding: 20px;
  margin: 20px auto;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.8); /* 깊은 그림자 */
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05); /* 확대 효과 */
    box-shadow: 0 12px 20px rgba(255, 0, 0, 0.8); /* 붉은빛 그림자 */
  }
`;

const StH = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: #ff6666; /* 강렬한 붉은색 */
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(255, 0, 0, 0.6); /* 텍스트 그림자 */
`;

const StP = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #f5f5f5; /* 연한 회색 */
`;

const StP2 = styled.p`
  font-size: 0.9rem;
  font-style: italic;
  color: #aaaaaa; /* 흐릿한 회색 */
`;

const StBox = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
`;
