import React, { useState } from 'react';
import supabase from '../utils/supabaseClient';
import { toast } from 'react-toastify';

const useUpdateNickname = (userData) => {
  const [newNickname, setNewNickname] = useState('');
  const updateNickname = async () => {
    if (!newNickname.trim()) {
      toast.warning('아오 입력해주세요.!');
      return;
    }

    if (!userData?.id) {
      console.error('User data is not initialized.');
      toast.warning('사용자 데이터가 준비되지 않았습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    try {
      const { error } = await supabase.from('users').update({ nickname: newNickname }).eq('id', userData.id);

      if (error) {
        throw error;
      }

      toast.warning('닉네임이 성공적으로 변경되었습니다!');
      setNewNickname('');
      await fetchUserData(); // 사용자 데이터 다시 로드
    } catch (err) {
      console.error('닉네임 변경 실패:', err.message);
      toast.warning('닉네임 변경에 실패했습니다.');
    }
  };
  return updateNickname;
};

export default useUpdateNickname;
