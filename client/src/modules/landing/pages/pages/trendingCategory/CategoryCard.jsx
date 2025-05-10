import { Button } from '@/components/ui/button';

const CategoryCard = ({ title, description, imageUrl }) => {
  return (
    <div
      className="relative w-70 h-[350px] overflow-hidden rounded-lg shadow-lg group cursor-pointer"
      style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-0 transition-opacity duration-300 z-10"></div>

      {/* Text Box */}
      <div className="absolute top-0 left-0 w-full flex flex-col items-center justify-between bg-white opacity-98 text-center h-[60%] px-3 py-10 z-20 transition-all duration-300 group-hover:h-[10%] group-hover:py-2">
        <h2 className="uppercase text-[#e03733] tracking-wider mb-4 text-lg transition-all duration-300 group-hover:mb-0">
          {title}
        </h2>
        <p className="text-gray-600 text-sm transition-opacity duration-300 group-hover:opacity-0">
          {description}
        </p>
        <div className="w-full h-10 bg-white transform skew-y-6 relative z-10 -mt-4"></div>
      </div>

      {/* Button */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-300 z-30">
        <button className="px-4 py-2 text-white border border-white uppercase tracking-wide hover:bg-[#f6d32f] hover:border-[#f6d32f] transition">
          View
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
