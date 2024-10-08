import { ProductForm, Spinner } from '@/components/shared';
import { useGetProductById } from '@/lib/react-query/queries';
import { PencilOff } from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function UpdateProduct() {
  const { id } = useParams();
  const { data: product, isPending } = useGetProductById(id || '');

  return (
    <div className='py-6 padX'>
      <div className='pb-4 flex items-center gap-x-1.5'>
        <PencilOff className='w-6 h-6' />
        <div className='text-xl font-rubikMedium max-sm:text-xl'>
          Update Item
        </div>
      </div>
      {isPending ? (
        <div className='pt-6 flex items-center gap-x-3 text-base'>
          <Spinner size={25} colored='#E8572A' />
          <span>Loading details. please wait!</span>
        </div>
      ) : (
        <ProductForm action='Update' product={product} />
      )}
    </div>
  );
}
