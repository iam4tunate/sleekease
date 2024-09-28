import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AdminDashboardNav, DashboardNav } from '@/lib/constants';
import { Menu } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useUserContext } from '@/context/AuthContext';

export default function DashboardLayout() {
  const location = useLocation();
  const { user } = useUserContext();

  return (
    <div className='bg-[#EA7227] bg-opacity-[0.03] h-full py-6 max-sm:py-4 min-h-[calc(100vh-97px)]'>
      <div className='hidden max-md:flex padX container fle justify-end'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Menu size={30} className='cursor-pointer' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='ml-6 max-sm:ml-4 w-44'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className='space-y-1'>
              {DashboardNav.map((nav) => (
                <Link
                  key={nav.name}
                  to={nav.href}
                  className={
                    location.pathname === nav.href ? 'text-orange' : ''
                  }>
                  <DropdownMenuItem className='mb-6 last:mb-0'>
                    <nav.icon className='mr-2 h-4 w-4' />
                    <span>{nav.name}</span>
                  </DropdownMenuItem>
                </Link>
              ))}
              <DropdownMenuSeparator />
              {user &&
                user.role === 'admin' &&
                AdminDashboardNav.map((nav) => (
                  <div className=''>
                    <DropdownMenuLabel>Admin</DropdownMenuLabel>
                    <Link
                      key={nav.name}
                      to={nav.href}
                      className={
                        location.pathname === nav.href ? 'text-orange' : ''
                      }>
                      <DropdownMenuItem className='mb-6 last:mb-0'>
                        <nav.icon className='mr-2 h-4 w-4' />
                        <span>{nav.name}</span>
                      </DropdownMenuItem>
                    </Link>
                  </div>
                ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='padX py-1 container grid grid-cols-[20%_78%] max-lg:grid-cols-[30%_68%] max-md:grid-cols-1 items-start justify-between'>
        <div className='max-md:hidden sticky top-[75px] bottom-0'>
          <Sidebar />
        </div>
        <div className='bg-white pt-4 pb-8 rounded-sm shadow'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
