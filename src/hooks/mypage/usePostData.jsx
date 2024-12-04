import React, { useState } from 'react';
import supabase from '../../utils/supabaseClient';

const usePostData = (userData) => {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [contents, setContents] = useState({ posts: [], postCount: 0 }); // 게시글 상태

  // 게시글 데이터 가져오기
  const fetchContents = async () => {
    if (!userData?.id) {
      console.warn('User data is not initialized.');
      return;
    }

    try {
      const { data, count, error } = await supabase
        .from('posts')
        .select('id, title, content, created_at, post_img, longitude, latitude', { count: 'exact' })
        .eq('user_id', userData.id);
      setLongitude(data[0].longitude);
      setLatitude(data[0].latitude);
      if (error) throw error;

      const formattedData = data.map((item) => ({
        ...item,
        // post_img를 그대로 사용
        post_img: item.post_img || null,
        created_at: new Date(item.created_at).toISOString().slice(0, 16).replace('T', ' ')
      }));

      console.log('Formatted Data:', formattedData);

      setContents({ posts: formattedData, postCount: count });
    } catch (err) {
      console.error('Failed to fetch posts:', err.message);
    }
  };
  return { longitude, latitude, fetchContents, contents };
};

export default usePostData;
