import { AccountStats } from '@/lib/constants';
import { Package2, UserCircle } from 'lucide-react';

export default function Page() {
  return (
    <div>
      <div className='border-b mb-6 px-4 max-sm:px-2 pb-2 text-base font-rubikSemibold'>
        Account Overview
      </div>
      <div className='grid grid-cols-2 max-lg:grid-cols-1 gap-6 px-4 max-sm:px-2'>
        <div className='border rounded-md'>
          <p className='border-b px-4 max-sm:px-2 py-4 pb-2 uppercase font-rubikMedium'>
            Account Details
          </p>
          <div className='px-4 max-sm:px-2 py-4'>
            <UserCircle size={35} />
            <p className='font-rubikMedium text-gray-600 capitalize pt-3 pb-1'>
              Joseph Ogodu
            </p>
            <p className='text-gray-600 lowercase'>fortunateogodu@gmail.com</p>
          </div>
        </div>
        <div className='border rounded-md'>
          <p className='border-b px-4 max-sm:px-2 py-4 pb-2 uppercase font-rubikMedium'>
            Shipping Address
          </p>
          <div className='px-4 space-y-2 py-4 max-sm:px-2'>
            <p className='text-gray-600 capitalize'>fortunate ogodu</p>
            <p className='text-gray-600'>
              38, opebi road, Adebola house, ikeja
            </p>
            <p className='text-gray-600'>Ikeja (ALLEN AVENUE), Lagos</p>
            <p className='text-gray-600'>091114109360</p>
          </div>
        </div>
      </div>
      <div className='pt-8'>
        <div className='border-b mb-6 px-4 max-sm:px-2 pb-2 text-base font-rubikSemibold'>
          Account Stats
        </div>
        <div className='padX grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-x-8 gap-y-6'>
          {AccountStats.map((stat) => (
            <div
              key={stat.name}
              className='border-l-2 border-orange-300 bg-white w-full max-sm:w-full rounded-md shadow-md flex flex-col items-start justify-between gap-x-6'>
              <p className='border-b px-4 max-sm:px-2 py-3 w-full uppercase font-rubikMedium'>
                {stat.name}
              </p>
              <div className='px-4 max-sm:px-2 py-4 flex items-center justify-between w-full'>
                <p className='font-rubikSemibold text-3xl max-sm:text-2xl'>
                  {stat.value}
                </p>
                <span className='bg-[#FEF8F5] rounded-full p-2'>
                  <stat.icon className='text-primary' size={25} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
