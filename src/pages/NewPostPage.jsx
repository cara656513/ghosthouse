import { useEffect, useRef, useState } from 'react';
import supabase from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Container, Form, Input, ModalContent, ModalOverlay, WholeContainer } from '../styles/NewPostStyles';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const uploadFile = async (input) => {
  const { data, error } = await supabase.storage.from('Image').upload(input.img.name + uuidv4(), input.img);
  if (error) {
    console.log(error);
    throw error;
  }
  const { data: imgdata } = supabase.storage.from('Image').getPublicUrl(data.path);
  return imgdata.publicUrl;
};

const NewPost = () => {
  const [userid, setUserid] = useState();
  const [input, setInput] = useState({ img: null, text: '' });
  const [previewImg, setPreviewImg] = useState('');
  const navigate = useNavigate();

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

      if (input.img) {
        const url = await uploadFile(input);
        updatingObj.picture = url;
      } else {
        updatingObj.picture = null;
      }
      updatingObj.content = input.text;

      const { data, error } = await supabase.from('posts').insert({
        user_id: userid,
        ...updatingObj
      });

      if (error) throw error;

      alert('글이 등록되었습니다!');
      navigate('/');
      console.log('Post data:', data);

      setInput({ img: null, text: '' });
    } catch (error) {
      console.error('Error submitting post:', error.message);
    }
  };

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
  }, []);

  //모달창
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  const center = {
    // 지도의 중심좌표
    lat: 33.450701,
    lng: 126.570667
  };
  const [position, setPosition] = useState({});

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
              <label
                style={{
                  fontSize: '50px',
                  textAlign: 'center',
                  display: 'grid',
                  placeItems: 'center',
                  height: '400px'
                }}
              >
                {previewImg ? (
                  <img
                    style={{
                      width: '100%'
                    }}
                    src={previewImg}
                  />
                ) : (
                  '+'
                )}
                <Input
                  type="file"
                  accept="image/*"
                  id="img"
                  onChange={handleImgInputChange}
                  style={{
                    display: 'none'
                  }}
                />
              </label>

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
                <input placeholder="제목을 입력하세요" required></input>
                <Input type="text" id="text" onChange={handleTxtInputChange} placeholder="내용을 입력하세요" required />
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
        <ModalOverlay>
          <ModalContent
            ref={modalBackground}
            onClick={(e) => {
              if (e.target === modalBackground.current) {
                setModalOpen(false);
              }
            }}
          >
            <div>
              <>
                <Map
                  id="map"
                  center={center}
                  style={{
                    width: '700px',
                    height: '350px'
                  }}
                  level={3} // 지도의 확대 레벨
                  onClick={(_, mouseEvent) => {
                    const latlng = mouseEvent.latLng;
                    setPosition({
                      lat: latlng.getLat(),
                      lng: latlng.getLng()
                    });
                  }}
                >
                  <MapMarker position={position ?? center} />
                </Map>
                <div id="clickLatlng">
                  {position && `클릭한 위치의 위도는 ${position.lat} 이고, 경도는 ${position.lng} 입니다`}
                </div>
              </>
              <button onClick={() => setModalOpen(false)}>모달 닫기</button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default NewPost;
