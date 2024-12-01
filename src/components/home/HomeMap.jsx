import { useEffect } from 'react';
import styled from 'styled-components';

const { kakao } = window;

const HomeMap = () => {
  //카카오 지도 api 불러오기
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <MapContainer>
      <div id="map" style={{ width: '70%', height: '500px' }}></div>
    </MapContainer>
  );
};

export default HomeMap;

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  text-align: center;
`;
