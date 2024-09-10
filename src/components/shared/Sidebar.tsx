import { DashboardNav } from '@/lib/constants';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  
  return (
    <div className='bg-white rounded-sm shadow'>
      <ul className=''>
        {DashboardNav.map((nav) => (
          <Link
            key={nav.name}
            to={nav.href}
            className={`first:rounded-t-sm px-3 flex items-center gap-x-4 py-4 ${
              location.pathname === nav.href
                ? 'bg-gray-100 font-rubikMedium'
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
