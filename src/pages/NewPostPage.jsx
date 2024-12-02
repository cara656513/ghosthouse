import { useEffect, useRef, useState } from 'react';
import supabase from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Form,
  Img,
  Input,
  Label,
  ModalContent,
  ModalOverlay,
  WholeContainer
} from '../components/newpost/NewPostStyles';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import uploadFile from '../components/newpost/UploadFile';

const NewPost = () => {
  const [userid, setUserid] = useState();
  const [previewImg, setPreviewImg] = useState('');
  const navigate = useNavigate();
  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667
  });
  const [position, setPosition] = useState(center);
  const [input, setInput] = useState({ img: null, title: '', lat: center.lat, lng: center.lng });

  useEffect(() => {
    const fetchData = async () => {
      //로그인한 사람 데이터 찾기
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('Error fetching user:', userError);
        return;
      }
      setUserid(userData.user.id);
    };
    fetchData();

    //현위치
    navigator.geolocation.getCurrentPosition((pos) => {
      setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  }, []);

  const handleImgInputChange = (e) => {
    const { files } = e.target;
    setInput((prev) => ({ ...prev, img: files[0] }));
    const objectUrl = URL.createObjectURL(files[0]);
    setPreviewImg(objectUrl);
  };

  const handleTxtInputChange = (e) => {
    const { id, value } = e.target;
    setInput((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();

    try {
      const updatingObj = {};
      const url = await uploadFile(input);
      updatingObj.post_img = url;
      updatingObj.title = input.title;
      updatingObj.content = input.text;
      updatingObj.longitude = input.lng;
      updatingObj.latitude = input.lat;

      const { data, error } = await supabase.from('posts').insert({
        user_id: userid,
        ...updatingObj
      });

      console.log('Post data:', data);
      alert('글이 등록되었습니다!');
      navigate('/');

      if (error) throw error;
    } catch (error) {
      console.error('Error submitting post:', error.message);
    }
  };

  //모달창
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

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
                {previewImg ? <Img src={previewImg} /> : '+'}
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
                  현위치 기록하기
                </button>
                <input
                  type="text"
                  id="title"
                  onChange={handleTxtInputChange}
                  placeholder="제목을 입력하세요"
                  required
                ></input>
                <Input type="text" id="text" onChange={handleTxtInputChange} placeholder="내용을 입력하세요" />
              </div>
            </div>
            <div>
              <button type="submit">게시</button>
              <button type="button">취소</button>
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
          <ModalContent>
            <div>
              <>
                <Map
                  id="map"
                  center={center}
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
                  <MapMarker position={position ? position : center} />
                </Map>
                <div>{position && `클릭한 위치의 위도는 ${position.lat} 이고, 경도는 ${position.lng} 입니다`}</div>
              </>
              <button onClick={() => setModalOpen(false)}>위치 선택 완료</button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default NewPost;
