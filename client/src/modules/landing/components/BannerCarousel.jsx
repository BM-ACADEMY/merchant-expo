
import { useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import '../css/Swiper-style.css'



const BannerCarousel = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const images = [
    'https://img.freepik.com/free-vector/online-shopping-banner-template_23-2148764706.jpg?t=st=1746523316~exp=1746526916~hmac=38b2521e92493917e9c8401e943a43c769c882973aa9cc3d4580c85e21d892c5&w=1380',
    'https://img.freepik.com/free-vector/online-shopping-banner-template_23-2148764706.jpg?t=st=1746523316~exp=1746526916~hmac=38b2521e92493917e9c8401e943a43c769c882973aa9cc3d4580c85e21d892c5&w=1380',
    'https://img.freepik.com/free-vector/online-shopping-banner-template_23-2148764706.jpg?t=st=1746523316~exp=1746526916~hmac=38b2521e92493917e9c8401e943a43c769c882973aa9cc3d4580c85e21d892c5&w=1380',
  ];

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div className="h-full w-full relative overflow-hidden">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet" data-index="${index}"></span>`;
          }
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="h-full rounded-md w-full"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i} className="w-full">
            <img
              src={src}
              alt={`Slide ${i + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
          </SwiperSlide>
        ))}
        <div className="autoplay-progress absolute bottom-3 right-3 z-10" slot="container-end">
          <svg viewBox="0 0 48 48" className="text-red-500" ref={progressCircle}>
            <circle
              cx="24"
              cy="24"
              r="20"
              className="!stroke-red-500"  // Set stroke color to red
              strokeWidth="4"  // Optional: Set the stroke width
              fill="none"  // Make sure the circle has no fill
            />
          </svg>
          <span ref={progressContent} className="text-red-500 text-xs absolute inset-0 flex items-center justify-center"></span>
        </div>


        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev-custom">
          <svg viewBox="0 0 24 24" className="arrow-icon">
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
          </svg>
          <span className="ripple"></span>
        </div>
        <div className="swiper-button-next-custom">
          <svg viewBox="0 0 24 24" className="arrow-icon">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
          </svg>
          <span className="ripple"></span>
        </div>
      </Swiper>
    </div>
  );
};

export default BannerCarousel;