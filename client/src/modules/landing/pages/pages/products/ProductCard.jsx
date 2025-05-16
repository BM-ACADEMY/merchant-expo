import { useRef } from 'react';
import { Heart, Eye } from 'lucide-react';
import { gsap } from 'gsap';

const ProductCard = ({ product }) => {
  const cardRef = useRef(null);
  const iconRef = useRef(null);

  const { product: productData } = product; // Destructure nested product object
  const image = productData.product_image[0] || '/fallback-image.jpg'; // First image or fallback
  const name = productData.product_name;
  const price = productData.price.$numberDecimal; // Extract price from $numberDecimal

  const handleMouseEnter = () => {
    // Animate the card scale
    gsap.to(cardRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power3.out',
    });
    // Animate the icons from bottom to center
    gsap.fromTo(
      iconRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
    );
  };

  const handleMouseLeave = () => {
    // Reset the card scale
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power3.in',
    });
    // Hide the icons
    gsap.to(iconRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
    });
  };

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col items-center p-2 border-r-2 hover:shadow-[1.95px_1.95px_2.6px_rgba(0,0,0,0.15)] hover:border-r-4 hover:border-[#e03733] hover:rounded-xl transition-shadow cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={image} alt={name} className="w-32 h-32 object-cover mb-2" />
      <p className="text-[#e03733] font-bold text-xs">MODERN EDITION</p>
      <h3 className="text-sm font-semibold">{name}</h3>
    <p className="text-gray-600">₹{parseFloat(price).toFixed(0)}</p>
      <div
        ref={iconRef}
        className="absolute inset-0 flex justify-center items-center gap-4 opacity-0"
      >
        <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 cursor-pointer">
          <Heart className="w-5 h-5 text-[#e03733]" />
        </button>
        <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 cursor-pointer">
          <Eye className="w-5 h-5 text-[#1C1B1F]" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;