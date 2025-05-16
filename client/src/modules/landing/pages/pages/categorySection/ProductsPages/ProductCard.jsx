// import React from "react";
// import { Phone, MessageSquare } from "lucide-react";
// import ProductCarousel from "./ProductCarousel";

// const ProductCard = ({ product, viewType }) => {
//   return (
//     <div
//       className={`bg-white rounded-lg shadow hover:shadow-md p-4 transition-all duration-200 ${
//         viewType === "list" ? "flex  md:flex-row gap-4" : ""
//       }`}
//     >
//       <div className={viewType === "grid" ? "mb-2" : "md:w-1/3"}>
//         <ProductCarousel images={product.images} />
//       </div>

//       <div className="flex-1">
//         <h2 className="text-md font-semibold text-red-600 mb-2">{product.title}</h2>
//         <p className="text-lg font-bold mb-2">
//           ₹ {product.price} / {product.unit}
//         </p>

//         {/* ✅ Dynamic Attributes */}
//         <ul className="text-sm text-gray-700 space-y-1 mb-2">
//           {product.attributes &&
//             Object.entries(product.attributes).map(([key, value]) => (
//               <li key={key}>
//                 <strong>{key}:</strong> {value}
//               </li>
//             ))}
//         </ul>

//         <div className="flex gap-2 mt-4">
//           <button className="border rounded px-3 py-1 flex items-center gap-1 text-blue-600 border-blue-600 hover:bg-blue-50 text-sm">
//             <Phone size={14} /> View Mobile
//           </button>
//           <button className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-green-700 text-sm">
//             <MessageSquare size={14} /> Send Enquiry
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;



import React, { useState } from "react";
import axios from "axios";
import { Phone, MessageSquare, ArrowUpCircle } from "lucide-react";
import ProductCarousel from "./ProductCarousel";

const ProductCard = ({ product, viewType, currentUserId }) => {
  const [loading, setLoading] = useState(false);
  const [given, setGiven] = useState(false);

  const handleGiveTrendingPoint = async () => {
    if (loading || given) return;

    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/trending-point/create-trending-points`, {
        user_id: "67de5caffcfb7c166a0b8f4d",
        product_id: "6818b728bc645cba48fcd7b2",
        trending_Points: 1,
        date: new Date().toISOString().split("T")[0], // e.g., "2025-05-14"
      });
      console.log("Trending point response:", response);
      if (response.status === 200 || response.status === 201) {
        setGiven(true);
      } else {
        alert("Failed to give trending point.");
      }
    } catch (error) {
      console.error("Trending point error:", error);
      alert(error.response?.data?.message || "Error giving trending point.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
    onClick={handleGiveTrendingPoint}
      className={`bg-white rounded-lg shadow hover:shadow-md p-4 transition-all duration-200 ${
        viewType === "list" ? "flex md:flex-row gap-4" : ""
      }`}
    >
      <div className={viewType === "grid" ? "mb-2" : "md:w-1/3"}>
        <ProductCarousel images={product.images || []} />
      </div>

      <div className="flex-1">
        <h2 className="text-md font-semibold text-red-600 mb-2">{product.title}</h2>
        <p className="text-lg font-bold mb-2">
          ₹ {product.price} / {product.unit}
        </p>

        {/* Trending Points Display */}
        {product.trendingPoints !== undefined && (
          <p className="text-xs text-gray-500 mb-2">
            🔥 {product.trendingPoints} trending point{product.trendingPoints > 1 ? "s" : ""}
          </p>
        )}

        {/* Attributes */}
        <ul className="text-sm text-gray-700 space-y-1 mb-2">
          {product.attributes &&
            Object.entries(product.attributes).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong>{" "}
                {String(value).length > 50 ? String(value).slice(0, 50) + "..." : String(value)}
              </li>
            ))}
        </ul>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button className="border rounded px-3 py-1 flex items-center gap-1 text-[#e03733] border-[#e03733] hover:bg-red-50 text-sm">
            <Phone size={14} /> View Mobile
          </button>
          <button className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-green-700 text-sm">
            <MessageSquare size={14} /> Send Enquiry
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
