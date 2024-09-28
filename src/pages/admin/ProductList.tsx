import {
  useDeleteProduct,
  useGetRecentProducts,
} from '@/lib/react-query/queries';
import { EllipsisVertical, Eye, List, PencilLine, Trash2 } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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
import { Link, useNavigate } from 'react-router-dom';
import { formatNumberWithCommas } from '@/lib/utils';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductList() {
  const navigate = useNavigate();
  const [popoverOpen, setPopoverOpen] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { isPending: isLoading, data: products } = useGetRecentProducts();
  const { mutateAsync: deleteProduct, isSuccess } = useDeleteProduct();

  const handleDelete = async (productId: string, imageIds: string[]) => {
    await deleteProduct({ productId, imageIds });
    if (isSuccess) navigate('/admin/list');
  };

  // Function to toggle the popover state for each product
  const togglePopover = (productId: string) => {
    setPopoverOpen((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  return (
    <div className='py-2 px-6 max-sm:px-2'>
      <div className='pb-6 max-sm:pb-4 flex items-center gap-x-1.5'>
        <List className='w-6 h-6' />
        <div className='text-xl font-rubikMedium max-sm:text-xl'>
          Product List
        </div>
      </div>
      {isLoading ? (
        <div className='grid grid-cols-3 max-lg:grid-cols-2 gap-x-2.5 gap-y-6'>
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton
              key={index}
              className='w-full h-[20rem] max-sm:h-[13rem] max-md:h-[20rem] max-lg:h-[15rem] max-xl:h-[17rem]'
            />
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-3 max-lg:grid-cols-2 gap-x-2.5 gap-y-6'>
          {/* TODO: ADD PAGINATION  */}
          {products?.documents.map((product) => (
            <div className='relative rounded-sm'>
              <Popover
                open={popoverOpen[product.$id] || false}
                onOpenChange={() => togglePopover(product.$id)}>
                <PopoverTrigger className='absolute top-2 right-2 bg-black bg-opacity-60 rounded-full p-1'>
                  <EllipsisVertical color='#ffffff' size={15} />
                </PopoverTrigger>
                <PopoverContent className='max-w-[10rem]'>
                  <div className='space-y-3.5'>
                    <Link
                      to={`/admin/update/${product.$id}`}
                      className='flex items-center gap-2 cursor-pointer'>
                      <PencilLine size={17} />
                      <span>Edit</span>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <span className='flex items-center gap-2 text-destructive cursor-pointer'>
                          <Trash2 size={17} />
                          <span>Delete</span>
                        </span>
                      </AlertDialogTrigger>
                      <AlertDialogContent className='max-sm:max-w-[95%] rounded'>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete this product from the database.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              handleDelete(product?.$id, product.imageIds);
                              togglePopover(product.$id);
                            }}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Link
                      to={`/shop/${product.$id}`}
                      className='flex items-center gap-2 cursor-pointer'>
                      <Eye size={17} />
                      <span>View Details</span>
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
              <img
                src={product.imageUrls[0]}
                alt=''
                className='h-full w-full object-cover object-top rounded-sm'
              />
              <div className='rounded-b-sm p-2 absolute bottom-0 bg-black bg-opacity-70 w-full text-white space-y-0.5'>
                <p className='capitalize'>{product.title}</p>
                <p className='text-xs'>
                  {formatNumberWithCommas(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
