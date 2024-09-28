import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css/navigation';
import 'swiper/css';

export default function GalleryThumb({ images }: { images: string[] }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setInit] = useState<boolean>(false);
  const [isBegin, setIsBegin] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className='relative w-full px-0 lg:hidden'>
      <div className=''>
        <div
          ref={prevRef}
          className={`${
            isBegin && 'invisible'
          } z-10 p-1.5 rounded-full shadow bg-orange opacity-60 absolute top-1/2 left-12 max-lg:left-4 max-sm:left-2 -translate-y-1/2`}>
          <ChevronLeft color='white' size={25} />
        </div>
        <div
          ref={nextRef}
          className={`${
            isEnd && 'invisible'
          } z-10 p-1.5 rounded-full shadow bg-orange opacity-60 absolute top-1/2 right-12 max-lg:right-4 max-sm:right-2 -translate-y-1/2`}>
          <ChevronRight color='white' size={25} />
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
        className='h-[35rem] max-sm:h-[30rem]'>
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt='product image'
              className='h-full w-full object-cover'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
