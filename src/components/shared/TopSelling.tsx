import { useGetProductByCategory } from '@/lib/react-query/queries';
import ProductGrid from './ProductGrid';
import { useEffect, useState } from 'react';

const categories = [
  't-shirts',
  'pants',
  'shirts',
  'caps',
  'jackets',
  'sweatshirts',
];

export default function TopSelling() {
  const [randomCategory, setRandomCategory] = useState<string | null>(null);
  const { data: products, isPending: isLoading } = useGetProductByCategory(
    randomCategory!
  );

  useEffect(() => {
    // Function to get a random category
    const getRandomCategory = () => {
      const randomIndex = Math.floor(Math.random() * categories.length);
      return categories[randomIndex];
    };

    // Set the random category whenever the component is refreshed
    setRandomCategory(getRandomCategory());
  }, []);

  return (
    <div className='padY'>
      <div className='font-lora font-medium text-3xl max-sm:text-2xl pb-6 max-md:pb-4 capitalize'>Our Top Selling {randomCategory}</div>

      <ProductGrid
        isLoading={isLoading}
        maxLength={3}
        products={products?.documents ?? []}
      />
    </div>
  );
}
