import Image from 'next/image';

export default function ProductCard() {
  return (
    <div className=''>
      <div className='h-[25rem] max-lg:h-[30rem] relative group bg-gray-200 cursor-pointer group'>
        <Image
          fill
          loading='lazy'
          src='/images/jacket1_2.jpg'
          alt='shirt'
          className='group-hover:hidden object-cover w-full'
        />
        <Image
          fill
          loading='lazy'
          src='/images/jacket2_2.jpg'
          alt='shirt'
          className='hidden group-hover:block object-cover w-full'
        />
      </div>
      <div className='pl-2 pt-2'>
        <p className='capitalize font-lora font-medium text-lg'>
          Marathon Tee
        </p>
        <p className='font-lora font-semibold text-sm'>4,900 Naira</p>
      </div>
    </div>
  );
}
