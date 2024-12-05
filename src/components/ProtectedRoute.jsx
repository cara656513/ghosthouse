import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../zustand/userStore';

const ProtectedRoute = () => {
  const user = useUserStore((state) => state.user);
  const isUserLoaded = useUserStore((state) => state.isLoaded);


  if (!isUserLoaded) {
    return <div>Loading...</div>;
  }
  return user ? <Outlet /> : <Navigate to={'/signin'} />;
};

export default ProtectedRoute;
