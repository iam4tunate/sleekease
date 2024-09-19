import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export default function ShopCta() {
  const navigate = useNavigate();
  return (
    <div className="relative bg-[url('/images/pattern.svg')] bg-cover bg-center py-10 bg-primary text-white rounded-xl">
      <div className='absolute top-0 bottom-0 w-full bg-black bg-opacity-85 rounded-xl' />
      <div className='padX relative flex max-md:flex-col gap-y-5 items-center max-md:items-start justify-between'>
        <div className='text-[33px] max-lg:text-3xl w-[60%] max-md:w-full font-rubikMedium select-none'>
          Unlock the Ultimate Fashion Experience with Exclusive Collections Just
          for You
        </div>
        <Button
          onClick={() => navigate('/shop')}
          size='lg'
          className='rounded-full py-4 hover:border-none bg-orange hover:bg-darkOrange font-rubikSemibold w-[20%] max-md:w-[40%] max-sm:w-full'>
          Shop All
        </Button>
      </div>
    </div>
  );
}
