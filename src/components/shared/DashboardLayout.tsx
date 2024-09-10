import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DashboardNav } from '@/lib/constants';
import { Menu } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function DashboardLayout() {
  return (
    <div className='bg-[#EA7227] bg-opacity-5 h-full py-6 min-h-[calc(100vh-144px)]'>
      <div className='hidden max-md:flex padX container'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Menu size={30} className='cursor-pointer' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='ml-6 max-sm:ml-4 w-44'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className='space-y-0.5'>
              {DashboardNav.map((nav) => (
                <Link key={nav.name} to={nav.href}>
                  <DropdownMenuItem>
                    <nav.icon className='mr-2 h-4 w-4' />
                    <span>{nav.name}</span>
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='padX py-1 container grid grid-cols-[25%_73%] max-md:grid-cols-1 items-start justify-between'>
        <div className='max-md:hidden'>
          <Sidebar />
        </div>
        <div className='bg-white pt-4 pb-8 rounded-sm shadow'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
