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
      <div className='heading'>{id}</div>
      <ProductGrid />
    </div>
  );
}
