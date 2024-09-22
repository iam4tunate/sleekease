import { useUserContext } from '@/context/AuthContext';
import { useGetCurrentUser, useLogoutUser } from '@/lib/react-query/queries';
import {
  ArrowLeftRight,
  Heart,
  History,
  Package2,
  UserCircle,
} from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Overview() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutateAsync: logout, isSuccess } = useLogoutUser();
  const { data: currentUser } = useGetCurrentUser();
  const viewedItems = JSON.parse(
    localStorage.getItem('recentlyViewed') || '[]'
  );

  const saved = currentUser?.saved;
  const orders = currentUser?.orders;
  const shipping = currentUser?.shipping[0];

  const handleLogout = async () => {
    await logout(user.id);
  };

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [navigate, isSuccess]);

  return (
    <div>
      <div className='border-b mb-6 px-4 max-sm:px-2 pb-2 flex items-center justify-between flex-wrap gap-x-4'>
        <p className='text-base font-rubikSemibold'>Account Overview</p>
        <div
          onClick={handleLogout}
          className='md:hidden bg-orange bg-opacity-10 text-orange py-2 px-4 rounded-md cursor-pointer'>
          Logout
        </div>
      </div>
      <div className='grid grid-cols-2 max-lg:grid-cols-1 gap-6 px-4 max-sm:px-2'>
        <div className='border rounded-md'>
          <p className='font-rubikMedium border-b px-4 max-sm:px-2 py-4 pb-2'>
            Account Details
          </p>
          <div className='px-4 max-sm:px-2 py-4'>
            <UserCircle size={35} />
            <p className='font-rubikMedium text-gray-600 capitalize pt-3 pb-1'>
              {user.firstName} {user.lastName}
            </p>
            <p className='text-gray-600 lowercase'>{user.email}</p>
          </div>
        </div>
        <div className='border rounded-md'>
          <p className='font-rubikMedium border-b px-4 max-sm:px-2 py-4 pb-2'>
            Shipping Address
          </p>
          <div className='px-4 space-y-3 py-4 max-sm:px-2'>
            <p className='text-gray-600 capitalize'>
              {shipping?.firstName} {shipping?.lastName}
            </p>
            <p className='text-gray-600'>{shipping?.streetAddress}</p>
            <p className='text-gray-600'>
              {shipping?.lga}, {shipping?.state}
            </p>
            <p className='text-gray-600'>{shipping?.phoneNumber}</p>
            <p className='text-gray-600'>Zip code: {shipping?.zipCode}</p>
          </div>
        </div>
      </div>
      <div className='pt-8'>
        <div className='border-b mb-6 px-4 max-sm:px-2 pb-2 text-base font-rubikSemibold'>
          Account Stats
        </div>
        <div className='padX grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-x-8 gap-y-6'>
          <div className='border-l-2 border-orange-300 bg-white w-full max-sm:w-full rounded-md shadow-md flex flex-col items-start justify-between gap-x-6'>
            <p className='border-b px-4 max-sm:px-2 py-3 w-full uppercase'>
              Wishlist
            </p>
            <div className='px-4 max-sm:px-2 py-4 flex items-center justify-between w-full'>
              <p className='text-3xl max-sm:text-2xl'>{saved?.length}</p>
              <span className='bg-[#FEF8F5] rounded-full p-2'>
                <Heart className='text-orange' size={25} />
              </span>
            </div>
          </div>
          <div className='border-l-2 border-orange-300 bg-white w-full max-sm:w-full rounded-md shadow-md flex flex-col items-start justify-between gap-x-6'>
            <p className='border-b px-4 max-sm:px-2 py-3 w-full uppercase'>
              Orders
            </p>
            <div className='px-4 max-sm:px-2 py-4 flex items-center justify-between w-full'>
              <p className='text-3xl max-sm:text-2xl'>{orders?.length}</p>
              <span className='bg-[#FEF8F5] rounded-full p-2'>
                <Package2 className='text-orange' size={25} />
              </span>
            </div>
          </div>
          <div className='border-l-2 border-orange-300 bg-white w-full max-sm:w-full rounded-md shadow-md flex flex-col items-start justify-between gap-x-6'>
            <p className='border-b px-4 max-sm:px-2 py-3 w-full uppercase'>
              Recently viewed
            </p>
            <div className='px-4 max-sm:px-2 py-4 flex items-center justify-between w-full'>
              <p className='text-3xl max-sm:text-2xl'>{viewedItems?.length}</p>
              <span className='bg-[#FEF8F5] rounded-full p-2'>
                <History className='text-orange' size={25} />
              </span>
            </div>
          </div>
          <div className='border-l-2 border-orange-300 bg-white w-full max-sm:w-full rounded-md shadow-md flex flex-col items-start justify-between gap-x-6'>
            <p className='border-b px-4 max-sm:px-2 py-3 w-full uppercase'>
              successful transactions
            </p>
            <div className='px-4 max-sm:px-2 py-4 flex items-center justify-between w-full'>
              <p className='text-3xl max-sm:text-2xl'>{orders?.length}</p>
              <span className='bg-[#FEF8F5] rounded-full p-2'>
                <ArrowLeftRight className='text-orange' size={25} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
