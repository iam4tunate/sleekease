import { ProductForm } from '@/components/shared';
import { PackagePlus } from 'lucide-react';

export default function CreateProduct() {
  return (
    <div className='py-2 padX'>
      <div className='pb-6 max-sm:pb-4 flex items-center gap-x-1.5'>
        <PackagePlus className='w-6 h-6' />
        <div className='text-xl font-rubikMedium max-sm:text-xl'>
          Create New Item
        </div>
      </div>
      <ProductForm action='Create' />
    </div>
  );
}
