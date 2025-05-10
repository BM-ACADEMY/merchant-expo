import { useState } from 'react';
import ProductCard from './ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css';


const allProducts = [
  { id: 1, name: "Wireless Headphones", price: 8299, unit: "piece", image: "https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg" },
  { id: 2, name: "Smart Watch", price: 12499, unit: "piece", image: "https://images.pexels.com/photos/437038/pexels-photo-437038.jpeg" },
  { id: 3, name: "Bluetooth Speaker", price: 6699, unit: "piece", image: "https://images.pexels.com/photos/374087/pexels-photo-374087.jpeg" },
  { id: 4, name: "Laptop Stand", price: 2499, unit: "piece", image: "https://images.pexels.com/photos/434346/pexels-photo-434346.jpeg" },
  { id: 5, name: "Gaming Mouse", price: 1799, unit: "piece", image: "https://images.pexels.com/photos/4792731/pexels-photo-4792731.jpeg" },
  { id: 6, name: "Mechanical Keyboard", price: 5399, unit: "piece", image: "https://images.pexels.com/photos/5699475/pexels-photo-5699475.jpeg" },
  { id: 7, name: "HD Webcam", price: 3999, unit: "piece", image: "https://images.pexels.com/photos/8985195/pexels-photo-8985195.jpeg" },
  { id: 8, name: "Portable Monitor", price: 11499, unit: "piece", image: "https://images.pexels.com/photos/7054218/pexels-photo-7054218.jpeg" },
  { id: 9, name: "USB-C Hub", price: 2499, unit: "piece", image: "https://images.pexels.com/photos/1309407/pexels-photo-1309407.jpeg" },
  { id: 10, name: "Ergonomic Chair", price: 15499, unit: "piece", image: "https://images.pexels.com/photos/7578239/pexels-photo-7578239.jpeg" },
  { id: 11, name: "Wireless Charger", price: 2999, unit: "piece", image: "https://images.pexels.com/photos/8454513/pexels-photo-8454513.jpeg" },
  { id: 12, name: "VR Headset", price: 22999, unit: "piece", image: "https://images.pexels.com/photos/7854136/pexels-photo-7854136.jpeg" },
  { id: 13, name: "Desk Lamp", price: 1299, unit: "piece", image: "https://images.pexels.com/photos/3771831/pexels-photo-3771831.jpeg" },
  { id: 14, name: "Noise Cancelling Mic", price: 3199, unit: "piece", image: "https://images.pexels.com/photos/4200747/pexels-photo-4200747.jpeg" },
  { id: 15, name: "Smartphone Gimbal", price: 8799, unit: "piece", image: "https://images.pexels.com/photos/7166937/pexels-photo-7166937.jpeg" },
];

function PopularProducts() {
  const [swiper, setSwiper] = useState(null); // Manage the Swiper instance

  const handleNext = () => {
    if (swiper) swiper.slideNext();
  };

  const handlePrev = () => {
    if (swiper) swiper.slidePrev();
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
        Our Popular Products
      </h2>

      {/* Swiper container */}
      <div className="relative">
        <Swiper
          onSwiper={setSwiper} // Get the swiper instance
          spaceBetween={20} // Space between slides
          slidesPerView={4} // Number of slides visible at once
          loop={true} // Infinite loop
          centeredSlides={true} // Centering the current slide
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {allProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Next and Previous Buttons */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
          <button
            onClick={handlePrev}
            className="bg-gray-900 text-white p-2 rounded-full shadow-lg"
          >
            &#10094; {/* Left arrow */}
          </button>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
          <button
            onClick={handleNext}
            className="bg-gray-900 text-white p-2 rounded-full shadow-lg"
          >
            &#10095; {/* Right arrow */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopularProducts;
