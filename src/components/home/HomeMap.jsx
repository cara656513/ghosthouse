import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { MapContainer } from './homeStyle';
import { useEffect, useState } from 'react';
import supabase from '../../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

const HomeMap = () => {
  // 1. 현 사용자의 위치대로 지도 중심좌표 찍히게 하기
  // 2. 슈퍼베이스에서 포스트 테이블에 있는 게시글 데이터 전체 가져오기
  // 3. 지도위에 포스트 테이블에 있는 좌표가 마커로 보이게 하기
  // 4. 마커를 눌렀을 때 디테일 페이지로 넘어가게 하기

  const [postData, setPostData] = useState([]);
  const nav = useNavigate();

  // 포스츠 테이블의 모든 데이터 가져오기
  useEffect(() => {
    const getPostData = async () => {
      try {
        const { data, error } = await supabase.from('posts').select('*');
        console.log('data', data);
        if (error) {
          throw error;
        }
        setPostData(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    getPostData();
  }, []);

  // 현 위치 정보 가져오기. 카카오지도 api 공식문서 참고
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667
    },
    errMsg: null,
    isLoading: true
  });

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude // 경도
            },
            isLoading: false
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false
      }));
    }
  }, []);

  return (
    <MapContainer>
      <Map // 지도를 표시할 Container
        center={state.center}
        style={{
          // 지도의 크기
          width: '70%',
          height: '450px'
        }}
        level={10} // 지도의 확대 레벨
      >
        {postData.map((position) => (
          <MapMarker
            key={`${position.id}`}
            // position={position.latlng}
            // position={{ lat: position.latlng.Ma, lng: position.latlng.La }}
            position={{ lat: position.latitude, lng: position.longitude }} // 마커를 표시할 위치
            image={{
              src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
              size: {
                width: 24,
                height: 35
              } // 마커이미지의 크기입니다
            }}
            title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            onClick={() => nav(`/detail/${position.id}`)}
          />
        ))}
        {!state.isLoading && (
          <MapMarker position={state.center}>
            <div style={{ padding: '5px', color: '#000' }}>{state.errMsg ? state.errMsg : '여기에 계신가요??'}</div>
          </MapMarker>
        )}
      </Map>
    </MapContainer>
  );
};

export default HomeMap;
