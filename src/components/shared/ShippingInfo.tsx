import { useGetCurrentUser } from '@/lib/react-query/queries';
import { ShippingForm, Spinner } from '.';

export default function ShippingInfo({
  updating,
  setUpdating,
}: {
  updating: boolean;
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data: currentUser, isPending: isLoading } = useGetCurrentUser();
  const shippingInfo = currentUser?.shipping[0];

  if (isLoading)
    return (
      <div className='h-[15rem] flex flex-col items-center justify-center'>
        <Spinner colored='black' size={40} />
        <p className='text-base max-sm:text-base  pt-3'>
          Fetching Shipping details, hang tight!
        </p>
      </div>
    );

  if (!isLoading && !shippingInfo) return <ShippingForm type='Add' />;

  if (!isLoading && updating)
    return (
      <ShippingForm
        type='Update'
        shippingInfo={shippingInfo}
        setUpdating={setUpdating}
      />
    );

  return (
    <div
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      }}
      className='capitalize grid gap-y-8 gap-x-12'>
      <div className='flex flex-col gap-y-1'>
        <span className='opacity-80'>Email Address</span>
        <span className='lowercase text-[15px]'>{shippingInfo.email}</span>
      </div>
      <div className='flex flex-col gap-y-1'>
        <span className='opacity-80'>Phone Number</span>
        <span className='text-[15px]'>{shippingInfo.phoneNumber}</span>
      </div>
      <div className='flex flex-col gap-y-1'>
        <span className='opacity-80'>First Name</span>
        <span className='text-[15px]'>{shippingInfo.firstName}</span>
      </div>
      <div className='flex flex-col gap-y-1'>
        <span className='opacity-80'>Last Name</span>
        <span className='text-[15px]'>{shippingInfo.lastName}</span>
      </div>
      <div className='flex flex-col gap-y-1'>
        <span className='opacity-80'>Street Address</span>
        <span className='text-[15px] lowercase'>
          {shippingInfo.streetAddress}
        </span>
      </div>
      <div className='flex flex-col gap-y-1'>
        <span className='opacity-80'>State</span>
        <span className='text-[15px]'>{shippingInfo.state}</span>
      </div>
      <div className='flex flex-col gap-y-1'>
        <span className='opacity-80'>LGA</span>
        <span className='text-[15px]'>{shippingInfo.lga}</span>
      </div>
      <div className='flex flex-col gap-y-1'>
        <span className='opacity-80'>Zip</span>
        <span className='text-[15px]'>{shippingInfo.zipCode}</span>
      </div>
    </div>
  );
}
