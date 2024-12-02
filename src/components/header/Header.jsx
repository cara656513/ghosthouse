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
    try {
      const fetchUser = async () => {
        const { data } = await supabase.auth.getUser();
        setIsLoggedin(data.user);
      };
      fetchUser();
    } catch (error) {
      console.error(error.message);
    }
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
