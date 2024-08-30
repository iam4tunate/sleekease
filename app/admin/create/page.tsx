import ShopForm from '@/components/shared/ShopForm';
import { CirclePlus } from 'lucide-react';

export default function Page() {
  return (
    <div className='max-w-screen-md mx-auto padY padX'>
      <div className='w-[70%] max-sm:w-full pb-4 flex items-center gap-x-1.5 text-primary'>
        <CirclePlus className='w-6 h-66' />
        <div className='text-xl font-geist600 max-sm:text-xl'>
          Create New Home.
        </div>
      </div>
      {/* <ShopForm action='Create' /> */}
    </div>
  );
}
