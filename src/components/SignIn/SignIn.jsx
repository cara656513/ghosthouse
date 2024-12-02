import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../utils/supabaseClient';

const SignInContainer = styled.div`
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
