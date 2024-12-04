import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import { useUserStore } from '../zustand/userStore';
import { useEffect } from 'react';
import supabase from '../utils/supabaseClient';

const Layout = () => {
  const { setUser } = useUserStore();

  useEffect(() => {
    const initializeAuth = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      setUser({ user });
    };
    initializeAuth();
  }, [setUser]);
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
