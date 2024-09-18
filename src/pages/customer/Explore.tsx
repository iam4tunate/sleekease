import { ProductGrid } from '@/components/shared';
import { useGetRecentProducts } from '@/lib/react-query/queries';

export default function Explore() {
  const { isPending: isLoading, data: products } = useGetRecentProducts();

  return (
    <div className='padY padX container'>
      <div className='heading'>Find Your Style in Our Collections</div>
      {/* TODO: after uploading alot of products pagination should be added */}
      <ProductGrid isLoading={isLoading} products={products?.documents ?? []} />
    </div>
  );
}
