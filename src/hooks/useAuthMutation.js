import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import supabase from '../utils/supabaseClient';
import { useUserStore } from '../zustand/userStore';
import { validateNickname, validatePassword } from '../utils/validation';
import { useToastStore } from '../zustand/authStore';

export const useAuthMutation = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const { setMessage } = useToastStore(); // Zustand 스토어 사용

  const signUpMutation = useMutation({
    mutationFn: async ({ email, password, nickname }) => {
      validatePassword(password); // 비밀번호 유효성 검사
      validateNickname(nickname); // 닉네임 유효성 검사

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { nickname } } // 닉네임 추가 저장
      });

      if (error) {
        throw new Error('회원정보 저장 중 문제가 발생했습니다.');
      }

      return '회원가입이 완료되었습니다.';
    },
    onSuccess: (data) => {
      setMessage({ text: data, type: 'success' });
      navigate('/signin'); // 성공 시 로그인 페이지로 이동
    },
    onError: (error) => {
      setMessage({ text: error.message, type: 'error' }); // 에러 메시지 설정
    }
  });

  const signInMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw new Error('아이디 또는 비밀번호를 확인 해주세요.');
      }

      return data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      navigate('/');
    },
    onError: (error) => {
      console.error(error.message);
    }
  });
  return { signInMutation, signUpMutation };
};
