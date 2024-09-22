import { CartItem, CartSummary, ShippingInfo } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetCurrentUser, useSaveOrder } from '@/lib/react-query/queries';
import { Models } from 'appwrite';

import PaystackPop from '@paystack/inline-js';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';

import { Button } from '@/components/ui/button';
import { CheckoutValidation } from '@/lib/validation';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Checkout() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [updatingShipping, setUpdatingShipping] = useState<boolean>(false);

  const { data: currentUser, isPending: isLoading } = useGetCurrentUser();
  const { mutateAsync: saveOrder } = useSaveOrder();

  const cart = currentUser?.cart;
  const shipping = currentUser?.shipping[0];

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const totalAmount = cart?.reduce((total: number, item: Models.Document) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const form = useForm<z.infer<typeof CheckoutValidation>>({
    resolver: zodResolver(CheckoutValidation),
    defaultValues: {
      noRefund: false,
    },
  });

  async function onSubmit(data: z.infer<typeof CheckoutValidation>) {
    if (data.noRefund) {
      setIsDialogOpen(true);
    }
  }

  // paystack operation - handling order operations after successful payment.
  function payWithPaystack(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsDialogOpen(false);

    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: publicKey,
      amount: totalAmount * 100,
      email: shipping.email,
      firstname: shipping.firstName,
      lastname: shipping.lastName,
      onSuccess: async () => {
        const productIds = cart.map((item: Models.Document) => item.$id);
        await saveOrder({
          shippingId: shipping.$id,
          productIds: productIds,
          userId: currentUser!.$id,
        });
        toast.success('Payment Successful');
        navigate('/customer/orders');
      },
      onClose: () => {
        toast.error(
          'We encountered an issue while attempting to upgrade your account. Please try again'
        );
      },
    });
  }

  return (
    <div className='padX container padY grid grid-cols-[60%_35%] max-lg:grid-cols-2 max-md:grid-cols-1 gap-y-12 gap-x-4 justify-between'>
      <div className='max-md:order-2'>
        <div className='heading pb-5'>Shipping Details</div>
        <div className='rounded-md border p-4'>
          <div
            onClick={() => setUpdatingShipping(!updatingShipping)}
            className='w-fit ml-auto'>
            {updatingShipping ? (
              <div className='border rounded-full px-3 py-1 cursor-pointer hover:bg-gray-400 hover:bg-opacity-20'>
                Cancel
              </div>
            ) : (
              <div className='border rounded-full px-3 py-1 cursor-pointer hover:bg-gray-400 hover:bg-opacity-20'>
                Update Details
              </div>
            )}
          </div>
          <ShippingInfo
            updating={updatingShipping}
            setUpdating={setUpdatingShipping}
          />
          {shipping && !updatingShipping && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-3 mt-10'>
                <FormField
                  control={form.control}
                  name='noRefund'
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex items-center gap-x-3'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className='leading-none'>
                          Accept our no-refund policy after 3 days of delivery.
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit' className='w-full rounded-full'>
                  Continue
                </Button>
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <AlertDialogContent className='max-sm:max-w-[95%] rounded'>
                    <AlertDialogHeader>
                      <AlertDialogDescription>
                        This transaction is in test mode, and no actual charges
                        will be made. You can complete the process without any
                        deductions from your account.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={payWithPaystack}>
                        Make Payment
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </form>
            </Form>
          )}
        </div>
      </div>
      <div className=''>
        <div className='heading pb-5'>Your Cart</div>
        <div className='flex flex-col gap-y-4 h-full'>
          <ScrollArea className='max-h-[20rem] h-full w-full rounded-md border p-4'>
            {isLoading
              ? Array.from({ length: 2 }, (_, index) => (
                  <div
                    key={index}
                    className='h-28 max-[400px]:h-full flex max-[400px]:flex-col items-start justify-between pb-5 mb-5 max-sm:pb-8 last-of-type:pb-0 last-of-type:mb-0'>
                    <div className='flex gap-x-4'>
                      <Skeleton className='w-36 h-28 max-sm:w-24 rounded-md' />
                      <div className='flex flex-col gap-y-2.5 w-full'>
                        <Skeleton className='h-5 w-26 rounded' />
                        <Skeleton className='h-4 w-16 rounded' />
                        <Skeleton className='h-8 w-20 rounded' />
                      </div>
                    </div>
                    <div className='h-full max-[400px]:w-full flex flex-col justify-between items-end max-[400px]:flex-row max-[400px]:justify-between text-right'>
                      <Skeleton className='h-5 w-24 max-sm:w-16 rounded' />
                      <Skeleton className='h-8 w-8 rounded-full' />
                    </div>
                  </div>
                ))
              : cart
                  ?.slice()
                  .reverse()
                  .map((cartItem: Models.Document) => (
                    <CartItem key={cartItem.$id} user={cartItem} />
                  ))}
          </ScrollArea>
          <div className=''>
            <CartSummary noBtn />
          </div>
        </div>
      </div>
    </div>
  );
}
