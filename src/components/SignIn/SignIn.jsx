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
    <SignInContainer>
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
        <Form onSubmit={handleSignIn}>
          <Input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {message.text && <Message type={message.type}>{message.text}</Message>}
          <Button type="submit">SIGN IN</Button>
        </Form>
      </FormContainer>
    </SignInContainer>
  );
}

export default SignIn;
