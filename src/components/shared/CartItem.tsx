import {
  useDeleteFromCart,
  useGetCurrentUser,
  useSaveProduct,
  useUpdateQuatity,
} from '@/lib/react-query/queries';
import { formatNumberWithCommas, truncate } from '@/lib/utils';
import { Models } from 'appwrite';
import { Minus, Plus, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Spinner from './Spinner';
import { toast } from 'sonner';
import { ICartItem } from '@/lib/types';
import { useCartContext } from '@/context/CartContext';

export default function CartItem({
  user,
  guest,
}: {
  user?: Models.Document;
  guest?: ICartItem;
}) {
  const { dispatch } = useCartContext();

  const { data: currentUser } = useGetCurrentUser();
  const savedProducts = currentUser?.saved ?? [];

  const { mutateAsync: deleteItem, isPending: isDeleting } =
    useDeleteFromCart();
  const { mutateAsync: saveItem } = useSaveProduct();
  const { mutateAsync: updateQuantity, isPending: isUpdating } =
    useUpdateQuatity();

  const isProductSaved = async (productId?: string, userId?: string) => {
    if (currentUser) {
      const exists = savedProducts.some(
        (save: Models.Document) => save.product.$id === productId
      );

      if (exists) {
        toast.message('This product is already in your saved list.');
        await deleteItem({ documentId: user!.$id });
      } else {
        await deleteItem({ documentId: user!.$id });
        await saveItem({ productId, userId });
      }
    } else {
      toast.message(
        'Only logged-in users can save products. Please log in to continue.'
      );
    }
  };

  const handleDelete = async () => {
    if (currentUser) {
      await deleteItem({ documentId: user!.$id });
    } else {
      dispatch({ type: 'REMOVE_ITEM', payload: guest!.$id });
      toast.success('Product removed from cart');
    }
  };

  const handleIncrement = async () => {
    if (currentUser) {
      const newQuantity = user?.quantity + 1; // Calculate the new quantity
      await updateQuantity({ documentId: user!.$id, quantity: newQuantity });
    } else {
      dispatch({ type: 'INCREASE_QUANTITY', payload: guest!.$id });
    }
  };

  const handleDecrement = async () => {
    if (currentUser) {
      if (user?.quantity > 1) {
        const newQuantity = user?.quantity - 1;
        await updateQuantity({ documentId: user!.$id, quantity: newQuantity });
      } else {
        return user?.quantity;
      }
    } else {
      if (guest!.quantity > 1) {
        dispatch({ type: 'DECREASE_QUANTITY', payload: guest!.$id });
      } else {
        return guest?.quantity;
      }
    }
  };

  return (
    <div className='flex flex-col last-of-type:border-b-0 border-b border-dark border-opacity-15 pb-5 mb-5 max-sm:pb-8 last-of-type:pb-0 last-of-type:mb-0 gap-2'>
      <div className='h-28 max-[400px]:h-full flex max-[400px]:flex-col items-start justify-between select-none'>
        <div className='flex gap-x-4'>
          <img
            src={user?.product.imageUrls[0] ?? guest?.imageUrls[0]}
            alt={user?.product.title ?? guest?.title}
            className='w-36 h-28 max-sm:w-24 rounded-md object-cover'
          />
          <div className='flex flex-col gap-y-2.5 w-full'>
            <p className='capitalize font-rubikMedium'>
              {truncate(user?.product.title ?? guest?.title, 30)}
            </p>
            <span className='opacity-70 text-xs capitalize'>
              {user?.size ?? guest?.size}
            </span>
            <div className='flex items-center border w-fit'>
              <div
                onClick={handleDecrement}
                className='h-full py-1.5 px-2 max-[300px]:px-1  hover:bg-orange hover:bg-opacity-10 cursor-pointer'>
                <Minus size={16} />
              </div>
              <div className='h-full text-center mx-1 w-6 max-sm:max-w-6 flex items-center justify-center'>
                {isUpdating ? (
                  <Spinner size={13} colored='#E8572A' />
                ) : (
                  <span className='font-rubikMedium w-full'>
                    {user?.quantity ?? guest?.quantity}
                  </span>
                )}
              </div>
              <div
                onClick={handleIncrement}
                className='h-full py-1.5 px-2 max-[300px]:px-1 hover:bg-orange hover:bg-opacity-10 cursor-pointer'>
                <Plus size={16} />
              </div>
            </div>
          </div>
        </div>
        <div className='h-full max-[400px]:w-full flex flex-col items-end max-[400px]:flex-row max-[400px]:justify-between text-right'>
          <p className='font-rubikSemibold opacity-90 mb-auto  max-sm:py-2'>
            ₦
            {formatNumberWithCommas(
              user
                ? user?.product.price * user?.quantity
                : guest!.price * guest!.quantity
            )}
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              {isDeleting ? (
                <Spinner size={20} colored='#E8572A' />
              ) : (
                <div className='flex items-center gap-x-2 text-orange hover:bg-orange hover:bg-opacity-25 rounded px-2 py-2 cursor-pointer'>
                  <Trash2 size={17} />{' '}
                  <span className='font-rubikMedium'>Remove</span>
                </div>
              )}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to remove this item from your cart? You
                  can save it for later before removing it.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className='w-full flex justify-between max-sm:justify-start'>
                <AlertDialogCancel className='bg-gray-200 hover:bg-gray-300'>
                  Cancel
                </AlertDialogCancel>
                <div className='flex max-sm:flex-col justify-end gap-3 w-full'>
                  <AlertDialogAction
                    onClick={() =>
                      isProductSaved(user?.product.$id, currentUser?.$id)
                    }
                    className='bg-orange text-white hover:bg-darkOrange'>
                    Save for later
                  </AlertDialogAction>
                  <AlertDialogAction onClick={handleDelete}>
                    Remove
                  </AlertDialogAction>
                </div>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
