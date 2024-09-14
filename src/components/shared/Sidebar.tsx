import { useUserContext } from '@/context/AuthContext';
import { AdminDashboardNav, DashboardNav } from '@/lib/constants';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const { user } = useUserContext();

  return (
    <div className='bg-white rounded-sm shadow'>
      <ul className=''>
        {DashboardNav.map((nav) => (
          <Link
            key={nav.name}
            to={nav.href}
            className={`first:rounded-t-sm px-3 flex items-center gap-x-4 py-4 ${
              location.pathname === nav.href
                ? 'bg-gray-100 text-orange'
                : ''
            }`}>
            <nav.icon size={20} />
            <span>{nav.name}</span>
          </Link>
        ))}
        <div className='px-3 font-rubikMedium pt-2'>Admin</div>
        {user &&
          user.label === 'admin' &&
          AdminDashboardNav.map((nav) => (
            <Link
              key={nav.name}
              to={nav.href}
              className={`first:rounded-t-sm px-3 flex items-center gap-x-4 py-4 ${
                location.pathname === nav.href
                  ? 'bg-gray-100 text-orange'
                  : ''
              }`}>
              <nav.icon size={20} />
              <span>{nav.name}</span>
            </Link>
          ))}
      </ul>
    </div>
  );
}
