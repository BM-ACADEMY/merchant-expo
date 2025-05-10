import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import * as LucideIcons from 'lucide-react';
import CategorySidebar from './pages/pages/category/CategorySidebar';
import BannerCarousel from './components/BannerCarousel';
import CategoryHoverContent from './pages/pages/category/CategoryHoverContent';
import TrendingCategory from './pages/pages/trendingCategory/TrendingCategory';
import CategorySection from './pages/pages/categorySection/CategorySection';
import Testimonial from '../landing/pages/pages/testimonial/Testimonial';
import PopularProducts from './pages/pages/products/PopularProduct';

const Submenu = ({ subcategories }) => {
  if (!subcategories || subcategories.length === 0) return null;
  console.log(subcategories, "sub");

  return (
    <div className="h-full w-full bg-white p-6 rounded-lg shadow-md grid grid-cols-3 gap-4 overflow-y-auto">
      {subcategories.map((superCat, index) => (
        <div key={index} className="flex flex-col">
          <h3 className="text-sm font-semibold text-gray-800 uppercase mb-3 border-b border-gray-200 pb-1">
            {superCat.superCategory}
          </h3>
          <ul className="space-y-2">
            {superCat.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <Link
                  to={item.path}
                  className="text-sm text-gray-600 hover:text-blue-600 hover:underline transition-colors duration-150 block"
                >
                  {item.label}
                </Link>

              </li>
            ))}
          </ul>
          <Link
            to={`/all-category/${superCat?.superCategory?.toLowerCase()?.replace(/ & /g, '-')?.replace(/ /g, '-')}`}
            className="text-blue-600 text-sm mt-3 cursor-pointer hover:underline transition-colors duration-150 block"
          >
            View More
          </Link>
        </div>
      ))}
    </div>
  );
};
const HomePage = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <>
      <div
        className="flex w-full h-[60vh] relative"
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <div className='mt-4' onMouseEnter={() => hoveredCategory && setHoveredCategory(hoveredCategory)}>
          <CategorySidebar
            onHover={(cat) => setHoveredCategory(cat)}
            onLeave={() => setHoveredCategory(null)}
            selectedId={hoveredCategory?.id}
          />
        </div>

        <div
          className="flex-1 h-full bg-gray-100 overflow-hidden mt-4"
          onMouseEnter={() => hoveredCategory && setHoveredCategory(hoveredCategory)}
        >
          {hoveredCategory && hoveredCategory.subcategories.length > 0 ? (
            <Submenu subcategories={hoveredCategory.subcategories} />
          ) : (
            <BannerCarousel />
          )}
        </div>

      </div>
      <div className='mt-4'>
        <TrendingCategory />
      </div>
      <div className='mt-4'>
        <CategorySection />
      </div>
      <div className='mt-4'>
        <Testimonial />
      </div>
      <div className='mt-4'>
        <PopularProducts />
      </div>
    </>
  );
};



export default HomePage;