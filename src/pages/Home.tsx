import { Carousel, Newsletter, ProductGrid } from '@/components/shared';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='padY'>
      <div className='container padX pb-6 max-sm:pb-3 pt-6'>
        <div className='font-lora text-5xl max-md:text-4xl max-sm:text-3xl max-sm:w-full w-[80%] leading-[1.2]'>
          Simplifying your
          <span className='text-orange inline'> shopping </span>
          to focus on making
          <div className='text-orange inline'> memories </div>that matter.
        </div>
      </div>

      <Carousel />

      <div className='padY padX container text-center tracking-tighter leading-none flex flex-col items-center uppercase pb-8 max-sm:pb-4'>
        <div className='text-[8vw] max-sm:text-4xl font-lora'>
          Crafted to turn heads wherever you go.
        </div>
      </div>

      <div className='container padX padY'>
        <div className='heading'>New Arrivals</div>
        <ProductGrid />
      </div>

      <div className="relative bg-[url('/images/homeBg.jpg')] bg-cover bg-center h-[40rem] max-md:h-[35rem] max-sm:h-[30rem]">
        <div className='z-10 absolute top-0 right-0 bottom-0 left-0 bg-black bg-opacity-60' />
        <div className='sticky top-0 bottom-4 w-[90%] max-sm:w-full mx-auto z-10 text-white text-center space-y-3 py-10 padX'>
          <h2 className='uppercase font-lora text-[7vw] max-sm:text-5xl max-[320px]:text-4xl leading-none'>
            Effortless Style,
            <br /> Every Day.
          </h2>
          <p className='w-[40%] max-lg:w-[50%] max-sm:w-[70%] mx-auto leading-relaxed pt-1 pb-2 max-sm:text-[13px]'>
            Discover the perfect wardrobe essentials that blend style and
            comfort for every occasion.
          </p>
          <Button
            size='lg'
            className='font-lora border bg-transparent rounded-full text-base max-sm:text-sm hover:bg-white hover:text-dark font-medium'>
            Explore
          </Button>
        </div>
      </div>

      <div className='padY padX'>
        <div className='heading'>Top Selling</div>
        <ProductGrid />
      </div>

      <div className='container padX padY'>
        <Newsletter />
      </div>
    </div>
  );
}
