import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../utils/supabaseClient';

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8) url('/your-background-image.jpg') no-repeat center center;
  background-size: cover;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 1rem;
  width: 80%;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
`;

const Message = styled.p`
  margin-top: 10px;
  font-size: 1rem;
  color: ${(props) => (props.type === 'error' ? 'red' : 'green')};
  z-index: 100;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
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
      setMessage({ text: error.message, type: 'error' });
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
      <h1>회원가입</h1>
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
