import { TopSelling } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className='container padX padY flex flex-col items-center justify-center'>
      <div className='text-center flex flex-col gap-y-5 justify-center items-center mb-8 max-w-xl'>
        <div className='font-lora font-medium text-4xl max-md:text-3xl capitalize'>
          Page Not found
        </div>
        <p className='text-base leading-[1.3]'>
          Oops! It looks like the page you're searching for doesn't exist. But
          don't worry, your next great outfit is just a click away. Browse our
          latest collections and discover something new!
        </p>
        <Button
          onClick={() => navigate('/shop')}
          className='rounded-full w-[10rem]'>
          Shop Now
        </Button>
      </div>
      <TopSelling />
    </div>
  );
}
