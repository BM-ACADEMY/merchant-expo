import React, { useState } from "react";

const ProductCarousel = ({ images = [] }) => {
  const [active, setActive] = useState(images[0]);

  return (
    <div>
      <img
        src={active}
        alt="product"
        className="w-full h-40 object-cover rounded"
      />
      <div className="flex gap-2 mt-2">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`thumb-${idx}`}
            className={`w-12 h-12 rounded cursor-pointer border ${
              active === img ? "border-[#e03733]" : "border-gray-300"
            }`}
            onClick={() => setActive(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
