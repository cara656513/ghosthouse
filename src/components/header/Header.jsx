import LoggedinHeader from './LoggedinHeader';
import LoggedoutHeader from './LoggedoutHeader';
import { NavButton, NavHeader } from './headerStyle';
import { useUserStore } from '../../zustand/userStore';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  // 유저정보 가져오기
  const user = useUserStore((state) => state.user);
  const nav = useNavigate();

  const homeHandler = () => {
    nav('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavHeader>
      <div>
        <NavButton onClick={homeHandler}>GHOST HOUSE</NavButton>
      </div>
      <div>{user ? <LoggedinHeader /> : <LoggedoutHeader />}</div>
    </NavHeader>
  );
};

export default Header;
