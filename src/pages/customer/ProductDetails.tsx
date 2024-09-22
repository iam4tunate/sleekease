import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useUserContext } from '@/context/AuthContext';
import { cn, formatNumberWithCommas } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import {
  useAddToCart,
  useGetCurrentUser,
  useGetProductById,
} from '@/lib/react-query/queries';
import { useNavigate, useParams } from 'react-router-dom';
import { CartValidation } from '@/lib/validation';
import { Spinner, SubmitButton, TopSelling } from '@/components/shared';
import { toast } from 'sonner';
import { useCartContext } from '@/context/CartContext';
import { Models } from 'appwrite';
import { Button } from '@/components/ui/button';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCartContext();
  const { isAuthenticated, userLoading, user } = useUserContext();
  const { data: product, isPending: isLoading } = useGetProductById(id || '');
  const { mutateAsync: addToCart, isPending: isAdding } = useAddToCart();
  const { data: currentUser } = useGetCurrentUser();
  const cartItems = currentUser?.cart;

  console.log(product);

  const form = useForm<z.infer<typeof CartValidation>>({
    resolver: zodResolver(CartValidation),
  });

  async function onSubmit(data: z.infer<typeof CartValidation>) {
    if (isAuthenticated) {
      const existingItem = cartItems.find(
        (item: Models.Document) => item.product.$id === product!.$id
      );

      if (existingItem) {
        toast.message('This piece is already in your cart.');
        return cartItems;
      } else {
        // store items in appwrite
        await addToCart({
          productId: product!.$id,
          userId: user!.id,
          size: data.type,
          quantity: 1,
          title: product?.title,
          price: product?.price,
          imageUrls: product?.imageUrls,
        });
      }
    } else {
      // store items in local storage
      const cartItem = {
        $id: product!.$id,
        title: product?.title,
        price: product?.price,
        quantity: 1,
        size: data.type,
        imageUrls: product?.imageUrls,
      };
      dispatch({ type: 'ADD_ITEM', payload: cartItem });
    }
  }

  if (isLoading)
    return (
      <div className='min-h-[70vh] flex flex-col items-center justify-center'>
        <Spinner colored='black' size={40} />
        <p className='text-base max-sm:text-sm pt-3'>
          Fetching item details, please hold on!
        </p>
      </div>
    );

  if (!isLoading && !product)
    return (
      <div className='container padX padY flex flex-col items-center justify-center'>
        <div className='text-center flex flex-col gap-y-2.5 justify-center items-center mb-8 max-w-xl'>
          <div className='font-lora font-medium text-3xl max-md:text-2xl capitalize'>
            Oops! We couldn't find that Item.
          </div>
          <p className='text-base leading-[1.3] text-center'>
            The item you’re looking for doesn’t exist or may have been removed.
          </p>
          <Button
            onClick={() => navigate('/shop')}
            className='rounded-full w-[10rem]'>
            Return to Shop
          </Button>
        </div>
        <TopSelling />
      </div>
    );

  return (
    <div className='container padX relative'>
      <div className='grid grid-cols-[66%_30%] max-lg:grid-cols-[60%_40%] justify-between max-md:grid-cols-1 gap-x-6 gap-y-7'>
        <div className='grid grid-cols-2 max-lg:grid-cols-1 gap-x-0.5 gap-y-1'>
          {product?.imageUrls.map((url: string) => (
            <img
              key={url}
              src={url}
              alt=''
              className='h-full object-top w-full object-cover'
            />
          ))}
        </div>
        <div
          className={cn(
            'pb-10 pt-8 max-lg:pt-6 max-w-[30%] max-lg:max-w-[35%] max-md:max-w-full w-full md:fixed right-8 max-md:right-6 max-sm:right-4 2xl:right-[5%] overflow-y-auto remove-scrollbar bottom-0',
            isAuthenticated && !userLoading ? 'top-[56px]' : 'top-[104px]'
          )}>
          <div className='font-rubikMedium text-[23px] capitalize'>
            {product?.title}
          </div>
          <p className='text-xl pt-1 pb-5'>
            {formatNumberWithCommas(product?.price)} Naira
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel className='font-rubikMedium'>
                      Available sizes:
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='flex flex-wrap gap-y-6 gap-x-2 pt-2 pb-2'>
                        {product?.sizes.map((size: string) => (
                          <FormItem key={size}>
                            <FormControl>
                              <RadioGroupItem
                                value={size}
                                className='hidden peer'
                              />
                            </FormControl>
                            <FormLabel className='bg-gray-100 text-[15px] py-2 px-6 rounded-full cursor-pointer peer-aria-checked:text-white peer-aria-checked:bg-primary'>
                              {size}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton
                text='Add to Cart'
                isLoading={isAdding}
                className='rounded-full w-full mt-8'
              />
            </form>
          </Form>
          <div className='mt-8 py-3 border rounded-md'>
            <div className='font-rubikMedium px-2'>Product Info</div>
            <Separator className='my-2' />
            <p className='px-2 text-[15px] leading-[1.3] pt-2 pb-4'>
              {product?.description}
            </p>
            <div className='px-2 text-[15px] leading-[1.3] capitalize'>
              {product?.features}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
