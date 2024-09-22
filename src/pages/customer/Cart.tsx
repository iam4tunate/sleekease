import {
  CartItem,
  CartSummary,
  ShopCta,
  TopSelling,
} from '@/components/shared';
import { useGetCurrentUser } from '@/lib/react-query/queries';
import { Models } from 'appwrite';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCartContext } from '@/context/CartContext';
import { ICartItem } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { data: currentUser, isPending: isLoading } = useGetCurrentUser();
  const { cart } = useCartContext();
  console.log(cart);
  const userCart = currentUser?.cart
    .slice()
    .reverse()
    .map((cartItem: Models.Document) => (
      <CartItem key={cartItem.$id} user={cartItem} />
    ));

  const guestCart = cart?.items
    .slice()
    .reverse()
    .map((cartItem: ICartItem) => (
      <CartItem key={cartItem.$id} guest={cartItem} />
    ));

  return (
    <div className=''>
      <div className='container padX padY'>
        <div className='heading'>Your Cart</div>
        <div className='grid grid-cols-[60%_35%] max-lg:grid-cols-[60%_35%] gap-y-6 max-md:grid-cols-1 justify-between'>
          <ScrollArea className='max-h-[60vh] w-full h-full rounded-md border p-4'>
            {isLoading && currentUser ? (
              Array.from({ length: 2 }, (_, index) => (
                <div
                  key={index}
                  className='h-28 max-[400px]:h-full flex max-[400px]:flex-col items-start justify-between pb-5 mb-5 max-sm:pb-8 last-of-type:pb-0 last-of-type:mb-0'>
                  <div className='flex gap-x-4'>
                    <Skeleton className='w-36 h-28 max-sm:w-24 rounded-md' />
                    <div className='flex flex-col gap-y-2.5 w-full'>
                      <Skeleton className='h-5 w-26 rounded' />
                      <Skeleton className='h-4 w-16 rounded' />
                      <Skeleton className='h-8 w-20 rounded' />
                    </div>
                  </div>
                  <div className='h-full max-[400px]:w-full flex flex-col justify-between items-end max-[400px]:flex-row max-[400px]:justify-between text-right'>
                    <Skeleton className='h-5 w-24 max-sm:w-16 rounded' />
                    <Skeleton className='h-8 w-8 rounded-full' />
                  </div>
                </div>
              ))
            ) : (currentUser && !isLoading && !userCart?.length) ||
              (!currentUser && !guestCart.length) ? (
              <div className='flex flex-col items-center justify-center py-8'>
                <img
                  src='/images/empty-bag.png'
                  alt='shopping bag'
                  className='w-[10rem] max-sm:w-[8rem]'
                />
                <div className='font-rubikMedium text-lg'>
                  Your bag is empty
                </div>
                <p className='pt-1 pb-4 text-center'>
                  Add some items to your shopping bag to get started.
                </p>
                <Button type='button' asChild>
                  <Link to='/shop'>Shop Now</Link>
                </Button>
              </div>
            ) : (
              userCart ?? guestCart
            )}
          </ScrollArea>
          <div className=''>
            <CartSummary />
          </div>
        </div>
        <div className='padY'>
          <TopSelling />
        </div>
      </div>
      <div className='container mb-8 padX padY'>
        <ShopCta />
      </div>
    </div>
  );
}
