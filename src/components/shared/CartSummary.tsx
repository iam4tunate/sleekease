import { useCartContext } from '@/context/CartContext';
import { useGetCurrentUser } from '@/lib/react-query/queries';
import { ICartItem } from '@/lib/types';
import { formatNumberWithCommas } from '@/lib/utils';
import { Models } from 'appwrite';

export default function CartSummary() {
  const { data: currentUser } = useGetCurrentUser();
  const { cart: guestCart } = useCartContext();
  const userCart = currentUser?.cart;

  const userTotalAmount = userCart?.reduce(
    (total: number, item: Models.Document) => {
      return total + item.product.price * item.quantity;
    },
    0
  );

  const guestTotalAmount = guestCart?.items.reduce(
    (total: number, item: ICartItem) => {
      return total + item.price * item.quantity;
    },
    0
  );

  return (
    <div className='border border-dark border-opacity-20  py-3.5 rounded-md h-fit'>
      <div className='px-4'>
        <div className='font-rubikSemibold text- pb-4'>Shopping Summary</div>
        <div className='space-y-4'>
          <span className='flex items-center justify-between font-rubikMedium'>
            <span>Subtotal</span>
            <span>
              {formatNumberWithCommas(userTotalAmount ?? guestTotalAmount)}{' '}
              Naira
            </span>
          </span>
          {/* <span className='flex items-center justify-between font-rubikMedium'>
            <span>Delivery Fee</span>
            <span>₦2,000</span>
          </span>
          <span className='flex items-center justify-between font-rubikMedium'>
            <span>Grand Total</span>
            <span>₦14,000</span>
          </span> */}
          <p>Delivery fee not included yet</p>
          <div className='h-[1px] w-full block bg-dark bg-opacity-20' />
        </div>
        <button className='py-2.5 bg-primary text-white rounded-full w-full mt-3.5 font-semibold'>
          Checkout
        </button>
      </div>
    </div>
  );
}
