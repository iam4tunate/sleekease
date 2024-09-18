import {
  BadgeCheck,
  CircleUserRound,
  Heart,
  Logs,
  Package2,
  ShoppingBag,
  User,
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
import {
  useGetCurrentUser,
  useLogoutUser,
  useSyncCartOnLogin,
} from '@/lib/react-query/queries';
import { useEffect } from 'react';
import { useCartContext } from '@/context/CartContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, userLoading, user } = useUserContext();
  const { mutateAsync: logout, isSuccess } = useLogoutUser();
  const { mutateAsync: syncOnLogin } = useSyncCartOnLogin();
  const { data: currentUser } = useGetCurrentUser();
  const { cart: localCart } = useCartContext();

  const userCart = currentUser?.cart;
  const guestCart = localCart.items;

  // Move all items from local storage cart to appwrite on login
  useEffect(() => {
    const runOnLogin = async () => {
      if (user?.id) {
        await syncOnLogin(user?.id);
      }
    };
    runOnLogin();
  }, [syncOnLogin, user.id]);

  const handleLogout = async () => {
    await logout(user.id);
  }; 

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [navigate, isSuccess]);

  return (
    <nav className='shadow-sm fixed top-0 left-0 right-0 z-50'>
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
            <Link to='/register' className='max-[370px]:hidden'>
              Create account
            </Link>
            <Link to='/register' className='hidden max-[370px]:flex'>
              Register
            </Link>
          </div>
        </div>
      </div>
      <div className='bg-white'>
        <div className='h-14 flex items-center justify-between container padX'>
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
                  <Link key={nav.label} to={`/category/${nav.label}`}>
                    <DropdownMenuItem>
                      <nav.icon className='mr-2 h-4 w-4' />
                      <span className='capitalize'>{nav.label}</span>
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to='/'>
            <div className='uppercase font-rubikBold text-lg lg:text-xl italic'>
              Sleekease.
            </div>
          </Link>

          <div className='max-md:hidden flex items-center gap-x-5 max-sm:gap-x-4'>
            <Link
              to='/explore'
              className='border rounded-full px-4 py-1.5 hover:bg-gray-100'>
              Shop All
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='relative cursor-pointer'>
                  <CircleUserRound size={26} />
                  <BadgeCheck
                    size={19}
                    fill='green'
                    color='white'
                    className={cn(
                      'absolute -bottom-1 -right-2',
                      !isAuthenticated && !userLoading && 'hidden'
                    )}
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-44'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup className='space-y-0.5'>
                  <Link to='/customer/overview'>
                    <DropdownMenuItem>
                      <User className='mr-2 h-4 w-4' />
                      <span>Account</span>
                    </DropdownMenuItem>
                  </Link>{' '}
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
                {isAuthenticated && (
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className='w-fit mx-auto text-[13px] px-2 bg-gray-100 hover:bg-orange mt-1.5 cursor-pointer'>
                    <span>Log out</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to='/cart' className='flex items-end gap-x-1 cursor-pointer'>
              <span className='relative'>
                <ShoppingBag size={23} />
                {((userCart && userCart?.length !== 0) ||
                  (guestCart && guestCart?.length !== 0)) && (
                  <span className='bg-primary text-white h-5 w-5 flex items-center justify-center rounded-full border border-white absolute -top-2 -right-2 text-[10px] font-rubikSemibold'>
                    {userCart?.length ?? guestCart.length}
                  </span>
                )}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
