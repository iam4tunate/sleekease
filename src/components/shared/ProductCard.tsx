import { addToRecentlyViewed } from '@/lib/appwrite/api';
import { formatNumberWithCommas } from '@/lib/utils';
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }: { product: Models.Document }) {
  const { $id, title, price, imageUrls } = product;
  
  const viewedProduct = { id: $id, title, price, image: imageUrls[0] };

  return (
    <div className='h-full'>
      <Link
        to={`/product/${$id}`}
        onClick={() => addToRecentlyViewed(viewedProduct)}>
        <img
          loading='lazy'
          src={imageUrls[0]}
          alt='shirt'
          className='w-full h-auto cursor-pointer object-cover'
        />
      </Link>
      <div className='pt-2 px-3 max-sm:px-2 flex items-center justify-between text-base'>
        <p className='w-[75%] truncate ... capitalize font-medium font-lora'>
          {title}
        </p>
        <p className='font-rubikMedium'>₦{formatNumberWithCommas(price)}</p>
      </div>
    </div>
  );
}
