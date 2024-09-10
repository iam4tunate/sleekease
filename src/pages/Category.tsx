import { ProductGrid } from '@/components/shared';
import { useParams } from 'react-router-dom';

export default function Category() {
  const { id } = useParams();

  return (
    <div className='padY padX'>
      <div className='heading'>{id}</div>
      <ProductGrid />
    </div>
  );
}
