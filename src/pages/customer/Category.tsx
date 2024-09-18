import { ProductGrid, ShopCta } from '@/components/shared';
import { useGetProductByCategory } from '@/lib/react-query/queries';
import { useParams } from 'react-router-dom';

export default function Category() {
  const { category } = useParams();
  const { data: products, isPending: isLoading } = useGetProductByCategory(
    category!
  );

  return (
    <div className='container padY padX'>
      <div className='heading'>{category} Collection</div>

      <ProductGrid isLoading={isLoading} products={products?.documents ?? []} />
      <div className='pt-16 pb-8'>
        <ShopCta />
      </div>
    </div>
  );
}
