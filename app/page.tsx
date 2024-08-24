import Image from 'next/image';
import { Carousel, ProductGrid } from '@/components/shared';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='padY'>
      <div className='container padX pb-6 max-sm:pb-3 pt-6'>
        <div className='font-lora text-5xl max-md:text-4xl max-sm:text-3xl max-sm:w-full w-[80%] leading-[1.2]'>
          Simplifying your
          <span className='text-primary inline'> shopping </span>
          to focus on making
          <div className='text-primary inline'> memories </div>that matter.
        </div>
      </div>
      <Carousel />

      <div className='padY padX container'>
        <div className='text-center tracking-tighter leading-none flex flex-col items-center uppercase pb-8 max-sm:pb-4'>
          <div className='text-[8vw] max-sm:text-4xl font-lora'>
            Crafted to turn heads wherever you go.
          </div>
        </div>

        <ProductGrid />
      </div>

      <div className='relative flex-1 h-[45rem] max-md:h-[40rem] max-sm:h-[35rem]'>
        <div className='z-10 absolute top-0 right-0 bottom-0 left-0 bg-black bg-opacity-60' />
        <Image
          fill
          src='/images/homeBg.jpg'
          alt='clothes'
          className='flex-1 object-cover'
        />
        <div className='sticky top-0 bottom-4 w-[90%] max-sm:w-full mx-auto z-10 text-white text-center space-y-3 pt-12 pb-12 padX'>
          <h2 className='uppercase font-lora text-[8vw] max-sm:text-5xl max-[320px]:text-4xl leading-none'>
            Effortless Style,
            <br /> Every Day.
          </h2>
          <p className='w-[90%] max-sm:w-full mx-auto max-sm:text-sm leading-relaxed pt-2 pb-3'>
            Discover the perfect wardrobe essentials that blend style and
            comfort for every occasion. Whether it&apos;s a laid-back weekend or
            a night out, find the outfits that make you feel effortlessly
            fashionable. Explore our curated collection and elevate your
            everyday look with ease.
          </p>
          <Button size='lg' className='font-lora'>Shop All</Button>
        </div>
      </div>

      <div className='padX padY'>
        <div className='font-lora text-2xl max-sm:text-xl pb-4'>
          New Arrivals
        </div>
        <ProductGrid />
      </div>
    </div>
  );
}
