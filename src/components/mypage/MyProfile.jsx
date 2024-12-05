import {
  MyPofileTable,
  ProfileImageWrap,
  MyPageListProfileImg,
  OpenModalBtn
} from '../../components/mypage/myprofilestyle';

const MyProfile = ({ profileImg, nickname, postCount, setIsModalOpen }) => {
  return (
    <MyPofileTable>
      <ProfileImageWrap>
        <MyPageListProfileImg src={profileImg} alt="Profile" />
      </ProfileImageWrap>
      <ul style={{display:"flex", flexDirection:"column", gap:"8px"}}>
        <p style={{fontSize:"20px"}}>{nickname} 님</p>
        <p style={{color:"#373737"}}>{postCount} 개의 게시물</p>
      </ul>
      <OpenModalBtn onClick={() => setIsModalOpen(true)}>프로필 수정</OpenModalBtn>
    </MyPofileTable>
  );
};

export default MyProfile;
