import ProductCard from './ProductCard';

export default function ProductGrid() {
  return (
    <div className='grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-x-4 gap-y-6'>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}
