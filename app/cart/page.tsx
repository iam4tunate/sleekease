import { CartItem } from '@/components/shared';

export default function Page() {
  return (
    <div className='container padX padY'>
      <div className='text-2xl font-lora font-medium pb-8'>Shopping Cart</div>
      <div className='grid grid-cols-[55%_35%] max-lg:grid-cols-[60%_35%] gap-y-8 max-md:grid-cols-1 justify-between'>
        <div className=''>
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
        <div className='border border-dark border-opacity-20  py-3.5 rounded-md h-fit'>
          <div className='px-4'>
            <div className='font-poppinsSemibold text- pb-4'>
              Shopping Summary
            </div>
            <div className='space-y-4'>
              <span className='flex items-center justify-between font-poppinsMedium'>
                <span>Subtotal</span>
                <span>12,000 Naira</span>
              </span>
              <span className='flex items-center justify-between font-poppinsMedium'>
                <span>Shipping</span>
                <span>2,000 Naira</span>
              </span>
              <span className='flex items-center justify-between font-poppinsMedium'>
                <span>Grand Total</span>
                <span>14,000 Naira</span>
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
  );
}
