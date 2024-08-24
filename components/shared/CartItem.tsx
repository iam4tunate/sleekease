import { Heart, Minus, Plus, Trash2 } from 'lucide-react';

export default function CartItem() {
  return (
    <div className='flex flex-col last-of-type:border-b-0 border-b border-dark border-opacity-20 pb-5 mb-5 last-of-type:pb-0 last-of-type:mb-0 gap-2'>
      <div className='flex items-start justify-between'>
        <div className='flex gap-x-4'>
          <img
            src='/images/shirt1_2.jpg'
            alt=''
            className='w-24 h-24 rounded-md object-cover'
          />
          <div className='flex flex-col gap-y-1.5'>
            <p className='text-sm capitalize font-poppinsMedium'>
              Masters Polo
            </p>
            <span className='text-sm opacity-70 font-'>2XL</span>
            <p className='hidden max-sm:flex font-poppinsSemibold opacity-90 py-0.5'>
              12,000 Naira
            </p>
            <div className='w-fit flex items-center gap-x-4 border py-1.5 px-3 rounded-md'>
              <Minus size={16} />
              <span className='font-poppinsMedium'>1</span>
              <Plus size={16} />
            </div>
          </div>
        </div>
        <p className='max-sm:hidden font-poppinsSemibold opacity-90 pl-3'>
          12,000 Naira
        </p>
      </div>
      <div className='self-end flex items-center'>
        <Heart size={20} className='text-primary text-xl' />
        <div className='bg-black bg-opacity-20 w-[2px] inline-block h-5 mx-4' />
        <Trash2 size={20} color='red' className='text-xl text-red' />
      </div>
    </div>
  );
}
