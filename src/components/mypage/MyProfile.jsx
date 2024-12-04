import React from 'react';

import {
  MyPofileTable,
  ProfileImageWrap,
  MyPageListProfileImg,
  MyNickname,
  OpenModalBtn
} from '../../components/mypage/myprofilestyle';

const MyProfile = ({ profileImg, nickname, postCount, setIsModalOpen }) => {
  return (
    <MyPofileTable>
      <ProfileImageWrap>
        <MyPageListProfileImg src={profileImg || '/default-profile.png'} alt="Profile" />
      </ProfileImageWrap>
      <ul>
        <p>{nickname} 님</p>
        <p>{postCount}Post</p>
      </ul>
      <OpenModalBtn onClick={() => setIsModalOpen(true)}>프로필 수정</OpenModalBtn>
    </MyPofileTable>
  );
};

export default MyProfile;