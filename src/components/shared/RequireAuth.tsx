import { useAuth } from '@/context/AuthContext';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user, userLoading } = useAuth();
  const location = useLocation();

  const hasAccess = user && !userLoading && allowedRoles?.includes(user.role);

  return hasAccess ? (
    <Outlet />
  ) : (
    !user && !userLoading && (
      // Not logged in
      <Navigate to='/login' state={{ from: location }} replace />
    )
  );
};

export default RequireAuth;
