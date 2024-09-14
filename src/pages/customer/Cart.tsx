import { CartItem, ShopCta, TopSelling } from '@/components/shared';
import { useGetCurrentUser } from '@/lib/react-query/queries';
import { Models } from 'appwrite';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Cart() {
  const { data: currentUser } = useGetCurrentUser();
  const cart = currentUser?.cart ?? [];

  return (
    <div className=''>
      <div className='container padX padY'>
        <div className='heading'>Shopping Cart</div>
        <div className='grid grid-cols-[55%_35%] max-lg:grid-cols-[60%_35%] gap-y-6 max-md:grid-cols-1 justify-between'>
          <ScrollArea className='max-h-[60vh] w-full rounded-md border p-4 bg-[#FDFDFD] shadow'>
            {cart
              .slice()
              .reverse()
              .map((cartItem: Models.Document) => (
                <CartItem key={cartItem.$id} cartItem={cartItem} />
              ))}
          </ScrollArea>
          <div className='border border-dark border-opacity-20  py-3.5 rounded-md h-fit'>
            <div className='px-4'>
              <div className='font-rubikSemibold text- pb-4'>
                Shopping Summary
              </div>
              <div className='space-y-4'>
                <span className='flex items-center justify-between font-rubikMedium'>
                  <span>Subtotal</span>
                  <span>₦12,900</span>
                </span>
                <span className='flex items-center justify-between font-rubikMedium'>
                  <span>Shipping</span>
                  <span>₦2,000</span>
                </span>
                <span className='flex items-center justify-between font-rubikMedium'>
                  <span>Grand Total</span>
                  <span>₦14,000</span>
                </span>
                <div className='h-[1px] w-full block bg-dark bg-opacity-20' />
              </div>
              <button className='py-2.5 bg-primary text-white rounded-full w-full mt-3.5 font-semibold'>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='py-12'>
        <TopSelling />
      </div>
      <div className='container mb-8 padX'>
        <ShopCta />
      </div>
    </div>
  );
}
