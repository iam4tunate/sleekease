import { Button } from '@/components/ui/button';
import { ShoppingBag, Trash2 } from 'lucide-react';

export default function Page() {
  return (
    <div>
      <div className='border-b mb-6 px-4 pb-2 text-base font-rubikSemibold'>
        Recently viewed
      </div>
      <div className='grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-6'>
        <div className='flex items-start gap-x-2 border rounded-md py-2.5 pl-2 pr-4'>
          <img src='/images/shirt1_1.jpg' alt='' className='h-24 rounded-sm' />
          <div className='flex flex-col justify-between w-full h-full'>
            <p className='capitalize font-rubikMedium'>Twill Jacket Black</p>
            <p className='font-rubikMedium opacity-90'>12,900</p>
          </div>
        </div>
        <div className='flex items-start gap-x-2 border rounded-md py-2.5 pl-2 pr-4'>
          <img src='/images/shirt1_1.jpg' alt='' className='h-24 rounded-sm' />
          <div className='flex flex-col justify-between w-full h-full'>
            <p className='capitalize font-rubikMedium'>Twill Jacket Black</p>
            <p className='font-rubikMedium opacity-90'>12,900</p>
          </div>
        </div>
        <div className='flex items-start gap-x-2 border rounded-md py-2.5 pl-2 pr-4'>
          <img src='/images/shirt1_1.jpg' alt='' className='h-24 rounded-sm' />
          <div className='flex flex-col justify-between w-full h-full'>
            <p className='capitalize font-rubikMedium'>Twill Jacket Black</p>
            <p className='font-rubikMedium opacity-90'>12,900</p>
          </div>
        </div>
        <div className='flex items-start gap-x-2 border rounded-md py-2.5 pl-2 pr-4'>
          <img src='/images/shirt1_1.jpg' alt='' className='h-24 rounded-sm' />
          <div className='flex flex-col justify-between w-full h-full'>
            <p className='capitalize font-rubikMedium'>Twill Jacket Black</p>
            <p className='font-rubikMedium opacity-90'>12,900</p>
          </div>
        </div>
        <div className='flex items-start gap-x-2 border rounded-md py-2.5 pl-2 pr-4'>
          <img src='/images/shirt1_1.jpg' alt='' className='h-24 rounded-sm' />
          <div className='flex flex-col justify-between w-full h-full'>
            <p className='capitalize font-rubikMedium'>Twill Jacket Black</p>
            <p className='font-rubikMedium opacity-90'>12,900</p>
          </div>
        </div>
      </div>
    </div>
  );
}
