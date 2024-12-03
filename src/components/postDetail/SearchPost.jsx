import React, { useEffect, useState } from 'react';
import supabase from '../../utils/supabaseClient';
import { useSearchParams } from 'react-router-dom';

const SearchPost = () => {
  const [searchPost, setSearchPost] = useSearchParams('');
  const [posts, setPosts] = useState([]);
  const searchValue = searchPost.get('q');
  console.log(searchValue);

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data: post, error } = await supabase.from('posts').select('*').eq('title', searchValue);
        if (error) {
          throw error;
        }
        setPosts(post);
        console.log(post);
        // const { datas } = await supabase
        //   .from('posts')
        //   .select(`id, post_img, longitude, latitude, title, content, user_id, users(id, nickname, profile_img)`)
        //   .like('title', `${searchValue}`);
        // setPosts(datas);
        // console.log(datas);
      } catch (error) {
        console.error(error);
      }
    };
    getPost();
  }, []);
  console.log(posts);
  return <></>;
};

export default SearchPost;
