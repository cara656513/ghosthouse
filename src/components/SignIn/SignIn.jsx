import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../utils/supabaseClient';
import { useMutation } from '@tanstack/react-query';
import { create } from 'zustand';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import image1 from '../../../public/slideImage/image1.png';
import image2 from '../../../public/slideImage/image2.png';
import image3 from '../../../public/slideImage/image3.png';
import image4 from '../../../public/slideImage/image4.png';

const SignInContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url('/your-background-image.jpg') no-repeat center center;
  background-size: cover;
  filter: grayscale(50%) brightness(0.8);
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  gap: 50px;
  width: 90%;
  max-width: 1200px;
  background: rgba(0, 0, 0, 0.7);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.9);
  padding: 82px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 1);
  width: 400px;
`;

const Input = styled.input`
  font-family: 'chiller', sans-serif;
  width: 100%;
  margin: 15px 0;
  padding: 20px;
  font-size: 25px;
  border: none;
  border-radius: 5px;
  color: white;
  background: rgba(255, 255, 255, 0.514);
  transition: background 0.3s;

  &::placeholder {
    color: red;
    font-size: 2rem;
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
  font-family: 'chiller', sans-serif;
  margin-top: 20px;
  padding: 15px 30px;
  font-size: 2rem;
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

const SliderContainer = styled.div`
  flex: 1;
  max-width: 450px;
  height: 450px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 1);
  border-radius: 10px;
  filter: grayscale(70%) brightness(0.7);
`;

// Zustand 상태 관리
const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user })
}));

// 로그인 훅 분리
const useSignInMutation = (setUser, navigate) => {
  return useMutation({
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
};

function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 mutation 훅 사용
  const mutation = useSignInMutation(setUser, navigate);

  // 로그인 핸들러
  const handleSignIn = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  // 슬라이드 설정
  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000
  };

  const images = [image1, image2, image3, image4];

  return (
    <SignInContainer>
      <FormContainer>
        <SliderContainer>
          <Slider {...sliderSettings}>
            {images.map((src, index) => (
              <div key={index}>
                <img src={src} alt={`Slide ${index}`} style={{ width: '100%', height: '100%' }} />
              </div>
            ))}
          </Slider>
        </SliderContainer>
        <Form onSubmit={handleSignIn}>
          <Input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {mutation.isError && <Message type="error">{mutation.error.message}</Message>}
          {mutation.isSuccess && <Message type="success">로그인 성공!</Message>}
          <Button type="submit">SIGN IN</Button>
        </Form>
      </FormContainer>
    </SignInContainer>
  );
}

export default SignIn;
