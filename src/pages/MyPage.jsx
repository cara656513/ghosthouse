import React, { useState, useEffect } from 'react';
import supabase from '../utils/supabaseClient';
import styled from 'styled-components';
import { data, Navigate, useNavigate } from 'react-router-dom';
import Modal from '../components/mypage/Modal';
import PostList from '../components/mypage/PostList';
import MyProfile from '../components/mypage/MyProfile';
import useUpdateUser from '../hooks/useUpdateUser';
import { useFileChange } from '../hooks/useFileChange';
import Toastcontainer from '../utils/toastcontainer';
import { toast } from 'react-toastify';

const Wrap = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  height: auto;
`;

const MyPage = () => {
  const [contents, setContents] = useState({ posts: [], postCount: 0 }); // 게시글 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [userData, setUserData] = useState(null); // 사용자 데이터 상태
  const [nickname, setNickname] = useState('');
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  const navigate = useNavigate();

  // 사용자 정보 가져오기
  const fetchUserData = async () => {
    try {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;

      const userId = authData.user?.id;
      if (!userId) throw new Error('User ID not found.');

      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id, nickname, profile_img')
        .eq('id', userId)
        .single();

      if (userError) throw userError;

      setUserData(user);
      setNickname(user.nickname);
      // setProfileImg(user.profile_img);
    } catch (err) {
      console.error('Failed to fetch user data:', err.message);
    }
  };

  // 게시글 데이터 가져오기
  const fetchContents = async () => {
    if (!userData?.id) {
      console.warn('User data is not initialized.');
      return;
    }

    try {
      const { data, count, error } = await supabase
        .from('posts')
        .select('id, title, content, created_at, post_img, longitude, latitude', { count: 'exact' })
        .eq('user_id', userData.id);
      setLongitude(data[0].longitude);
      setLatitude(data[0].latitude);
      if (error) throw error;

      const formattedData = data.map((item) => ({
        ...item,
        // post_img를 그대로 사용
        post_img: item.post_img || null,
        created_at: new Date(item.created_at).toISOString().slice(0, 16).replace('T', ' ')
      }));

      console.log('Formatted Data:', formattedData);

      setContents({ posts: formattedData, postCount: count });
    } catch (err) {
      console.error('Failed to fetch posts:', err.message);
    }
  };

  // 닉네임 변경관련
  const { updateNickname, newNickname, setNewNickname } = useUpdateUser(userData, fetchUserData);

  // 프로필 이미직 관련
  const { handleFileChange, uploadAndSaveProfile, profileImg } = useFileChange(userData);

  // 내 게시물 삭제
  const handleDelete = async (postId) => {
    try {
      // 삭제를 테스트 하기 위해서 임시 값을 넣어둠
      const { error } = await supabase.from('posts').delete().eq('id', postId);
      // 현제 코드는 로그인값이 구현되지 않아서 userId값이 아니라 tsetID값을 사용중임
      if (error) {
        console.log(error);
        alert('삭제 중 문제가 발생했습니다.');
      } else {
        // posts 배열에서 삭제된 게시글을 필터링하여 상태 업데이트
        setContents((prevData) => ({
          ...prevData, // 기존 객체 유지
          posts: prevData.posts.filter((post) => post.id !== postId) // posts 배열 업데이트
        }));

        alert('게시물이 삭제되었습니다.');
      }
    } catch (err) {
      console.error('삭제 중 예외 발생:', err.message);
    }
  };

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
