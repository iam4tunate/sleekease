import { Models } from 'appwrite';
import ProductCard from './ProductCard';

export default function ProductGrid({
  products,
  maxLength,
}: {
  products: Models.Document[];
  maxLength?: number;
  shuffle?: boolean;
}) {
  const displayedProducts = maxLength
    ? products?.slice(0, maxLength)
    : products;

  return (
    <div className='grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-x-4 gap-y-8'>
      {displayedProducts?.map((product: Models.Document) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
}
