import { Button } from '@/components/ui/button';
import { ShoppingBag, Trash2 } from 'lucide-react';

export default function Saved() {
  return (
    <div>
      <div className='border-b mb-6 px-4 max-sm:px-2 pb-2 text-base font-rubikSemibold'>
        Saved Items
      </div>
      <div className='grid grid-cols-2 max-lg:grid-cols-1 max-sm:grid-cols-1 gap-x-6 gap-y-8 px-4 max-sm:px-2'>
        <div className='flex items-start gap-x-2 border rounded-md pr-2'>
          <img
            src='/images/jacket1_2.jpg'
            alt=''
            className='h-28 max-[400px]:h-32 rounded-sm'
          />
          <div className='flex flex-col justify-between w-full h-full py-2'>
            <div className='flex max-[400px]:flex-col max-[400px]:items-start gap-y-2 items-center justify-between'>
              <p className='capitalize font-rubikMedium'>Twill Jacket Black</p>
              <p className='font-rubikMedium opacity-90'>12,900</p>
            </div>
            <div className='space-x-4 text-xs self-end flex items-center'>
              <Button size='sm' className='text-xs font-rubikMedium gap-x-1'>
                <ShoppingBag size={15} />
                <span className='max-[400px]:hidden'>Add to Cart</span>
              </Button>
              <Button
                size='sm'
                variant='destructive'
                className='text-xs font-rubikMedium gap-x-1'>
                <Trash2 size={15} />
                <span className='max-[400px]:hidden'>Delete</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
