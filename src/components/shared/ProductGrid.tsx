import { Models } from 'appwrite';
import ProductCard from './ProductCard';
import { Skeleton } from '../ui/skeleton';

export default function ProductGrid({
  products,
  maxLength,
  isLoading,
}: {
  products: Models.Document[];
  maxLength?: number;
  isLoading: boolean;
}) {
  const displayedProducts = maxLength
    ? products?.slice(0, maxLength)
    : products;

  if (isLoading) {
    return (
      <div className='grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-x-4 gap-y-8'>
        {Array.from({ length: maxLength || 6 }, (_, index) => (
          <div key={index} className='flex flex-col space-y-3'>
            <Skeleton className='h-[22rem] max-sm:h-[25rem] w-full' />
            <div className='flex items-center justify-between'>
              <Skeleton className='h-5 w-[70%] max-md:w-[60%]' />
              <Skeleton className='h-5 w-[20%]' />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-x-4 gap-y-8'>
      {displayedProducts?.map((product: Models.Document) => (
        <ProductCard key={product.$id} product={product} />
      ))}
    </div>
  );
}
