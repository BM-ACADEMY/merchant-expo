import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/pagination';

const TestimonialCard = ({ animate }) => {
  const { quote, author, title } = animate;
  return (
    <motion.div
      key={animate.index}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Card className="flex-1 min-w-[300px] max-w-[400px] p-6 h-full">
        <CardContent className="p-0">
          <Quote className="w-8 h-8 text-[#e03733] mb-4" />
          <p className="text-gray-700 text-base mb-4">{quote}</p>
          <div>
            <h4 className="text-[#e03733] font-semibold">{author}</h4>
            <p className="text-gray-500 text-sm">{title}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a making it look like readable English.",
      author: "Kenneth Fong",
      title: "Postgraduate Student",
    },
    {
      quote: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a making it look like readable English.",
      author: "Kenneth Fong",
      title: "Postgraduate Student",
    },
    {
      quote: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a making it look like readable English.",
      author: "Kenneth Fong",
      title: "Postgraduate Student",
    },
    {
      quote: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a making it look like readable English.",
      author: "Kenneth Fong",
      title: "Postgraduate Student",
    },
  ];

  return (
    <div className="flex flex-col  bg-white p-10">
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
        Client Testimonials
      </h2>
      <style>
        {`
          .swiper-container-custom {
            position: relative;
            padding-bottom: 40px; /* Space for pagination */
          }
          .swiper-pagination {
            position: absolute;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
            padding: 10px;
    
            border-radius: 50px;
            width: fit-content;
            margin-left: auto;
            margin-right: auto;
          }
          .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background: white;
            opacity: 1;
            border: 2px solid #f6d32f;
            border-radius: 50%;
            margin: 0 6px;
            transition: all 0.3s ease;
          }
          .swiper-pagination-bullet-active {
            background: #e03733;
            border-color:#f6d32f;
            transform: scale(1.2);
          }
        `}
      </style>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        className="swiper-container-custom max-w-5xl w-full"
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <TestimonialCard
              animate={{ ...testimonial, index: `${index}-${activeIndex}` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}