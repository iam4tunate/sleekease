import { ProductGrid, TopSelling } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { useGetProductByCategory } from '@/lib/react-query/queries';
import { useNavigate, useParams } from 'react-router-dom';

export default function Category() {
  const navigate = useNavigate();
  const { category } = useParams();
  const { data: products, isPending: isLoading } = useGetProductByCategory(
    category!
  );

  if (!isLoading && !products?.total)
    return (
      <div className='container padX padY flex flex-col items-center justify-center'>
        <div className='text-center flex flex-col gap-y-2.5 justify-center items-center mb-8 max-w-xl'>
          <div className='font-lora font-medium text-3xl max-md:text-2xl capitalize'>
            Oops! We couldn't find that Category.
          </div>
          <p className='text-base leading-[1.3] text-center'>
            The category you’re looking for doesn’t exist or may have been
            removed.
          </p>
          <Button
            onClick={() => navigate('/shop')}
            className='rounded-full w-[10rem]'>
            Return to Shop
          </Button>
        </div>
        <TopSelling />
      </div>
    );

  return (
    <div className='container padY padX'>
      <div className='heading'>{category} Collection</div>
      <ProductGrid isLoading={isLoading} products={products?.documents ?? []} />
    </div>
  );
}
