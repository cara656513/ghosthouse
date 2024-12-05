// 사용자 정보 가져오기

import { useState } from 'react';
import supabase from '../../utils/supabaseClient';

const useUserData = () => {
  const [userData, setUserData] = useState(null); // 사용자 데이터 상태
  const [nickname, setNickname] = useState('');

  const fetchUserData = async () => {
    try {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;

      const userId = authData.user?.id;
      if (!userId) throw new Error('User ID not found.');

      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id, nickname, profile_img')
        .eq('id', userId)
        .single();

      if (userError) throw userError;

      setUserData(user);
      setNickname(user.nickname);
      // setProfileImg(user.profile_img);
    } catch (err) {
      console.error('Failed to fetch user data:', err.message);
    }
  };
  return { setUserData, setNickname, userData, nickname, fetchUserData };
};
export default useUserData;
