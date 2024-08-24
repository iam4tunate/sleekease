'use client';
import { ProductGrid } from '@/components/shared';

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  const { id } = params;
  return (
    <div className='padY padX'>
      <div className='pb-6 max-md:pb-4'>
        <div className='font-lora  text-4xl max-sm:text-3xl capitalize'>
          {id}
        </div>
      </div>
      <ProductGrid />
    </div>
  );
}
