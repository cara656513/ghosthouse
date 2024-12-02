import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetial = () => {
  const { id } = useParams(); // post 게시글 id를 가져올거
  //   const [comments, setComments] = useState([]); // 댓글 state
  const [postData, setPostData] = useState(null); //게시글 데이터 포스트 가져오기 관리
  const [user, setUser] = useState(null); // 유저정보 가져오기

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data: post, error } = await supabase.from('posts').select('*').eq('id', id);
        // id 로 가져올거면 id , 경도나 위도로(longitude) (latitude) 가져올거면 경도 위도로
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

  return <div>postDetial</div>;
};

export default PostDetial;
