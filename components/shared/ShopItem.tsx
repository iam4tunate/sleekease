import { truncate } from '@/lib/utils';
import { Heart, Minus, Plus, Trash2 } from 'lucide-react';

export default function ShopItem() {
  return (
    <div className='flex flex-col last-of-type:border-b-0 border-b border-dark border-opacity-10 pb-5 mb-5 last-of-type:pb-0 last-of-type:mb-0 gap-2'>
      <div className='h-28 flex max-[400px]:flex-col items-start justify-between'>
        <div className='flex gap-x-4'>
          <img
            src='/images/shirt1_2.jpg'
            alt=''
            className='w-36 h-28 rounded-md object-cover'
          />
          <div className='flex flex-col gap-y-2 w-full'>
            <p className='capitalize font-poppinsMedium'>
              {truncate('Masters Polo', 30)}
            </p>
            <span className='opacity-70'>2XL</span>
            <div className='w-fit flex items-center gap-x-4 border py-1.5 px-3 rounded-md'>
              <Minus size={16} />
              <span className='font-poppinsMedium'>1</span>
              <Plus size={16} />
            </div>
          </div>
        </div>
        <div className='h-full max-[400px]:w-full flex flex-col max-[400px]:flex-row max-[400px]:justify-between'>
          <p className='font-poppinsSemibold opacity-90 mb-auto'>₦12,000</p>
          <div className='flex items-center'>
            <Heart size={20} className='text-primary text-xl' />
            <div className='bg-black bg-opacity-20 w-[2px] inline-block h-5 mx-4' />
            <Trash2 size={20} color='red' className='text-xl text-red' />
          </div>
        </div>
      </div>
    </div>
  );
}
