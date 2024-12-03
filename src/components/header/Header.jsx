import { useEffect, useState } from 'react';
import LoggedinHeader from './LoggedinHeader';
import LoggedoutHeader from './LoggedoutHeader';
import { NavHeader, NavLink } from './headerStyle';
import supabase from '../../utils/supabaseClient';




const Header = () => {
  //유저 로그인 상태
  const [isLoggedin, setIsLoggedin] = useState(null);

  // 유저정보 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        console.log('유저 정보:', data.user); // 유저 정보 확인
        setIsLoggedin(data.user);
      } catch (error) {
        console.log(error);
        console.error('유저 정보를 가져오는 중 오류 발생:', error.message);
      }
    };
    fetchUser();
  }, []);

  return (
    <NavHeader>
      <div>
        <NavLink to={'/'}>GHOST HOUSE</NavLink>
      </div>
      <div>{isLoggedin ? <LoggedinHeader /> : <LoggedoutHeader />}</div>
    </NavHeader>
  );
};

export default Header;
