import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import CategorySidebar from './pages/pages/category/CategorySidebar';
import BannerCarousel from './components/BannerCarousel';
import TrendingCategory from './pages/pages/trendingCategory/TrendingCategory';
import CategorySection from './pages/pages/categorySection/CategorySection';
import Testimonial from '../landing/pages/pages/testimonial/Testimonial';
import PopularProducts from './pages/pages/products/PopularProduct';
import { useGetTopCategoriesQuery } from '@/redux/api/CategoryApi';
import "./css/Submenu.css";

const Submenu = ({ subcategories }) => {
  if (!subcategories || subcategories.length === 0) return null;
  console.log('subcategories', subcategories);

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-[300px] submenu-container">
      <div className="grid grid-cols-3 gap-4">
        {subcategories.map((subCat, index) => (
          <div key={index} className="flex flex-col min-h-[150px]">
            <h3 className="text-sm font-semibold text-gray-800 uppercase mb-3 border-b border-gray-200 pb-1">
              {subCat.subCategoryName}
            </h3>
            <ul className="space-y-2 flex-1">
              {subCat.superSubCategories?.slice(0, 3).map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Link
                    to={`/category/${item.superSubCategoryId}`}
                    className="text-sm text-gray-600 hover:text-blue-600 hover:underline transition-colors duration-150 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to={`/all-category/${subCat.subCategoryName
                ?.toLowerCase()
                ?.replace(/ & /g, '-')
                ?.replace(/ /g, '-')}`}
              className="text-blue-600 text-sm mt-3 cursor-pointer hover:underline transition-colors duration-150 block"
            >
              View More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
const HomePage = () => {
const [hoveredCategory, setHoveredCategory] = useState(null);
  const { data: topCategoriesData, isLoading } = useGetTopCategoriesQuery();
  const categories = topCategoriesData?.data || [];
  console.log('categories home', categories);
  

  return (
    <>
     <div className="relative w-full h-[60vh] flex overflow-hidden">
        <div className="relative z-10 mt-4">
          <CategorySidebar
            categories={categories}
            onHover={(cat) =>
              setHoveredCategory({
                id: cat.categoryId,
                ...cat,
                subCategories: cat.subCategories || [],
              })
            }
            onLeave={() => {}}
            selectedId={hoveredCategory?.id}
          />
        </div>
        {hoveredCategory?.subCategories?.length > 0 && (
          <div
            className="absolute top-4 left-[250px] right-0 bottom-0 z-20 p-4 submenu-container"
            onMouseEnter={() => setHoveredCategory(hoveredCategory)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <Submenu subcategories={hoveredCategory.subCategories} />
          </div>
        )}
        <div className="relative flex-1 bg-gray-100 mt-4 z-0 overflow-hidden">
          <BannerCarousel />
        </div>
      </div>

      <div className="mt-4">
        <TrendingCategory />
      </div>
      <div className="mt-4">
        <CategorySection categories={categories} />
      </div>
      <div className="mt-4">
        <Testimonial />
      </div>
      <div className="mt-4">
        <PopularProducts />
      </div>
    </>
  );
};

export default HomePage;