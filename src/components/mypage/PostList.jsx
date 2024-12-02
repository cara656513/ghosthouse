import React from 'react';
import { Map } from 'react-kakao-maps-sdk';
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

const PostImg = styled.img`
  height: 300px;
  width: 300px;
`;

const PostList = ({ posts, handleDitailpage, handleDelete, longitude, latitude }) => {
  return (
    <MypostList>
      {posts.map((item) => (
        <PostCard key={item.id}>
          <PostTitle>{item.title}</PostTitle>
          <PostCreated>{item.created_at}</PostCreated>
          <Postitem>
            <PostImg src={item.post_img} />
            <Map // 지도를 표시할 Container
              id="map"
              center={{ lng: longitude, lat: latitude }}
              style={{
                width: '300px',
                height: '300px'
              }}
              level={3}
            />
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
