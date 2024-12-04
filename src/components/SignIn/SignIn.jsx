import { AuthContainer, FormContainer, Form, Input, Message, Button, SliderContainer } from '../../styles/AuthStyle';
import { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useAuthMutation } from '../../hooks/useAuthMutation';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signInMutation } = useAuthMutation();

  // 로그인 핸들러
  const handleSignIn = (e) => {
    e.preventDefault();
    signInMutation.mutate({ email, password });
  };

  // 슬라이드 설정
  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000
  };

  const images = ['slideImage/image1.png', 'slideImage/image2.png', 'slideImage/image3.png', 'slideImage/image4.png'];

  return (
    <AuthContainer>
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
          {signInMutation.isError && <Message type="error">{signInMutation.error.message}</Message>}
          {signInMutation.isSuccess && <Message type="success">로그인 성공!</Message>}
          <Button type="submit">SIGN IN</Button>
        </Form>
      </FormContainer>
    </AuthContainer>
  );
}

export default SignIn;
