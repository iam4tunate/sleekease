import {
  useDeleteFromCart,
  useGetCurrentUser,
  useSaveProduct,
  useUpdateQuatity,
} from '@/lib/react-query/queries';
import { formatNumberWithCommas, truncate } from '@/lib/utils';
import { Models } from 'appwrite';
import { Eye, Minus, Plus, X } from 'lucide-react';
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
import { useNavigate } from 'react-router-dom';
import { Separator } from '../ui/separator';

export default function CartItem({
  appwriteCartItem,
  localCartItem,
  toggleSheet,
}: {
  appwriteCartItem?: Models.Document;
  localCartItem?: ICartItem;
  toggleSheet?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const { dispatch } = useCartContext();

  const { data: currentUser } = useGetCurrentUser();
  const savedProducts = currentUser?.saved ?? [];

  const { mutateAsync: deleteItem, isPending: isDeleting } =
    useDeleteFromCart();
  const { mutateAsync: saveItem } = useSaveProduct();
  const { mutateAsync: updateQuantity, isPending: isUpdating } =
    useUpdateQuatity();

  const AddToWishlist = async () => {
    if (currentUser) {
      const exists = savedProducts.some(
        (save: Models.Document) =>
          save?.produuctId === appwriteCartItem!.produuctId
      );

      const savedItem = {
        user: currentUser.$id,
        productId: appwriteCartItem!.productId,
        title: appwriteCartItem?.title,
        price: appwriteCartItem?.price,
        size: appwriteCartItem?.size,
        imageUrl: appwriteCartItem?.imageUrl,
      };
      if (exists) {
        toast.message('This piece is already in your wishlist.');
      } else {
        await deleteItem(appwriteCartItem!.$id);
        await saveItem(savedItem);
      }
    } else {
      toast.message(
        'Only logged-in users can add to their wishlist. kindly log in to continue.'
      );
    }
  };

  const handleDelete = async () => {
    if (currentUser) {
      await deleteItem(appwriteCartItem!.$id);
    } else {
      dispatch({ type: 'REMOVE_ITEM', payload: localCartItem!.productId });
      toast.success('Item removed from your cart.');
    }
  };

  const handleIncrement = async () => {
    if (currentUser) {
      const newQuantity = appwriteCartItem?.quantity + 1;
      await updateQuantity({
        documentId: appwriteCartItem!.$id,
        quantity: newQuantity,
      });
    } else {
      dispatch({
        type: 'INCREASE_QUANTITY',
        payload: localCartItem!.productId,
      });
    }
  };

  const handleDecrement = async () => {
    if (currentUser) {
      if (appwriteCartItem?.quantity > 1) {
        const newQuantity = appwriteCartItem?.quantity - 1;
        await updateQuantity({
          documentId: appwriteCartItem!.$id,
          quantity: newQuantity,
        });
      } else {
        return appwriteCartItem?.quantity;
      }
    } else {
      if (localCartItem!.quantity > 1) {
        dispatch({
          type: 'DECREASE_QUANTITY',
          payload: localCartItem!.productId,
        });
      } else {
        return localCartItem?.quantity;
      }
    }
  };

  return (
    <>
      <div className='h-28 max-[400px]:h-full flex max-[400px]:flex-col gap-x-4 items-start justify-between select-none'>
        <div className='flex gap-x-4'>
          <img
            src={appwriteCartItem?.imageUrl ?? localCartItem?.imageUrl}
            alt={appwriteCartItem?.title ?? localCartItem?.title}
            className='w-28 h-28 max-sm:w-24 rounded-md object-cover'
          />
          <div className='flex flex-col justify-between w-full'>
            <p className='capitalize font-rubikMedium pb-1.5'>
              {truncate(appwriteCartItem?.title ?? localCartItem?.title, 30)}
            </p>
            <span className='opacity-70 text-xs capitalize mb-auto'>
              {appwriteCartItem?.size ?? localCartItem?.size}
            </span>
            <div className='flex items-center border w-fit rounded-full'>
              <div
                onClick={handleDecrement}
                className='h-full py-1.5 px-2 max-[300px]:px-1  hover:bg-orange hover:bg-opacity-10 cursor-pointer rounded-l-full'>
                <Minus size={16} />
              </div>
              <div className='h-full text-center mx-1 w-6 max-sm:max-w-6 flex items-center justify-center'>
                {isUpdating ? (
                  <Spinner size={13} colored='#E8572A' />
                ) : (
                  <span className='font-rubikMedium w-full'>
                    {appwriteCartItem?.quantity ?? localCartItem?.quantity}
                  </span>
                )}
              </div>
              <div
                onClick={handleIncrement}
                className='h-full py-1.5 px-2 max-[300px]:px-1 hover:bg-orange hover:bg-opacity-10 cursor-pointer rounded-r-full'>
                <Plus size={16} />
              </div>
            </div>
          </div>
        </div>
        <div className='h-full max-[400px]:w-full flex flex-col max-[400px]:flex-row-reverse justify-between text-right max-[400px]:items-center max-[400px]:pt-2'>
          <p className='font-rubikSemibold opacity-90'>
            ₦
            {formatNumberWithCommas(
              appwriteCartItem
                ? appwriteCartItem?.price * appwriteCartItem?.quantity
                : localCartItem!.price * localCartItem!.quantity
            )}
          </p>
          <div className='mt-auto flex items-center gap-x-4'>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className='hover:bg-orange hover:bg-opacity-25 p-1.5 cursor-pointer border rounded-full'>
                  <Eye size={15} />
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className='max-sm:max-w-[95%] rounded'>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    What would you like to do?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Would you like to view the item details or make changes? If
                    you choose to make changes, the item will be removed from
                    your cart, and you can re-add it.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='w-full flex justify-between max-sm:justify-start'>
                  <AlertDialogCancel className='bg-gray-200 hover:bg-gray-300'>
                    Cancel
                  </AlertDialogCancel>
                  <div className='flex max-sm:flex-col justify-end gap-3 w-full'>
                    <AlertDialogAction
                      className='bg-orange text-white hover:bg-darkOrange'
                      onClick={() => {
                        navigate(
                          `/shop/${
                            appwriteCartItem?.productId ??
                            localCartItem?.productId
                          }`
                        );
                        toggleSheet!(false);
                      }}>
                      View Details
                    </AlertDialogAction>
                    <AlertDialogAction
                      onClick={() => {
                        handleDelete();
                        navigate(
                          `/shop/${
                            appwriteCartItem?.productId ??
                            localCartItem?.productId
                          }`
                        );
                        toggleSheet!(false);
                      }}>
                      Make Changes
                    </AlertDialogAction>
                  </div>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className='hover:bg-orange hover:bg-opacity-25 p-1.5 cursor-pointer border rounded-full'>
                  {isDeleting ? (
                    <Spinner size={20} colored='#E8572A' />
                  ) : (
                    <X size={16} />
                  )}
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className='max-sm:max-w-[95%] rounded'>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to remove this item from your cart?
                    You can save it for later before removing it.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='w-full flex justify-between max-sm:justify-start'>
                  <AlertDialogCancel className='bg-gray-200 hover:bg-gray-300'>
                    Cancel
                  </AlertDialogCancel>
                  <div className='flex max-sm:flex-col justify-end gap-3 w-full'>
                    <AlertDialogAction
                      onClick={AddToWishlist}
                      className='bg-orange text-white hover:bg-darkOrange'>
                      Add to Wishlist
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
      <Separator className='my-5 last-of-type:hidden' />
    </>
  );
}
