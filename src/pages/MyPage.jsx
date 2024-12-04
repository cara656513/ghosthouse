import React, { useState, useEffect } from 'react';
import supabase from '../utils/supabaseClient';
import styled from 'styled-components';
import { data, Navigate, useNavigate } from 'react-router-dom';
import Modal from '../components/mypage/Modal';
import PostList from '../components/mypage/PostList';
import MyProfile from '../components/mypage/MyProfile';
import { useFileChange } from '../hooks/mypage/useFileChange';
import Toastcontainer from '../utils/toastcontainer';
import useUpdateNickname from '../hooks/mypage/useUpdateNickname';
import useUserData from '../hooks/mypage/useUserData';
import usePostData from '../hooks/mypage/usePostData';
import usePostDataDelete from '../hooks/mypage/usePostDataDelete';

const Wrap = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  height: auto;
`;

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const navigate = useNavigate();

  // 사용자 정보 조회 커스텀 훅
  const { userData, nickname, fetchUserData } = useUserData();

  // 게시글 데이터 커스텀 훅
  const { longitude, latitude, fetchContents, setContents, contents } = usePostData(userData);

  // 내 게시글 데이터 삭제 훅
  const { handleDelete } = usePostDataDelete(setContents);

  // 닉네임 변경관련 커스텀 훅
  const { updateNickname, newNickname, setNewNickname } = useUpdateNickname(userData, fetchUserData);

  // 프로필 이미직 관련 커스텀 훅
  const { handleFileChange, uploadAndSaveProfile, profileImg } = useFileChange(userData);

  // // 내 게시물 삭제
  // const handleDelete = async (postId) => {
  //   try {
  //     // 삭제를 테스트 하기 위해서 임시 값을 넣어둠
  //     const { error } = await supabase.from('posts').delete().eq('id', postId);
  //     // 현제 코드는 로그인값이 구현되지 않아서 userId값이 아니라 tsetID값을 사용중임
  //     if (error) {
  //       console.log(error);
  //       alert('삭제 중 문제가 발생했습니다.');
  //     } else {
  //       // posts 배열에서 삭제된 게시글을 필터링하여 상태 업데이트
  //       setContents((prevData) => ({
  //         ...prevData, // 기존 객체 유지
  //         posts: prevData.posts.filter((post) => post.id !== postId) // posts 배열 업데이트
  //       }));

  //       alert('게시물이 삭제되었습니다.');
  //     }
  //   } catch (err) {
  //     console.error('삭제 중 예외 발생:', err.message);
  //   }
  // };

  // 사용자 정보 로드
  useEffect(() => {
    fetchUserData();
  }, []);

  // 게시글 로드
  useEffect(() => {
    if (userData) {
      fetchContents();
    }
  }, [userData]);
  // 게시글 수정 페이지 이동
  const handleDitailpage = (postId) => {
    navigate(`/edit/${postId}`);
  };

  return (
    <Wrap>
      <Toastcontainer />
      <MyProfile
        profileImg={profileImg}
        nickname={nickname}
        postCount={contents.postCount}
        setIsModalOpen={setIsModalOpen}
      />

      <PostList
        posts={contents.posts}
        handleDitailpage={handleDitailpage}
        handleDelete={handleDelete}
        longitude={longitude}
        latitude={latitude}
        position={{ lng: longitude, lat: latitude }}
      />

      {isModalOpen && (
        <Modal
          profileImg={profileImg}
          nickname={nickname}
          newNickname={newNickname}
          setNewNickname={setNewNickname}
          handleFileChange={handleFileChange}
          uploadAndSaveProfile={uploadAndSaveProfile}
          setIsModalOpen={() => setIsModalOpen(false)}
          updateNickname={updateNickname}
        />
      )}
    </Wrap>
  );
};

export default MyPage;
