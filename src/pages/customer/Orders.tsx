import { useGetCurrentUser } from '@/lib/react-query/queries';
import { formatDate, formatNumberWithCommas, truncate } from '@/lib/utils';
import { Models } from 'appwrite';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

export default function Orders() {
  const { data: currentUser, isPending: isLoading } = useGetCurrentUser();
  const orders = currentUser?.orders;

  return (
    <div>
      <div className='border-b mb-6 px-4 max-sm:px-2 pb-2 text-base font-rubikSemibold'>
        Your Orders
      </div>
      {isLoading ? (
        <div className='grid grid-cols-1 gap-x-6 gap-y-8 px-4 max-sm:px-2'>
          {Array.from({ length: 2 }, (_, index) => (
            <div
              key={index}
              className='border p-2 rounded-md flex max-[450px]:flex-col gap-x-2 gap-y-4 items-start justify-between'>
              <div className='flex flex-col gap-y-2.5'>
                <Skeleton className='h-5 w-[12rem]' />
                <Skeleton className='h-5 w-[12rem]' />
                <Skeleton className='h-5 w-[12rem]' />
                <Skeleton className='h-5 w-[12rem]' />
              </div>
              <Skeleton className='h-7 w-24 rounded-full' />
            </div>
          ))}
        </div>
      ) : !isLoading && !orders?.length ? (
        <div className='flex flex-col items-center justify-center text-center py-8'>
          <img
            src='/images/no-package.png'
            alt=''
            className='w-[5rem] max-sm:w-[4rem]'
          />
          <div className='padX w-[60%] max-lg:w-[80%] max-sm:w-[90%] pt-3 text-base max-sm:text-sm leading-[1.3]'>
            <p className='pb-1'>You haven't placed any orders yet!</p>
            <p className=''>
              Explore our latest collection and find something you love. Your
              purchases will appear here once you place an order.
            </p>
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-x-6 gap-y-8 px-4 max-sm:px-2'>
          {orders
            ?.slice()
            .reverse()
            .map((order: Models.Document) => (
              <div
                key={order.$id}
                className='border p-2 rounded-md flex max-[450px]:flex-col gap-x-2 gap-y-4 items-start justify-between'>
                <div className='flex flex-col gap-y-2'>
                  <p className=''>
                    <span className='opacity-80 text-[13px] pr-2'>
                      Order ID:
                    </span>
                    {order.$id}
                  </p>
                  <p className=''>
                    <span className='opacity-80 text-[13px] pr-2'>
                      Delivery status:
                    </span>
                    {order.status === false ? (
                      <span className='text-orange'>Pending</span>
                    ) : (
                      <span className='text-green-500'>Delivered</span>
                    )}
                  </p>
                  <p className=''>
                    <span className='opacity-80 text-[13px] pr-2'>
                      Placed on:
                    </span>
                    {formatDate(order.$createdAt)}
                  </p>
                  <p className='text-[13px] opacity-95'>
                    <span className='opacity-80 pr-2 block pb-0.5'>
                      Estimated delivery:
                    </span>
                    7 to 12 business days after payment
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className=' cursor-pointer border rounded-full py-2 px-4 text-[13px] hover:bg-orange hover:bg-opacity-5'>
                      Show details
                    </div>
                  </DialogTrigger>
                  <DialogContent className='max-sm:max-w-[95%] py-8 max-h-[90vh] overflow-auto space-y-6 remove-scrollbar rounded-md max-sm:px-3'>
                    <div className=''>
                      <div className='text-base pb-3 font-rubikMedium'>
                        Items Purchased ({order?.cart.length})
                      </div>
                      {order?.cart.map((cart: Models.Document) => (
                        <div className='border px-3 py-2 max-h-28 max-[400px]:h-full flex max-[400px]:flex-col gap-x-4 items-start justify-between select-none mb-4 last-of-type:mb-0'>
                          <div className='flex gap-x-4'>
                            <img
                              src={cart?.imageUrl}
                              alt={cart?.title}
                              className='w-24 h-24 max-sm:w-24 rounded-md object-cover'
                            />
                            <div className='flex flex-col justify-start gap-y-1.5 w-full'>
                              <p className='capitalize'>
                                {truncate(cart.title, 30)}
                              </p>
                              <p className='opacity-70 text-xs capitalize'>
                                {cart?.size}
                              </p>
                              <p>
                                <span className='opacity-80 pr-2'>
                                  Quantity:
                                </span>
                                {cart?.quantity}
                              </p>
                              <p className='min-[400px]:hidden font-rubikMedium opacity-90 mt-auto'>
                                ₦{formatNumberWithCommas(cart.price)}
                              </p>
                            </div>
                          </div>
                          <p className='max-[400px]:hidden font-rubikMedium opacity-90 mb-auto  max-sm:py-2'>
                            ₦{formatNumberWithCommas(cart.price)}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className='text-base pb-3 font-rubikMedium'>
                        Shipping Details
                      </div>
                      <div
                        style={{
                          gridTemplateColumns:
                            'repeat(auto-fit, minmax(200px, 1fr))',
                        }}
                        className='capitalize grid gap-y-8 gap-x-12'>
                        <div className='flex flex-col gap-y-1'>
                          <span className='opacity-80 text-[13px]'>
                            Email Address
                          </span>
                          <span className='lowercase '>
                            {order?.shipping.email}
                          </span>
                        </div>
                        <div className='flex flex-col gap-y-1'>
                          <span className='opacity-80 text-[13px]'>
                            Phone Number
                          </span>
                          <span className=''>
                            {order?.shipping.phoneNumber}
                          </span>
                        </div>
                        <div className='flex flex-col gap-y-1'>
                          <span className='opacity-80 text-[13px]'>
                            First Name
                          </span>
                          <span className=''>{order?.shipping.firstName}</span>
                        </div>
                        <div className='flex flex-col gap-y-1'>
                          <span className='opacity-80 text-[13px]'>
                            Last Name
                          </span>
                          <span className=''>{order?.shipping.lastName}</span>
                        </div>
                        <div className='flex flex-col gap-y-1'>
                          <span className='opacity-80 text-[13px]'>
                            Street Address
                          </span>
                          <span className=' lowercase'>
                            {order?.shipping.streetAddress}
                          </span>
                        </div>
                        <div className='flex flex-col gap-y-1'>
                          <span className='opacity-80 text-[13px]'>State</span>
                          <span className=''>{order?.shipping.state}</span>
                        </div>
                        <div className='flex flex-col gap-y-1'>
                          <span className='opacity-80 text-[13px]'>LGA</span>
                          <span className=''>{order?.shipping.lga}</span>
                        </div>
                        <div className='flex flex-col gap-y-1'>
                          <span className='opacity-80 text-[13px]'>Zip</span>
                          <span className=''>{order?.shipping.zipCode}</span>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
