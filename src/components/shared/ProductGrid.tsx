import ProductCard from './ProductCard';

export default function ProductGrid() {
  return (
    <div className='grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-x-4 gap-y-8'>
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}
