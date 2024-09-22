import { ProductGrid } from '@/components/shared';
import { useGetRecentProducts } from '@/lib/react-query/queries';

export default function Shop() {
  const { isPending: isLoading, data: products } = useGetRecentProducts();
  
  return (
    <div className='padY padX container'>
      <div className='font-lora font-medium text-3xl max-sm:text-2xl pb-6 max-md:pb-4 capitalize'>
        Find Your Style in Our Collections
      </div>
      {/* TODO: after uploading alot of products pagination should be added */}
      <ProductGrid isLoading={isLoading} products={products?.documents ?? []} />
    </div>
  );
}
