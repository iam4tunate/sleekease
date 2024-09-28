import {
  useAddToCart,
  useDeleteSaved,
  useGetCurrentUser,
} from '@/lib/react-query/queries';
import { formatNumberWithCommas, truncate } from '@/lib/utils';
import { Models } from 'appwrite';
import { Spinner } from '@/components/shared';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function Saved() {
  const [currentId, setCurrentId] = useState<string | null>(null);

  const { data: currentUser, isPending: isLoading } = useGetCurrentUser();
  const { mutateAsync: deleteItem, isPending: isDeleting } = useDeleteSaved();
  const { mutateAsync: addToCart, isPending: isAdding } = useAddToCart();

  const cartItems = currentUser?.cart;
  const wishlist = currentUser?.saved ?? [];

  const handleAddToCart = async (
    item: {
      productId: string;
      user: string;
      size: string;
      quantity: number;
      title: string;
      price: number;
      imageUrl: string;
    },
    documentId: string
  ) => {
    //checking for cart items with isDeleted:false
    console.log(item, documentId);
    const nonDeletedCartItems = cartItems.filter(
      (item: Models.Document) => !item.isDeleted
    );

    const existingItem = nonDeletedCartItems.find(
      (cartItem: Models.Document) => cartItem.productId === item.productId
    );

    if (existingItem) {
      toast.message('This piece is already in your cart.');
      return cartItems;
    } else {
      setCurrentId(documentId);
      await deleteItem({ documentId });
      await addToCart(item);
    }
  };

  return (
    <div>
      <div className='border-b mb-6 px-4 max-sm:px-2 pb-2 text-base font-rubikSemibold'>
        Your Wishlist
      </div>
      {isLoading ? (
        <div className='grid grid-cols-2 max-lg:grid-cols-1 max-sm:grid-cols-1 gap-x-6 gap-y-6 px-4 max-sm:px-2'>
          {Array.from({ length: 2 }, (_, index) => (
            <div
              key={index}
              className='min-h-28 border rounded-md py-2.5 pl-2 pr-4 flex max-[400px]:flex-col items-end justify-between gap-y-1.5'>
              <div className='flex gap-x-4 w-full'>
                <Skeleton className='w-32 h-28 max-[400px]:h-28' />
                <div className='flex flex-col gap-y-2.5'>
                  <Skeleton className='h-6 w-[5rem] max-lg:w-[8rem] max-sm:w[4rem]' />
                  <Skeleton className='h-6 w-16' />
                </div>
              </div>
              <div className='h-full max-[400px]:w-full flex flex-col justify-end items-end max-[400px]:flex-row text-right gap-y-2 gap-x-2'>
                <Skeleton className='h-8 w-20 max-sm:w-14' />
                <Skeleton className='h-8 w-24 max-sm:w-16' />
              </div>
            </div>
          ))}
        </div>
      ) : !isLoading && !wishlist.length ? (
        <div className='flex flex-col items-center justify-center text-center py-8'>
          <img
            src='/images/wishlist.png'
            alt=''
            className='w-[5rem] max-sm:w-[4rem]'
          />
          <p className='padX w-[60%] max-sm:w-[90%] pt-3 text-base max-sm:text-sm leading-[1.3]'>
            Your wishlist is currently empty. Browse our collection and add your
            favorite products to your wishlist!
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-2 max-lg:grid-cols-1 max-sm:grid-cols-1 gap-x-6 gap-y-6 px-4 max-sm:px-2'>
          {wishlist
            .slice()
            .reverse()
            .map((item: Models.Document) => (
              <>
                <div
                  key={item.$id}
                  className='min-h-28 border rounded-md py-2.5 pl-2 pr-4 flex max-[500px]:flex-col items-end max-sm:items-start justify-between gap-y-3'>
                  <div className='flex gap-x-4 w-full'>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className='h-28 rounded-sm'
                    />
                    <div className='flex flex-col gap-y-2.5 max-sm:gap-1.5 w-full pt-0.5'>
                      <p className='capitalize font-rubikMedium whitespace-nowrap max-[400px]:whitespace-normal'>
                        {truncate(item.title, 30)}
                      </p>
                      <p className='opacity-70 text-xs capitalize'>
                        {item.size}
                      </p>
                      <p className='font-rubikSemibold opacity-90'>
                        ₦{formatNumberWithCommas(item.price)}
                      </p>
                    </div>
                  </div>
                  <div className='justify-end flex flex-wrap gap-x-4 gap-y-2 w-auto'>
                    <Link
                      to={`/shop/${item.productId}`}
                      className='bg-gray-200 rounded px-4 py-2 cursor-pointer'>
                      See Details
                    </Link>
                    {isDeleting || (isAdding && currentId === item.$id) ? (
                      <Spinner size={20} colored='#E8572A' />
                    ) : (
                      <div
                        onClick={() =>
                          handleAddToCart(
                            {
                              user: currentUser!.$id,
                              productId: item?.productId,
                              title: item?.title,
                              price: item?.price,
                              size: item?.size,
                              quantity: 1,
                              imageUrl: item.imageUrl,
                            },
                            item?.$id
                          )
                        }
                        className='text-white bg-primary rounded px-4 py-2 cursor-pointer'>
                        {isDeleting ? (
                          <Spinner size={13} colored='#E8572A' />
                        ) : (
                          <span>Add to Cart</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <Separator className='last:hidden lg:hidden' />
              </>
            ))}
        </div>
      )}
    </div>
  );
}
