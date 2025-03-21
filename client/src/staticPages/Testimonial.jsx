import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star, Play, Pause, Volume2, VolumeX,ChevronDown } from "lucide-react";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import YouTube from "react-youtube";


const faqs = [
  {
    question: "What is the purpose of a testimonial?",
    answer: "A testimonial provides social proof and builds credibility for a product or service by sharing real user experiences."
  },
  {
    question: "Why are testimonials so powerful?",
    answer: "They showcase authentic feedback, influencing potential customers' buying decisions through trust and relatability."
  },
  {
    question: "What is the impact of testimonials?",
    answer: "Testimonials enhance brand reputation, increase conversion rates, and build stronger customer relationships."
  },
  {
    question: "How is a video testimonial helpful to a customer?",
    answer: "Video testimonials provide a more engaging, trustworthy, and relatable experience compared to written reviews."
  },
  {
    question: "Why do many people trust testimonials?",
    answer: "People trust testimonials because they reflect real experiences from other users, reducing skepticism about a service."
  }
];

const testimonials = [
  {
    id: 1,
    name: "Sriram V",
    company: "Essar Technologies",
    country: "India",
    review:
      "I personally find this platform very useful in connecting with buyers across the globe.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Devesh Singh",
    company: "Vintage Vision Private Limited",
    country: "India",
    review:
      "If you're a business looking to optimize your B2B business and establish fruitful relationships with customers then exportersindia could be the right choice for you.",
    rating: 3.5,
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Mr. Swapnil Mittal",
    company: "Azure International",
    country: "India",
    review:
      "Thanks for completing the website development. I would like to complement your entire team for the amazing work.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Mr. Amran Bin Yardin",
    company: "Rad Winnners & Shb Chemicals Sdn Bhd",
    country: "Malaysia",
    review:
      "Your services are well appreciated by us. We shall continue to work with you for a long-term deal.",
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 5,
    name: "Ravi Kumar",
    company: "Tech Innovators",
    country: "USA",
    review:
      "Excellent platform for business networking and growth. Great support team!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 6,
    name: "Sophia Lee",
    company: "Global Trade Hub",
    country: "UK",
    review:
      "The best marketplace to connect with global clients. Super helpful team!",
    rating: 4.7,
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 7,
    name: "Daniel Smith",
    company: "Tech Solutions",
    country: "Canada",
    review:
      "Great experience with their B2B services. Helped me scale my business efficiently.",
    rating: 4.2,
    image: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: 8,
    name: "Elena Costa",
    company: "Trade Connect",
    country: "Italy",
    review:
      "Their platform made international trade much easier for my company.",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 9,
    name: "Chris Walker",
    company: "Innovative Exports",
    country: "Australia",
    review:
      "Loved their platform and customer support. Truly a great business solution!",
    rating: 4.3,
    image: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: 10,
    name: "Emma Brown",
    company: "B2B Leaders",
    country: "Germany",
    review:
      "Highly professional and well-structured platform for business networking.",
    rating: 4.6,
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

const testimonialsVideo = [
  {
    id: 1,
    name: "Sriram V",
    company: "Essar Technologies",
    country: "India",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 2,
    name: "Devesh Singh",
    company: "Vintage Vision Pvt Ltd",
    country: "India",
    youtubeId: "tgbNymZ7vqY",
  },
  {
    id: 3,
    name: "Swapnil Mittal",
    company: "Azure International",
    country: "India",
    youtubeId: "3JZ_D3ELwOQ",
  },
  {
    id: 4,
    name: "Amran Bin Yardin",
    company: "Rad Winnners & Shb Chemicals Sdn Bhd",
    country: "Malaysia",
    youtubeId: "kJQP7kiw5Fk",
  },
];
export default function Testimonial() {
  const [visible, setVisible] = useState(5);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);


  const onPlay = (videoId) => {
    setPlayingVideo(videoId);
  };

  const onPause = () => {
    setPlayingVideo(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        Client Reviews & Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.slice(0, visible).map((t) => (
          <Card
            key={t.id}
            className="p-4 rounded-xl shadow-md border border-gray-200 transition-all duration-300 
          hover:scale-105 hover:shadow-xl hover:border-transparent 
          hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-white"
          >
            <CardContent>
              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold">{t.name}</h3>
                  <p className="text-sm text-gray-500">
                    {t.company} - <i>{t.country}</i>
                  </p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-700">{t.review}</p>
              <div className="flex items-center mt-2">
                {[...Array(Math.floor(t.rating))].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-500"
                    fill="currentColor"
                  />
                ))}
                {t.rating % 1 !== 0 && (
                  <Star
                    className="w-4 h-4 text-yellow-500"
                    fill="currentColor"
                    opacity={0.5}
                  />
                )}
                <span className="ml-2 text-sm font-semibold">
                  {t.rating} / 5
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {visible < testimonials.length && (
        <div className="text-center mt-6">
          <Button
            onClick={() => setVisible(visible + 5)}
            className=" bg-[#e03733]  hover:shadow-lg text-white py-2 rounded-md cursor-pointer"
          >
            Load More
          </Button>
        </div>
      )}
      <div className="w-full max-w-6xl mx-auto py-10 px-4 bg-gray-100 mt-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          🎬 Customer Video Testimonials
        </h2>

        <Carousel className="relative">
          <CarouselContent className="flex gap-6">
            {testimonialsVideo.map((t) => (
              <CarouselItem
                key={t.id}
                className="basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <Card className="overflow-hidden shadow-lg rounded-xl border border-gray-200 hover:shadow-2xl transition-all">
                  <CardContent className="relative">
                    {/* YouTube Video */}
                    <div className="w-full h-64 bg-black">
                      <YouTube
                        videoId={t.youtubeId}
                        opts={{
                          width: "100%",
                          height: "100%",
                          playerVars: {
                            autoplay: 0,
                            modestbranding: 1,
                            rel: 0,
                          },
                        }}
                        onPlay={() => onPlay(t.youtubeId)}
                        onPause={onPause}
                        className="w-full h-full rounded-t-xl"
                      />
                    </div>

                    {/* User Info */}
                    <div className="p-4 bg-white">
                      <h3 className="font-semibold text-lg">{t.name}</h3>
                      <p className="text-sm text-gray-600">
                        {t.company} - <i>{t.country}</i>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400" />
          <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400" />
        </Carousel>
      </div>
      <div className="max-w-2xl mx-auto py-10 mt-10">
      <h2 className="text-center text-3xl font-bold mb-6">Why Client Testimonials Are Important?</h2>
      <Accordion>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} className="border-b">
            <motion.div
              className="flex justify-between items-center p-4 cursor-pointer bg-white shadow-sm rounded-lg hover:bg-gray-100 transition"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              initial={{ backgroundColor: "#fff" }}
              whileHover={{ scale: 1.02 }}
            >
              <span className="font-semibold text-lg">Q{index + 1}. {faq.question}</span>
              <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }}>
                <ChevronDown size={20} />
              </motion.div>
            </motion.div>
            {openIndex === index && (
              <motion.div
                className="p-4 bg-gray-50 rounded-b-lg"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                {faq.answer}
              </motion.div>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
    </div>
  );
}
