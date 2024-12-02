import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../utils/supabaseClient';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // 비밀번호 유효성 검사
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{7,}$/;
    if (!passwordRegex.test(password)) {
      setMessage({
        text: '비밀번호는 7자 이상이어야 하며 특수 문자를 포함해야 합니다.',
        type: 'error'
      });
      return;
    }

    // 닉네임 유효성 검사
    if (nickname.trim().length < 2) {
      setMessage({
        text: '닉네임은 최소 2글자 이상이어야 합니다.',
        type: 'error'
      });
      return;
    }

    try {
      // Supabase 회원가입 요청
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname // raw_user_meta_data에 닉네임 저장
          }
        }
      });

      if (error) {
        setMessage({ text: error.message, type: 'error' });
        return;
      }

      // 추가 유저 정보 삽입
      const { error: insertError } = await supabase.from('users').insert([{ id: data.user.id, email, nickname }]);

      if (insertError) {
        setMessage({
          text: '회원정보 저장 중 문제가 발생했습니다.',
          type: 'error'
        });
        return;
      }

      // 성공 메시지
      setMessage({
        text: '회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.',
        type: 'success'
      });

      // 1초 후 로그인 페이지로 이동
      setTimeout(() => navigate('/signin'), 1000);
    } catch (error) {
      console.error('회원가입 실패:', error);
      setMessage({
        text: '회원가입 중 오류가 발생했습니다.',
        type: 'error'
      });
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSignUp}>
        <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        {message.text && <p style={{ color: message.type === 'error' ? 'red' : 'green' }}>{message.text}</p>}
        <button
          type="submit"
          style={{
            padding: '10px',
            fontSize: '1rem',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignUp;
