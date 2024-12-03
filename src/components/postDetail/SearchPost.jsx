import React, { useEffect, useState } from 'react';
import supabase from '../../utils/supabaseClient';
import { useSearchParams } from 'react-router-dom';

const SearchPost = () => {
  const [searchPost, setSearchPost] = useSearchParams('');
  const [posts, setPosts] = useState([]);
  const searchValue = searchPost.get('q');

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data: post, error } = await supabase
          .from('posts')
          .select(`*, users(nickname , profile_img)`)
          .ilike('title', `%${searchValue}%`);
        if (error) {
          throw error;
        }
        setPosts(post);
        console.log(post);
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
