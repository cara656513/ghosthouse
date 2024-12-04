import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../zustand/userStore';

const ProtectedRoute = () => {
  const user = useUserStore((state) => state.user);
  console.log('user', user);

  return user ? <Outlet /> : <Navigate to={'/signin'} />;
};

export default ProtectedRoute;
