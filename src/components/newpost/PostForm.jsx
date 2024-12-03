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
import { fetchUserData } from './fetchCrntUser';
import { useQuery } from '@tanstack/react-query';
import { fetchPostDetail } from '../../hooks/posts/usePost';

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

  const { data: post, isPending: isPostsPending } = useQuery({
    queryKey: ['crntUserPosts'],
    queryFn: async () => fetchPostDetail(id)
  });

  useEffect(() => {
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
    //현위치
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

    onSubmit(user, updatingObj);
    navigate('/');
  };

  //모달창
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  //로그인한 유저
  const { data: user, isPending } = useQuery({
    queryKey: ['crntUser'],
    queryFn: fetchUserData
  });

  //my 게시물s
  // const { data: posts, isPending: isPostsPending } = useQuery({
  //   queryKey: ['crntUserPosts'],
  //   queryFn: async () => {
  //     const response = await fetchMyPosts(user.id);
  //     return response;
  //   }
  // });

  if (isPending) {
    return <div>loading...</div>;
  }
  if (isPostsPending) {
    return <div>posts loading...</div>;
  }

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
                  value={input.title ? input.title : post?.title}
                ></input>
                <Input
                  type="text"
                  id="text"
                  onChange={handleTxtInputChange}
                  placeholder="content"
                  defaultValue={input.text ? input.text : post?.content}
                />
              </div>
            </div>
            <div>
              <button type="submit">{mode === 'editPost' ? 'Edit' : 'Submit'}</button>
              <Link to="/">
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
              center={position} //d여기
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
