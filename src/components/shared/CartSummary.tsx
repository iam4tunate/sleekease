import { useCartContext } from '@/context/CartContext';
import { useGetCurrentUser } from '@/lib/react-query/queries';
import { ICartItem } from '@/lib/types';
import { formatNumberWithCommas } from '@/lib/utils';
import { Models } from 'appwrite';
import { useLocation } from 'react-router-dom';

export default function CartSummary() {
  const { pathname } = useLocation();
  const { data: currentUser } = useGetCurrentUser();
  const { cart: guestCart } = useCartContext();
  const userCart = currentUser?.cart;

  const userTotalAmount =
    currentUser &&
    userCart?.reduce((total: number, item: Models.Document) => {
      return total + item.product.price * item.quantity;
    }, 0);

  const guestTotalAmount = guestCart?.items.reduce(
    (total: number, item: ICartItem) => {
      return total + item.price * item.quantity;
    },
    0
  );

  const empty =
    (currentUser && userTotalAmount === 0) ||
    (!currentUser && guestTotalAmount === 0);

  let deliveryFee;
  if (pathname === '/checkout') {
    deliveryFee = 5000;
  } else {
    deliveryFee = 0;
  }

  return (
    <div className='border border-dark border-opacity-20  py-3.5 rounded-md h-fit'>
      <div className='px-4'>
        <div className='space-y-4'>
          <span className='flex items-center justify-between font-rubikMedium'>
            <span>Subtotal</span>
            <span>
              ₦{formatNumberWithCommas(userTotalAmount ?? guestTotalAmount)}
              {empty && '.00'}
            </span>
          </span>
          <span className='flex items-center justify-between font-rubikMedium'>
            <span>Delivery Free</span>
            <span>
              {deliveryFee === 5000
                ? `₦${formatNumberWithCommas(deliveryFee)}`
                : 'not included yet'}
            </span>
          </span>
          <span className='flex items-center justify-between font-rubikMedium'>
            <span>Grand Total</span>
            <span>
              ₦
              {formatNumberWithCommas(
                (userTotalAmount ?? guestTotalAmount) + deliveryFee
              )}
              {empty && '.00'}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
