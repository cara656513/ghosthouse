import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import {
  MypostList,
  PostCard,
  PostTitle,
  PostCreated,
  Popo,
  PostMap,
  PostImage,
  PostText,
  PostBut,
  PostEditDelete
} from '../../components/mypage/postliststyle';
import styled from 'styled-components';

const Postitem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostImgWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const PostImg = styled.img`
  height: 300px;
  width: 300px;
  display: block;
`;

const HoverImage = styled.div`
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url('/ghostmypage.png'); /* 큰 이미지 URL */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 700px; /* 큰 이미지 너비 */
  height: 700px; /* 큰 이미지 높이 */
  z-index: 10;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;

  ${PostImgWrapper}:hover & {
    opacity: 1;
  }
`;

const PostList = ({ posts, handleDitailpage, handleDelete, longitude, latitude, position }) => {
  console.log(posts);
  return (
    <MypostList>
      {posts.map((item) => (
        <PostCard key={item.id}>
          <PostTitle>{item.title}</PostTitle>
          <PostCreated>{item.created_at}</PostCreated>
          <Postitem>
            <PostImgWrapper>
              <PostImg src={item.post_img} />
              <HoverImage />
            </PostImgWrapper>
            <Map // 지도를 표시할 Container
              id="map"
              center={{ lng: item.longitude, lat: item.latitude }}
              style={{
                width: '300px',
                height: '300px'
              }}
              level={3}
            >
              <MapMarker position={position ?? { lng: item.longitude, lat: item.latitude }} />
            </Map>
          </Postitem>
          {/* <PostImg src={item.post_img} /> */}
          <PostText>{item.content}</PostText>
          <PostBut>
            <PostEditDelete onClick={() => handleDitailpage(item.id)}>수정</PostEditDelete>
            <PostEditDelete onClick={() => handleDelete(item.id)}>삭제</PostEditDelete>
          </PostBut>
        </PostCard>
      ))}
    </MypostList>
  );
};

export default PostList;
