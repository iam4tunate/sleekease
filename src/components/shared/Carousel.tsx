import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css/navigation';
import 'swiper/css';
import { HomeCarousel } from '@/lib/constants';

export default function Carousel() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setInit] = useState<boolean>(false);
  const [isBegin, setIsBegin] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className='relative w-full px-0'>
      <div className=''>
        <div
          ref={prevRef}
          className={`${
            isBegin && 'invisible'
          } z-10 p-1.5 rounded-full shadow bg-darkOrange opacity-60 absolute top-1/2 left-12 max-lg:left-8 max-sm:left-4 -translate-y-1/2`}>
          <ChevronLeft color='white' size={30} />
        </div>
        <div
          ref={nextRef}
          className={`${
            isEnd && 'invisible'
          } z-10 p-1.5 rounded-full shadow bg-darkOrange opacity-60 absolute top-1/2 right-12 max-lg:right-8 max-sm:right-4 -translate-y-1/2`}>
          <ChevronRight color='white' size={30} />
        </div>
      </div>
      <Swiper
        slidesPerView={1}
        onSlideChange={(swiper) => {
          setIsBegin(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay]}
        onInit={() => setInit(true)}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className='h-[35rem] max-sm:h-[30rem]'>
        {HomeCarousel.map((slider, index) => (
          <SwiperSlide key={index}>
            <img src={slider} alt='' className='h-full w-full object-cover' />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
