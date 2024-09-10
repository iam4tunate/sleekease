import {
  BadgeCheck,
  CircleUserRound,
  Heart,
  Logs,
  Package2,
  ShoppingBag,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { CategoryNav } from '@/lib/constants';
import { useUserContext } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { useLogoutUser } from '@/lib/react-query/queries';
import { useEffect } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, userLoading } = useUserContext();
  const { mutate: logout, isSuccess } = useLogoutUser();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [navigate, isSuccess]);

  return (
    <nav className='shadow-sm'>
      {/* {!isAuthenticated && !userLoading && ( */}
      <div
        className={cn(
          'bg-gray-100',
          isAuthenticated && !userLoading && 'hidden'
        )}>
        <div className='container padX h-12 flex flex-wrap gap-x-6 items-center justify-between'>
          <p className='font-rubikMedium'>Welcome to our store</p>
          <div className='flex items-center gap-x-4 max-sm:gap-x-3'>
            <Link to='/login'>Log in</Link>
            <span className='h-3.5 w-[1.5px] bg-primary inline-block'></span>
            <Link to='/register'>Create account</Link>
          </div>
        </div>
      </div>
      {/* )} */}
      <div className='container padX w-full'>
        <div className='h-14 flex items-center justify-between'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='flex items-center gap-x-1 bg-gray-100 py-2 rounded-sm px-4 max-sm:px-2 cursor-pointer'>
                <Logs size={20} className='' />
                <span className='font-rubikMedium max-sm:hidden'>
                  Categories
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-44'>
              <DropdownMenuLabel className='hidden max-sm:flex'>
                Categories
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className='space-y-1'>
                {CategoryNav.map((nav) => (
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

          <Link to='/'>
            <div className='font-lora uppercase font-black text-lg lg:text-xl italic'>
              Sleekease.
            </div>
          </Link>

          <div className='flex items-center gap-x-5 max-sm:gap-x-4'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='relative cursor-pointer'>
                  <CircleUserRound size={26} />
                  <BadgeCheck
                    size={16}
                    fill='green'
                    color='white'
                    className={cn(
                      'absolute bottom-0 -right-1.5',
                      !isAuthenticated && !userLoading && 'hidden'
                    )}
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-44'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup className='space-y-0.5'>
                  <Link to='/customer/orders'>
                    <DropdownMenuItem>
                      <Package2 className='mr-2 h-4 w-4' />
                      <span>Orders</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link to='/customer/saved'>
                    <DropdownMenuItem>
                      <Heart className='mr-2 h-4 w-4' />
                      <span>Saved Items</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {isAuthenticated && !userLoading && (
                  <DropdownMenuItem
                    onClick={() => logout()}
                    className='w-fit mx-auto text-[13px] px-2 font-rubikMedium bg-red-100 mt-1.5'>
                    <span>Log out</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to='/cart' className='flex items-end gap-x-1 cursor-pointer'>
              <span className='relative'>
                <ShoppingBag size={23} />
                <span className='bg-primary text-white h-5 w-5 flex items-center justify-center rounded-full border border-white absolute -top-2 -right-2 text-[10px] font-rubikSemibold'>
                  4
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
