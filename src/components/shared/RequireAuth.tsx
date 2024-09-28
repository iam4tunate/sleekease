import { useUserContext } from '@/context/AuthContext';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user, userLoading } = useUserContext();
  const location = useLocation();

  const hasAccess = user && !userLoading && allowedRoles?.includes(user.role);

  return hasAccess ? (
    <Outlet />
  ) : user && !userLoading ? (
    // Logged in users but don't have access to the page
    <Navigate to='/' state={{ from: location }} replace />
  ) : (
    // Not logged in
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default RequireAuth;
