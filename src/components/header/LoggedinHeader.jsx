import { useNavigate } from 'react-router-dom';
import { ModalContainer, NavButton, NavLink } from './headerStyle';
import { useState } from 'react';
import ModalImg from './ModalImg';
import supabase from '../../utils/supabaseClient';
import { useUserStore } from '../../zustand/userStore';

const LoggedinHeader = () => {
  const nav = useNavigate();
  const [modal, setModal] = useState(false);
  const { setUser } = useUserStore();

  const logoutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('로그아웃 실패');
      return;
    }
    setModal(true);
    console.log('11');
  };

  const closeModal = () => {
    setModal(false);
    setUser(null);
    nav('/signin');
  };
  console.log('modal', modal);

  return (
    <div>
      <div>
        <NavLink to={'/newpost'}>NEW POST</NavLink>
        <NavLink to={'/mypage'}>MY PAGE</NavLink>
        <NavButton onClick={logoutHandler}>LOG-OUT</NavButton>
        <ModalContainer>{modal && <ModalImg onClose={closeModal} />}</ModalContainer>
      </div>
    </div>
  );
};

export default LoggedinHeader;
