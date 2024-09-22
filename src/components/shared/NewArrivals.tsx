import { useGetRecentProducts } from '@/lib/react-query/queries';
import ProductGrid from './ProductGrid';

export default function NewArrivals() {
  const { isPending: isLoading, data: products } = useGetRecentProducts();

  return (
    <div className='padY padX container'>
      <div className='font-lora font-medium text-3xl max-sm:text-2xl pb-6 max-md:pb-4 capitalize'>New Arrivals</div>

      <ProductGrid
        isLoading={isLoading}
        maxLength={3}
        products={products?.documents ?? []}
      />
    </div>
  );
}
