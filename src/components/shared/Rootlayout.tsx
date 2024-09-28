import { NavLink, Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import { useUserContext } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Heart, Package2, Shirt, ShoppingBag } from 'lucide-react';
import { useGetCurrentUser } from '@/lib/react-query/queries';
import { useCartContext } from '@/context/CartContext';
import { Models } from 'appwrite';

export default function Rootlayout() {
  const { isAuthenticated, userLoading } = useUserContext();

  const { localCart } = useCartContext();
  const { data: currentUser } = useGetCurrentUser();
  const appwriteCart = currentUser?.cart || null;
  const savedItems = currentUser?.saved ?? [];

  const appwriteCartLength =
    appwriteCart?.filter((cartItem: Models.Document) => !cartItem.isDeleted)
      .length || null;
  const localCartLength = localCart?.length || null;

  return (
    <div className='relative min-h-screen antialiased'>
      <div className='pb-[4rem] max-[300px]:h-[3rem] md:pb-0'>
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
      </div>
      <div className='mt-[4rem] shadow-inner md:hidden h-16 max-[300px]:h-12 bg-white fixed bottom-0 right-0 left-0 z-50 flex items-center justify-between gap-x-6 px-16 max-sm:px-6'>
        <NavLink
          to='/shop'
          className={({ isActive }) =>
            cn('flex flex-col gap-y-0.5 items-center justify-center', {
              'text-destructive': isActive,
            })
          }>
          <Shirt className='h-6 w-6 max-sm:h-[22px] max-sm:w-[22px]' />
          <span className='max-sm:text-xs max-[300px]:hidden'>Shop</span>
        </NavLink>
        <NavLink
          to='/cart'
          className={({ isActive }) =>
            cn('flex flex-col gap-y-0.5 items-center justify-center', {
              'text-destructive': isActive,
            })
          }>
          <span className='relative'>
            <ShoppingBag className='h-6 w-6 max-sm:h-[22px] max-sm:w-[22px]' />
            {(appwriteCartLength || localCartLength) && (
              <span className='bg-primary text-white h-4 w-4 flex items-center justify-center rounded-full border border-white absolute -top-1 -right-2 text-[10px] font-rubikSemibold'>
                {appwriteCartLength ?? localCartLength}
              </span>
            )}
          </span>
          <span className='max-sm:text-xs max-[300px]:hidden'>Cart</span>
        </NavLink>
        <NavLink
          to='/customer/wishlist'
          className={({ isActive }) =>
            cn('flex flex-col gap-y-0.5 items-center justify-center', {
              'text-destructive': isActive,
            })
          }>
          <span className='relative'>
            <Heart className='h-6 w-6 max-sm:h-[22px] max-sm:w-[22px]' />
            {savedItems.length !== 0 && (
              <span className='bg-primary text-white h-4 w-4 flex items-center justify-center rounded-full border border-white absolute -top-1 -right-2 text-[10px] font-rubikSemibold'>
                {savedItems.length}
              </span>
            )}
          </span>
          <span className='max-sm:text-xs max-[300px]:hidden'>Wishlist</span>
        </NavLink>
        <NavLink
          to='/customer/orders'
          className={({ isActive }) =>
            cn('flex flex-col gap-y-0.5 items-center justify-center', {
              'text-destructive': isActive,
            })
          }>
          <Package2 className='h-6 w-6 max-sm:h-[22px] max-sm:w-[22px]' />
          <span className='max-sm:text-xs max-[300px]:hidden'>Orders</span>
        </NavLink>
      </div>
    </div>
  );
}
