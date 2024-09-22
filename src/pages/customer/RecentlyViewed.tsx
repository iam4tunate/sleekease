import { IRecenltyViewed } from '@/lib/types';
import { formatNumberWithCommas } from '@/lib/utils';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RecentlyViewed() {
  const viewedItems = JSON.parse(
    localStorage.getItem('recentlyViewed') || '[]'
  );

  return (
    <div>
      <div className='border-b mb-6 px-4 pb-2 text-base font-rubikSemibold'>
        Recently viewed
      </div>
      {!viewedItems || !viewedItems.length ? (
        <div className='flex flex-col items-center justify-center text-center py-8'>
          <img
            src='/images/eye.png'
            alt=''
            className='w-[5rem] max-sm:w-[4rem]'
          />
          <p className='padX w-[60%] max-sm:w-[90%] pt-3 text-base max-sm:text-sm leading-[1.3]'>
            You haven't viewed any item recently. Start exploring our collection
            to see your recent views here!
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-6 px-4 max-sm:px-2'>
          {viewedItems.map((item: IRecenltyViewed) => (
            <div className='flex items-start gap-x-2 border rounded-md py-2.5 pl-2 pr-4'>
              <img src={item.image} alt='' className='h-24 rounded-sm' />
              <div className='flex flex-col justify-between w-full h-full'>
                <p className='capitalize font-rubikMedium'>{item.title}</p>
                <div className='flex items-center justify-between'>
                  <p className='font-rubikMedium opacity-90'>
                    ₦{formatNumberWithCommas(item.price)}
                  </p>
                  <Link to={`/shop/${item.id}`}>
                    <Eye size={15} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
