import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../utils/supabaseClient';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import image1 from '../../../public/slideImage/image1.png';
import image2 from '../../../public/slideImage/image2.png';
import image3 from '../../../public/slideImage/image3.png';
import image4 from '../../../public/slideImage/image4.png';

const SignUpContainer = styled.div`
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
  padding: 40px;
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
  height: 460px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 1);
  border-radius: 10px;
  filter: grayscale(70%) brightness(0.7);
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
        text: '비밀번호는 7자 이상, 특수 문자를 포함해야 합니다.',
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
      text: '회원가입이 완료되었습니다.',
      type: 'success'
    });
    navigate('/signin');
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  const images = [image1, image2, image3, image4];

  return (
    <SignUpContainer>
      <FormContainer>
        <SliderContainer>
          <Slider {...sliderSettings}>
            {images.map((src, index) => (
              <div key={index}>
                <img src={src} alt={`Slide ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </Slider>
        </SliderContainer>
        <Form onSubmit={handleSignUp}>
          <Input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          {message.text && <Message type={message.type}>{message.text}</Message>}
          <Button type="submit">SIGN UP</Button>
        </Form>
      </FormContainer>
    </SignUpContainer>
  );
}

export default SignUp;
