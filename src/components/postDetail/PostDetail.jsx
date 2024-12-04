// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import supabase from '../../utils/supabaseClient';
// import styled from 'styled-components';
import FeedComponent from './FeedComponent';

const PostDetail = () => {
  // const { id } = useParams(); // post 게시글 id를 가져올거
  // const [postData, setPostData] = useState(null); //게시글 데이터 포스트 가져오기 관리

  // // posts 테이블 데이터 가져오기
  // useEffect(() => {
  //   const getPost = async () => {
  //     try {
  //       const { data: post, error } = await supabase.from('posts').select(`*,users(nickname)`).eq('id', id);
  //       if (error) {
  //         throw error;
  //       }
  //       setPostData(post);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getPost();
  // }, []);


  return <FeedComponent  />;
};

export default PostDetail;
