import {
  Carousel,
  NewArrivals,
  ShopCta,
  TopSelling,
} from '@/components/shared';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function Home() {
  const { isAuthenticated } = useUserContext();
  return (
    <div className='padY'>
      <div className='container padX pb-6 max-sm:pb-3 pt-6'>
        <div className='font-lora text-[52px] max-md:text-5xl max-sm:text-4xl max-md:w-full w-[70%] max-lg:w-[80%] leading-[1.2]'>
          Elevating your <span className='text-orange inline'> style </span>
          so you can focus on creating to focus on making
          <div className='text-orange inline'> unforgettable </div>moments.
        </div>
      </div>

      <Carousel />

      <div className='padY padX container text-center tracking-tighter leading-none flex flex-col items-center uppercase'>
        <div className='text-[7vw] 2xl:text-8xl max-sm:text-4xl font-lora select-none'>
          Crafted to turn heads wherever you go.
        </div>
      </div>

      <NewArrivals />

      <div className="mt-8 max-md:mt-6 relative bg-[url('/images/homeBg.jpg')] bg-cover bg-center h-[40rem] max-md:h-[35rem] max-sm:h-[30rem]">
        <div className='z-10 absolute top-0 right-0 bottom-0 left-0 bg-black bg-opacity-60' />
        <div
          className={cn(
            'select-none sticky bottom-6 w-[90%] max-md:w-full mx-auto z-10 text-white text-center space-y-3 pt-5 pb-8 padX',
            isAuthenticated ? 'top-12' : 'top-24'
          )}>
          <h2 className='uppercase font-lora text-[6vw] 2xl:text-8xl max-lg:text-6xl max-sm:text-5xl max-[320px]:text-4xl leading-none opacity-80'>
            Effortless Style,
            <br /> Every Day.
          </h2>
          <p className='w-[40%] max-lg:w-[50%] max-sm:w-[80%] mx-auto leading-relaxed pt-1 pb-2 max-sm:text-[13px] opacity-90'>
            Discover the perfect wardrobe essentials that blend style and
            comfort for every occasion.
          </p>
          <Link to='/shop'>
            <Button
              size='lg'
              className='font-lora border bg-transparent rounded-full text-base max-sm:text-sm hover:bg-orange hover:border-none hover:text-dark font-medium'>
              Shop Now
            </Button>
          </Link>
        </div>
      </div>

      <div className='container padX'>
        <TopSelling />
      </div>

      <div className='container padX padY'>
        <ShopCta />
      </div>
    </div>
  );
}
