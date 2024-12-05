import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Container,
  Form,
  Img,
  Input,
  Label,
  ModalContent,
  ModalOverlay,
  WholeContainer
} from './NewPostStyles';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import uploadFile from './UploadFile';
import { useQuery } from '@tanstack/react-query';
import { fetchPostDetail } from '../../hooks/posts/usePost';
import { useUserStore } from '../../zustand/userStore';
import { toast } from 'react-toastify';

const Postform = ({ mode, onSubmit }) => {
  const [previewImg, setPreviewImg] = useState('');
  const navigate = useNavigate();
  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667
  });
  const [position, setPosition] = useState(center);
  const [input, setInput] = useState({});
  const { id } = useParams();
  const userData = useUserStore((state) => state.user);

  const { data: post } = useQuery({
    queryKey: ['crntUserPosts'],
    queryFn: async () => fetchPostDetail(id),
    enabled: !!id
  });

  useEffect(() => {
    //현위치
    if (mode === 'editPost' && post) {
      setPosition({ lng: post.longitude, lat: post.latitude });
    } else if (mode === 'newPost') {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setPosition(
          pos ? { lat: pos.coords.latitude, lng: pos.coords.longitude } : { lat: 33.450701, lng: 126.570667 }
        );
      });
    }
  }, [post]);

  const handleImgInputChange = (e) => {
    const { files } = e.target;
    setInput((prev) => ({ ...prev, img: files[0] }));
    const objectUrl = URL.createObjectURL(files[0]);
    setPreviewImg(objectUrl);
  };

  const handleTxtInputChange = (e) => {
    const { id, value } = e.target;
    setInput((prev) => ({ ...prev, [id]: value, lat: position.lat, lng: position.lng }));
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    const updatingObj = {};
    const url = await uploadFile(input);
    if (input.img) updatingObj.post_img = url;
    updatingObj.title = input.title;
    updatingObj.content = input.text;
    updatingObj.longitude = input.lng;
    updatingObj.latitude = input.lat;

    if (mode === 'newPost' && !isCompleted) {
      toast.error('이미지, 타이틀, 텍스트를 입력해주세요.');
    } else {
      onSubmit(userData, updatingObj);
      navigate('/mypage');
    }
  };

  //모달창
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const isCompleted = input.img && input.text && input.title ? true : false;

  return (
    <>
      <WholeContainer>
        <Container>
          <Form onSubmit={handleSubmitPost}>
            <div
              style={{
                display: 'flex'
              }}
            >
              <Label>
                {previewImg ? <Img src={previewImg} /> : mode === 'editPost' ? <Img src={post?.post_img} /> : '+'}
                <Input
                  type="file"
                  accept="image/*"
                  id="img"
                  onChange={handleImgInputChange}
                  style={{
                    display: 'none'
                  }}
                />
              </Label>
              <div
                style={{
                  display: 'grid'
                }}
              >
                <button
                  type="button"
                  style={{
                    width: '440px'
                  }}
                  onClick={() => setModalOpen(true)}
                >
                  Where are you now?
                </button>
                <input
                  type="text"
                  id="title"
                  onChange={handleTxtInputChange}
                  placeholder="title"
                  required
                  defaultValue={id ? post?.title : input.title}
                ></input>
                <Input
                  type="text"
                  id="text"
                  onChange={handleTxtInputChange}
                  placeholder="content"
                  defaultValue={id ? post?.content : input.text}
                  required
                />
              </div>
            </div>
            <div>
              <button type="submit">{mode === 'editPost' ? 'Edit' : 'Submit'}</button>
              <Link to={mode === 'editPost' ? '/mypage' : '/'}>
                <button type="button">cancle</button>
              </Link>
            </div>
          </Form>
        </Container>
      </WholeContainer>

      {modalOpen && (
        <ModalOverlay
          ref={modalBackground}
          onClick={(e) => {
            if (e.target === modalBackground.current) {
              setModalOpen(false);
            }
          }}
        >
          <ModalContent
            style={{
              display: 'grid',
              placeItems: 'center'
            }}
          >
            <Map
              id="map"
              center={position}
              style={{
                width: '800px',
                height: '500px'
              }}
              level={3} // 지도의 확대 레벨
              onClick={(_, mouseEvent) => {
                const latlng = mouseEvent.latLng;
                setPosition({
                  lat: latlng.getLat(),
                  lng: latlng.getLng()
                });
                setInput({ ...input, lat: latlng.getLat(), lng: latlng.getLng() });
              }}
            >
              <MapMarker position={position} />
            </Map>
            <div>{position && `클릭한 위치의 위도는 ${position.lat} 이고, 경도는 ${position.lng} 입니다`}</div>
            <Button onClick={() => setModalOpen(false)}>위치 선택 완료</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Postform;
