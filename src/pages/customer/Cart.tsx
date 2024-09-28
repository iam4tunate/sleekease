import { CartItem, CartSummary, TopSelling } from '@/components/shared';
import { useGetCurrentUser } from '@/lib/react-query/queries';
import { Models } from 'appwrite';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCartContext } from '@/context/CartContext';
import { ICartItem } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Cart() {
  const navigate = useNavigate();
  const [isVisible, setVisible] = useState(true);

  const { localCart } = useCartContext();
  const { data: currentUser, isPending: isLoading } = useGetCurrentUser();
  const appwriteCart = currentUser?.cart || null;

  //filtered appwrite cart length
  const appwriteCartLength =
    appwriteCart?.filter((item: Models.Document) => item.isDeleted !== true)
      .length || 0;
  const localCartLength = localCart?.length;

  const appwriteCartItems = appwriteCart
    ?.slice()
    .reverse()
    .filter((item: Models.Document) => item.isDeleted !== true)
    .map((item: Models.Document) => (
      <CartItem key={item.productId} appwriteCartItem={item} />
    ));

  const localCartItems = localCart
    ?.slice()
    .reverse()
    .map((item: ICartItem) => (
      <CartItem key={item.productId} localCartItem={item} />
    ));

  //toglling visibility for cart page base on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  if (!isVisible) {
    navigate('/not-found');
    return null;
  }

  return (
    <div className=''>
      <div className='container padX padY'>
        <div className='heading'>Your Cart</div>
        <div className='grid grid-cols-[60%_35%] max-lg:grid-cols-[60%_35%] gap-y-4 max-md:grid-cols-1 justify-between h-full'>
          <ScrollArea className='max-h-[60vh] w-full h-auto rounded-md border p-4'>
            {isLoading && !localCartLength ? (
              Array.from({ length: 2 }, (_, index) => (
                <div
                  key={index}
                  className='h-28 max-[400px]:h-full flex max-[400px]:flex-col items-start justify-between pb-5 mb-5 max-sm:pb-8 last-of-type:pb-0 last-of-type:mb-0'>
                  <div className='flex gap-x-4'>
                    <Skeleton className='w-36 h-28 max-sm:w-24' />
                    <div className='flex flex-col gap-y-2.5 w-full'>
                      <Skeleton className='h-5 w-26' />
                      <Skeleton className='h-4 w-16' />
                      <Skeleton className='h-8 w-20' />
                    </div>
                  </div>
                  <div className='h-full max-[400px]:w-full flex flex-col justify-between items-end max-[400px]:flex-row max-[400px]:justify-between text-right'>
                    <Skeleton className='h-5 w-24 max-sm:w-16' />
                    <div className='flex items-center gap-x-4'>
                      <Skeleton className='h-8 w-8 rounded-full' />
                      <Skeleton className='h-8 w-8 rounded-full' />
                    </div>
                  </div>
                </div>
              ))
            ) : (currentUser && !isLoading && !appwriteCartLength) ||
              (!currentUser && !localCartLength) ? (
              <div className='flex flex-col items-center justify-center py-8'>
                <img
                  src='/images/empty-bag.png'
                  alt='shopping bag'
                  className='w-[10rem] max-sm:w-[8rem]'
                />
                <div className='font-rubikMedium text-lg'>
                  Your cart is empty
                </div>
                <p className='pt-1 pb-4 text-center'>
                  Add some items to get started.
                </p>
                <Button type='button' asChild>
                  <Link to='/shop'>Shop Now</Link>
                </Button>
              </div>
            ) : (
              appwriteCartItems ?? localCartItems
            )}
          </ScrollArea>
          <div className=''>
            <CartSummary />
            <div>
              {currentUser ? (
                <Button
                  onClick={() => navigate('/checkout')}
                  disabled={!appwriteCartLength}
                  className='py-2.5 bg-primary text-white rounded-full w-full mt-3.5'>
                  Proceed to Checkout
                </Button>
              ) : (
                <Button
                  onClick={() => navigate('/checkout')}
                  className='py-2.5 bg-primary text-white rounded-full w-full mt-3.5'>
                  Login to Checkout
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className='padY'>
          <TopSelling />
        </div>
      </div>
    </div>
  );
}
