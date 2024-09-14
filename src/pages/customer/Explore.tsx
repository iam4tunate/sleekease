import { ProductGrid } from '@/components/shared';
import { useGetRecentProducts } from '@/lib/react-query/queries';

export default function Explore() {
  const { isPending: isLoading, data: products } = useGetRecentProducts();

  return (
    <div className='padY padX'>
      <div className='heading'>Find Your Style in Our Collections</div>
      {/* TODO: after uploading alot of products pagination should be added */}
      {isLoading ? (
        <div>please wait</div>
      ) : (
        <ProductGrid products={products?.documents ?? []} />
      )}
    </div>
  );
}
