import { useUserContext } from '@/context/AuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AdminRoutes = () => {
  const location = useLocation();
  const { user } = useUserContext();

  return user && user?.label === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  );
};
export default AdminRoutes;
