export default function Page() {
  return (
    <div>
      <div className='border-b mb-6 px-4 max-sm:px-2 pb-2 text-base font-rubikSemibold'>
        Your Orders
      </div>
      <div className='grid grid-cols-1 gap-x-6 gap-y-8 px-4 max-sm:px-2'>
        <div className='flex items-start gap-x-2 border rounded-md max-[450px]:pl-2 pr-2'>
          <img
            src='/images/shirt1_1.jpg'
            alt=''
            className='h-28 max-[450px]:hidden rounded-sm'
          />
          <div className='flex flex-col justify-between w-full h-full py-2'>
            <div className='flex max-[450px]:flex-col gap-2 items-start justify-between'>
              <div className='space-y-1 max-[450px]:space-y-2'>
                <p className='capitalize font-rubikMedium'>
                  Twill Jacket Black
                </p>
                <p className=''>Order 123456789</p>
                <div className='text-[11px] font-rubikMedium bg-primary px-1 py-0.5 w-fit text-white rounded-sm'>
                  Pending
                </div>
                <p>
                  Delivery date: <span>1st September</span>
                </p>
              </div>
              <p className='font-rubikMedium text-primary opacity-90'>
                See Details
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
