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
import { useUserContext } from '@/context/AuthContext';
import { toast } from 'sonner';
import { useState } from 'react';

export default function CartItem({ cartItem }: { cartItem: Models.Document }) {
  const { user } = useUserContext();
  const { $id, product, size, quantity } = cartItem;
  const [updatedQuantity, setUpdatedQuantity] = useState(quantity);

  const { data: currentUser } = useGetCurrentUser();
  const savedProducts = currentUser?.saved ?? [];

  const { mutateAsync: deleteItem, isPending: isDeleting } =
    useDeleteFromCart();
  const { mutateAsync: saveItem } = useSaveProduct();
  const { mutateAsync: updateQuantity, isPending: isUpdating } =
    useUpdateQuatity();

  const isProductSaved = async (productId: string, userId: string) => {
    // TODO: if no userId save to localStorage
    const exists = savedProducts.some(
      (save: Models.Document) => save.product.$id === productId
    );

    if (exists) {
      toast.message('This product is already in your saved list.');
      await deleteItem({ documentId: $id });
    } else {
      await saveItem({ productId, userId });
      await deleteItem({ documentId: $id });
    }
  };

  const handleDelete = async () => {
    await deleteItem({ documentId: $id });
  };

  const handleIncrement = async () => {
    if (quantity > 0) {
      const newQuantity = updatedQuantity + 1; // Calculate the new quantity
      setUpdatedQuantity(newQuantity); // Update state with new quantity
      await updateQuantity({ documentId: $id, quantity: newQuantity });
    } else {
      return updatedQuantity;
    }
  };
  const handleDecrement = async () => {
    if (updatedQuantity > 1) {
      const newQuantity = updatedQuantity - 1;
      setUpdatedQuantity(newQuantity);
      await updateQuantity({ documentId: $id, quantity: newQuantity });
    } else {
      return updatedQuantity;
    }
  };

  return (
    <div className='flex flex-col last-of-type:border-b-0 border-b border-dark border-opacity-15 pb-5 mb-5 max-sm:pb-8 last-of-type:pb-0 last-of-type:mb-0 gap-2'>
      <div className='h-28 flex max-[400px]:flex-col items-start justify-between select-none'>
        <div className='flex gap-x-4'>
          <img
            src={product.imageUrls[0]}
            alt={product.title}
            className='w-36 h-28 max-sm:w-24 rounded-md object-cover'
          />
          <div className='flex flex-col gap-y-2.5 w-full'>
            <p className='capitalize font-rubikMedium'>
              {truncate(product.title, 30)}
            </p>
            <span className='opacity-70 text-xs capitalize'>{size}</span>
            <div className='flex items-center border'>
              <div
                onClick={handleDecrement}
                className='h-full py-1.5 px-2 max-[300px]:px-1 w-full hover:bg-orange hover:bg-opacity-10 cursor-pointer'>
                <Minus size={16} />
              </div>
              <div className='text-center mx-1 max-w-8 max-sm:max-w-6 w-full flex items-center justify-center'>
                {isUpdating ? (
                  <Spinner size={13} colored='#E8572A' />
                ) : (
                  <span className='font-rubikMedium w-full'>
                    {updatedQuantity}
                  </span>
                )}
              </div>
              <div
                onClick={handleIncrement}
                className='h-full py-1.5 px-2 max-[300px]:px-1 w-full hover:bg-orange hover:bg-opacity-10 cursor-pointer'>
                <Plus size={16} />
              </div>
            </div>
          </div>
        </div>
        <div className='h-full max-[400px]:w-full flex flex-col items-end max-[400px]:flex-row max-[400px]:justify-between text-right'>
          <p className='font-rubikSemibold opacity-90 mb-auto max-sm:mb-0 max-sm:py-2'>
            ₦{formatNumberWithCommas(product.price)}
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
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <div className='flex max-sm:flex-col justify-end gap-3 w-full'>
                  <AlertDialogAction
                    onClick={() => isProductSaved(product.$id, user.id)}
                    className='bg-gray-200 hover:bg-gray-300 text-primary font-rubikMedium'>
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
