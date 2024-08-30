import Image from 'next/image';

export default function ProductCard() {
  return (
    <div className=''>
      <div className='h-[25rem] max-md:h-[30rem] max-sm:h-[25rem] relative cursor-pointer'>
        <Image
          fill
          loading='lazy'
          src='/images/jacket1_2.jpg'
          alt='shirt'
          className='object-cover w-full'
        />
      </div>
      <div className='pt-2 px-3 max-sm:px-2 flex items-center justify-between text-base'>
        <p className='w-[75%] truncate ... capitalize font-medium font-lora'>
          Twill Jacket Black
        </p>
        <p className='font-rubikMedium'>₦12,900</p>
      </div>
    </div>
  );
}
