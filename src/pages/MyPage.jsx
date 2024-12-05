import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
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
