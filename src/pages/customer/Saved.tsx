import { useDeleteSaved, useGetCurrentUser } from '@/lib/react-query/queries';
import { formatNumberWithCommas, truncate } from '@/lib/utils';
import { Models } from 'appwrite';
import { Trash2 } from 'lucide-react';
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
import { Spinner } from '@/components/shared';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function Saved() {
  const [currentId, setCurrentId] = useState<string | null>(null);

  const { data: currentUser, isPending: isLoading } = useGetCurrentUser();
  const { mutateAsync: deleteItem, isPending: isDeleting } = useDeleteSaved();

  const savedProducts = currentUser?.saved ?? [];

  const handleDelete = async (documentId: string) => {
    setCurrentId(documentId); // Set the current deleting item
    await deleteItem({ documentId });
  };

  return (
    <div>
      <div className='border-b mb-6 px-4 max-sm:px-2 pb-2 text-base font-rubikSemibold'>
        Your Wishlist
      </div>
      {isLoading ? (
        <div className='grid grid-cols-2 max-lg:grid-cols-1 max-sm:grid-cols-1 gap-x-6 gap-y-6 px-4 max-sm:px-2'>
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className='min-h-28 border rounded-md py-2.5 pl-2 pr-4 flex max-[400px]:flex-col items-end justify-between gap-y-1.5'>
              <div className='flex gap-x-4 w-full'>
                <Skeleton className='w-32 h-28 max-[400px]:h-28 rounded-sm' />
                <div className='flex flex-col gap-y-2.5'>
                  <Skeleton className='h-6 w-[5rem] max-lg:w-[8rem] max-sm:w[4rem] rounded' />
                  <Skeleton className='h-6 w-16 rounded' />
                </div>
              </div>
              <div className='h-full max-[400px]:w-full flex flex-col justify-end items-end max-[400px]:flex-row text-right gap-y-2 gap-x-2'>
                <Skeleton className='h-8 w-20 max-sm:w-14 rounded' />
                <Skeleton className='h-8 w-24 max-sm:w-16 rounded' />
              </div>
            </div>
          ))}
        </div>
      ) : !isLoading && !savedProducts.length ? (
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
          {savedProducts
            .slice()
            .reverse()
            .map((saved: Models.Document) => (
              <>
                <div
                  key={saved.product.$id}
                  className='min-h-28 border rounded-md py-2.5 pl-2 pr-4 flex max-[400px]:flex-col items-end justify-between gap-y-1.5'>
                  <div className='flex gap-x-4 w-full'>
                    <img
                      src={saved.product.imageUrls[0]}
                      alt={saved.product.title}
                      className='h-28 max-[400px]:h-24 rounded-sm'
                    />
                    <div className='flex flex-col gap-y-2.5 max-sm:gap-1.5 w-full pt-0.5'>
                      <p className='capitalize font-rubikMedium whitespace-nowrap max-[400px]:whitespace-normal'>
                        {truncate(saved.product.title, 30)}
                      </p>
                      <p className='font-rubikSemibold opacity-90'>
                        ₦{formatNumberWithCommas(saved.product.price)}
                      </p>
                    </div>
                  </div>
                  <div className='justify-end text-xs flex flex-wrap gap-x-4 gap-y-2 w-auto'>
                    <div className='flex items-center gap-x-2 bg-gray-200 rounded px-2 py-2 cursor-pointer h-fit'>
                      <Link
                        to={`/product/${saved.product.$id}`}
                        className='font-rubikMedium'>
                        See Details
                      </Link>
                    </div>
                    <AlertDialog>
                      {isDeleting && currentId === saved.$id ? (
                        <Spinner size={20} colored='#E8572A' />
                      ) : (
                        <AlertDialogTrigger asChild>
                          <div className='flex items-center gap-x-2 text-orange bg-orange bg-opacity-25 rounded px-2 py-2 cursor-pointer h-fit'>
                            <Trash2 size={17} />{' '}
                            <span className='font-rubikMedium'>Remove</span>
                          </div>
                        </AlertDialogTrigger>
                      )}
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove this item from your
                            saved list.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(saved.$id)}>
                            Remove
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
