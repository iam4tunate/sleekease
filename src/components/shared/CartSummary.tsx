import { useCartContext } from '@/context/CartContext';
import { useGetCurrentUser } from '@/lib/react-query/queries';
import { ICartItem } from '@/lib/types';
import { cn, formatNumberWithCommas } from '@/lib/utils';
import { Models } from 'appwrite';
import { Button } from '../ui/button';
import { Link, useLocation } from 'react-router-dom';

export default function CartSummary({ noBtn }: { noBtn?: boolean }) {
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
  switch (pathname) {
    case '/cart':
      deliveryFee = 0;
      break;
    case '/checkout':
      deliveryFee = 5000;
      break;
    default:
      break;
  }

  return (
    <div className='border border-dark border-opacity-20  py-3.5 rounded-md h-fit'>
      <div className='px-4'>
        <div className='font-rubikSemibold text- pb-4'>Cart Summary</div>
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
              {pathname === '/cart' ? (
                <span className='font-rubik'>not included yet</span>
              ) : (
                `₦${formatNumberWithCommas(deliveryFee!)}`
              )}
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
          <div className='h-[1px] w-full block bg-dark bg-opacity-20' />
        </div>
        <Link to='/checkout' className={cn({ hidden: noBtn })}>
          <Button
            disabled={empty}
            className='py-2.5 bg-primary text-white rounded-full w-full mt-3.5 font-semibold'>
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}
