import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../utils/supabaseClient';

const SignUpContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url('/your-background-image.jpg') no-repeat center center;
  background-size: cover;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  max-width: 300px;
`;

const Input = styled.input`
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  transition: background 0.3s;

  &::placeholder {
    color: red;
  }

  &:focus {
    background: rgba(255, 255, 255, 0.2);
    outline: none;
  }
`;

const Message = styled.p`
  margin-top: 10px;
  font-size: 1rem;
  color: ${(props) => (props.type === 'error' ? 'red' : 'green')};
  z-index: 100;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 1rem;
  background-color: black;
  color: red;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: red;
    color: black;
  }
`;

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{7,}$/;
    if (!passwordRegex.test(password)) {
      setMessage({
        text: '비밀번호는 7자 이상이어야 하며 특수 문자를 포함해야 합니다.',
        type: 'error'
      });
      return;
    }

    if (nickname.trim().length < 2) {
      setMessage({
        text: '닉네임은 최소 2글자 이상이어야 합니다.',
        type: 'error'
      });
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nickname }
      }
    });

    if (error) {
      setMessage({ text: '회원정보 저장 중 문제가 발생했습니다.', type: 'error' });
      return;
    }

    setMessage({
      text: '회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.',
      type: 'success'
    });
    navigate('/signin');
  };

  return (
    <SignUpContainer>
      <Form onSubmit={handleSignUp}>
        <Input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        {message.text && <Message type={message.type}>{message.text}</Message>}
        <Button type="submit">회원가입</Button>
      </Form>
    </SignUpContainer>
  );
}

export default SignUp;
