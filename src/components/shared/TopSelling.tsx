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
    <div className='padY padX container'>
      <div className='heading'>Our Top Selling {randomCategory}</div>

      {isLoading ? (
        <div>please wait</div>
      ) : (
        <ProductGrid maxLength={3} products={products?.documents ?? []} />
      )}
    </div>
  );
}
