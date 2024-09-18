import { useGetRecentProducts } from '@/lib/react-query/queries';
import ProductGrid from './ProductGrid';

export default function NewArrivals() {
  const { isPending: isLoading, data: products } = useGetRecentProducts();

  return (
    <div className='padY padX container'>
      <div className='heading'>New Arrivals</div>

      <ProductGrid
        isLoading={isLoading}
        maxLength={3}
        products={products?.documents ?? []}
      />
    </div>
  );
}
