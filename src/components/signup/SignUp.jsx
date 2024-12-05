import { AuthContainer, FormContainer, Form, Input, Message, Button, SliderContainer } from '../../styles/AuthStyle';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useAuthMutation } from '../../hooks/useAuthMutation';
import { useToastStore } from '../../zustand/authStore';

function SignUp() {
  const { signUpMutation } = useAuthMutation();
  const { message } = useToastStore();

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const nickname = e.target.nickname.value;

    signUpMutation.mutate({ email, password, nickname }); // 서버와 통신
  };

  // 슬라이더 설정
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  // 슬라이더 이미지 배열
  const images = ['slideImage/image1.png', 'slideImage/image2.png', 'slideImage/image3.png', 'slideImage/image4.png'];

  return (
    <AuthContainer>
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
        <Form onSubmit={handleSubmit}>
          <Input type="email" name="email" placeholder="E-mail" required />
          <Input type="password" name="password" placeholder="password" required />
          <Input type="text" name="nickname" placeholder="nickname" required />
          {message.text && <Message type={message.type}>{message.text}</Message>}
          <Button type="submit">SIGN UP</Button>
        </Form>
      </FormContainer>
    </AuthContainer>
  );
}

export default SignUp;
