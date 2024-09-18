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

export default function Cart() {
  const { data: currentUser } = useGetCurrentUser();
  const { cart } = useCartContext();

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
        <div className='heading'>Shopping Cart</div>
        <div className='grid grid-cols-[55%_35%] max-lg:grid-cols-[60%_35%] gap-y-6 max-md:grid-cols-1 justify-between'>
          <ScrollArea className='max-h-[60vh] h-full w-full rounded-md border p-4'>
            {userCart ?? guestCart}
          </ScrollArea>
          <div className=''>
            <CartSummary />
          </div>
        </div>
        <TopSelling />
      </div>
      <div className='container mb-8 padX'>
        <ShopCta />
      </div>
    </div>
  );
}
