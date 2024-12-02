import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../utils/supabaseClient';

const SignInContainer = styled.div`
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

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setMessage({ text: error.message, type: 'error' });
      return;
    }

    setMessage({
      text: '로그인 성공!',
      type: 'success'
    });
    navigate('/');
  };

  return (
    <SignInContainer>
      <h1>로그인</h1>
      <Form onSubmit={handleSignIn}>
        <Input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {message.text && <Message type={message.type}>{message.text}</Message>}
        <Button type="submit">로그인</Button>
      </Form>
    </SignInContainer>
  );
}

export default SignIn;
