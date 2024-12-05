import { useState } from 'react';
import supabase from '../../utils/supabaseClient';

const Main = () => {
  const [searchPost, setSearchPost] = useState(''); // 포스트 목록들  usestate 관리 (검색)

  // 서치 핸들 , 인풋박스 검색
  const searchHandel = async (e) => {
    e.preventDefault();
    setSearchPost(e.target.value);
    const { data } = await supabase
      .from('posts')
      .select(
        `id, user_id, image_url, created_at, title, content, longitude, latitude, users (id, nickname, created_at, profile)`
      )
      // users 에 email 까지 보이게할거면 email 까지 가져와야함, 일단 id 닉네임, 시간, 프로필 까지만 가져오려고
      .ilike('title', `%${e.target.value}%`);
    // 타이틀로 검색하게할거면 title, 경도 위도 로 검색하려고하면 longitude, latitude 로 검색할거임 , 또 컨텐트나 그런걸로도 검색하게하면 됨,
    searchPost(data);

    
  };
  return (
    <div>
      <form>
        <input type="text" value={searchPost} placeholder="GHOST HOUSE SEARCH" onChange={searchHandel} />
      </form>
    </div>
  );
};

export default Main;
