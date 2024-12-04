import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../zustand/userStore';

const GuestRoute = () => {
  const user = useUserStore((state) => state.user);

  return !user ? <Navigate to="/" /> : <Outlet />;
};

export default GuestRoute;
