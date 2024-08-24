import { ProductGrid } from '@/components/shared';

export default function Page() {
  return (
    <div className='padY padX'>
      <div className='pb-6 max-md:pb-4'>
        <div className='font-lora  text-4xl max-sm:text-3xl'>
          T-shirts
        </div>
      </div>
      <ProductGrid />
    </div>
  );
}
