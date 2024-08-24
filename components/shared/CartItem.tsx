import { Heart, Minus, Plus, Trash, Trash2 } from 'lucide-react';
import PRODUCT from '../assets/product.png';

export default function CartItem() {
  function formatProductName(name: string) {
    const formatedName = name.substring(0, 62);
    // if (name >= 62) {
    //   return name;
    // }
    return `${formatedName}...`;
  }
  return (
    <div className='flex flex-col last-of-type:border-b-0 border-b border-dark border-opacity-20 pb-8 mb-8 last-of-type:pb-0 last-of-type:mb-0'>
      <div className='flex items-start justify-between'>
        <div className='flex gap-x-4'>
          <img
            src='/images/shirt1_2.jpg'
            alt=''
            className='w-24 h-24 rounded-md object-cover'
          />
          <div className='flex flex-col gap-y-1.5'>
            <p className='text-sm font-poppinsMedium'>
              {formatProductName(`100% Cotton 4 Pcs Men's Fashion Short
                  Sleeve T-shirt`)}
            </p>
            <span className='text-sm opacity-70 font-poppinsSemibold'>2XL</span>
            <p className='hidden max-sm:flex font-poppinsSemibold py-0.5'>
              ₦11,677
            </p>
            <div className='w-fit flex items-center gap-x-4 border py-1.5 px-3 rounded-md'>
              <Minus size={16} />
              <span className='font-poppinsMedium'>1</span>
              <Plus size={16} />
            </div>
          </div>
        </div>
        <p className='max-sm:hidden font-poppinsSemibold text-base opacity-90 pl-3'>
          ₦11,677
        </p>
      </div>
      <div className='self-end flex items-center'>
        <div className='cursor-pointer text-sm opacity-80 font-poppinsMedium'>
          Move to Wishlist
        </div>
        <div className='bg-black bg-opacity-20 w-[2px] inline-block h-5 mx-4' />
        <Trash2 size={17} color='red' className='text-xl text-red' />
      </div>
    </div>
  );
}
