import { Link, Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import { useUserContext } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import {
  BadgeCheck,
  CircleUserRound,
  Pocket,
  Shirt,
  ShoppingBag,
} from 'lucide-react';
import { useGetCurrentUser } from '@/lib/react-query/queries';

export default function Rootlayout() {
  const { isAuthenticated, userLoading } = useUserContext();
  const { data: currentUser } = useGetCurrentUser();
  const cart = currentUser?.cart ?? [];

  return (
    <div className='relative min-h-screen antialiased'>
      <Navbar />
      <main
        className={cn(
          '',
          isAuthenticated && !userLoading
            ? 'pt-[56px] min-h-[calc(100vh-40px)]'
            : 'pt-[104px] min-h-[calc(100vh-44px)]'
        )}>
        <Outlet />
      </main>
      <Footer />
      <div className='shadow-inner md:hidden h-16 max-[300px]:h-12 bg-white fixed bottom-0 right-0 left-0 z-50 flex items-center justify-between gap-x-6 px-16 max-sm:px-6'>
        <Link
          to='/explore'
          className='flex flex-col gap-y-0.5 items-center justify-center'>
          <Shirt className='h-6 max-sm:h-5 w-6 max-sm:w-5' />
          <span className='max-sm:text-xs max-[300px]:hidden'>Shop</span>
        </Link>
        <Link
          to='/customer/overview'
          className='flex flex-col gap-y-0.5 items-center justify-center'>
          <div className='relative'>
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
          <span className='max-sm:text-xs max-[300px]:hidden'>My Account</span>
        </Link>
        {/* <Link
          to='/customer/overview'
          className='flex flex-col gap-y-0.5 items-center justify-center'>
          <User className='h-6 max-sm:h-5 w-6 max-sm:w-5' />
          <span className='max-sm:text-xs max-[300px]:hidden'>My Account</span>
        </Link> */}
        <Link
          to='/customer/saved'
          className='flex flex-col gap-y-0.5 items-center justify-center'>
          <Pocket className='h-6 max-sm:h-5 w-6 max-sm:w-5' />
          <span className='max-sm:text-xs max-[300px]:hidden'>Saved</span>
        </Link>
        <Link
          to='/cart'
          className='flex flex-col gap-y-0.5 items-center justify-center'>
          <span className='relative'>
            <ShoppingBag className='h-6 max-sm:h-5 w-6 max-sm:w-5' />
            {cart.length !== 0 && (
              <span className='bg-primary text-white h-4 w-4 flex items-center justify-center rounded-full border border-white absolute -top-1 -right-2 text-[10px] font-rubikSemibold'>
                {cart.length}
              </span>
            )}
          </span>
          <span className='max-sm:text-xs max-[300px]:hidden'>Cart</span>
        </Link>
      </div>
    </div>
  );
}
