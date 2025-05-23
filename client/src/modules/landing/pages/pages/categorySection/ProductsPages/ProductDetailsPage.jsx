import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Plus, CheckCircle, XCircle, Mails, PhoneOutgoing, CircleEllipsis } from 'lucide-react';
import { useGetProductByNameQuery } from "@/redux/api/ProductApi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ProductAttributesPage from "./ProductAttributePage";

import ProductQuoteModel from "./model/ProductQuoteModel";

const ProductDetailsPage = () => {
  const { product_name } = useParams();
  const { data, isLoading, error } = useGetProductByNameQuery({ product_name });

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAllAttributes, setShowAllAttributes] = useState(false);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [openQuoteModal, setOpenQuoteModal] = useState(false);
  const imageRef = useRef(null);
  const lensSize = 80; // Square lens size

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading product.</div>;

  const product = data?.product;
  const productAttributes = data?.productAttributes;
  const seller = data?.seller;
  const address = data?.address;


  const handleOpenModel = () => {
    setOpenQuoteModal(true);
  }
  // Zoom effect handlers
  const handleMouseMove = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Ensure lens stays within image bounds
    const lensX = Math.max(0, Math.min(x - lensSize / 2, rect.width - lensSize));
    const lensY = Math.max(0, Math.min(y - lensSize / 2, rect.height - lensSize));

    // Percent for zoom reference
    const zoomX = (x / rect.width) * 100;
    const zoomY = (y / rect.height) * 100;

    setLensPosition({ x: lensX, y: lensY });
    setZoomPosition({ x: zoomX, y: zoomY });
  };

  // Calculate "Member Since" years
  const memberSinceYears = new Date().getFullYear() - new Date(seller.createdAt).getFullYear();

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col md:flex-row p-4 gap-4 mx-auto max-w-6xl">
        {/* Left Side */}
        <div className="flex gap-3 border-1 rounded-lg p-4 ">
          <div className="relative">
            {/* Main Image Preview */}
            <div
              className="relative w-full h-64 border rounded-lg overflow-hidden"
              onMouseEnter={() => setZoomVisible(true)}
              onMouseLeave={() => setZoomVisible(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.product_image[activeImageIndex]}
                alt={product.product_name}
                ref={imageRef}
                className="w-full h-full object-cover cursor-pointer"
              />

              {/* Lens Rectangle */}
              {zoomVisible && (
                <div
                  className="absolute border-2 border-red-500 bg-white/30 pointer-events-none"
                  style={{
                    width: `${lensSize}px`,
                    height: `${lensSize}px`,
                    left: `${lensPosition.x}px`,
                    top: `${lensPosition.y}px`,
                  }}
                >
                  <div className="flex items-center justify-center h-full w-full">
                    <Plus size={20} className="text-red-600" />
                  </div>
                </div>
              )}
            </div>

            {/* Zoom Preview */}
            {zoomVisible && (
              <div
                className="absolute w-60 h-60 border rounded-lg overflow-hidden hidden md:block z-50 bg-white shadow-lg"
                style={{
                  top: 0,
                  left: 'calc(100% + 10px)',
                }}
              >
                <img
                  src={product.product_image[activeImageIndex]}
                  alt="zoom"
                  className="w-auto h-auto min-w-full min-h-full absolute"
                  style={{
                    transform: `translate(-${zoomPosition.x}%, -${zoomPosition.y}%) scale(2.5)`,
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    pointerEvents: "none",
                  }}
                />
              </div>
            )}

            {/* Carousel only if more than 1 image */}
            {product.product_image.length > 1 && (
              <>
                {/* Thumbnails */}
                <div className="flex justify-center mt-2 gap-2">
                  {product.product_image.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.product_name} ${index + 1}`}
                      className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${activeImageIndex === index ? "border-2 border-[#e03733]" : "opacity-50"
                        }`}
                      onClick={() => setActiveImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>


          <div className="flex flex-col gap-1">
            {/* Product Name and Price */}
            <div className="mt-4">
              <h1 className="text-xl font-bold">
                {(() => {
                  const words = product.product_name.replace(/-/g, " ").toUpperCase().split(" ");
                  const firstTwo = words.slice(0, 2).join(" ");
                  const rest = words.slice(2).join(" ");
                  return (
                    <>
                      <span className="text-red-500">{firstTwo}</span> {rest}
                    </>
                  );
                })()}
              </h1>

              <p className="text-lg text-gray-700 mt-2">
                ₹ {product.price.$numberDecimal}
              </p>
            </div>

            {/* Attributes (First 5) */}
            <div className="mt-4">
              {productAttributes.slice(0, 4).map((attr, index) => (
                <div key={index} className="flex justify-between py-1">
                  <span className="font-semibold">{attr.attribute_key}</span>
                  <span>{attr.attribute_value}</span>
                </div>
              ))}
              {productAttributes.length > 1 && (
                <>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowAllAttributes(true)}
                      variant="outline"
                      className="cursor-pointer"
                    >
                      View More <CircleEllipsis />
                    </Button>
                    <Button
                      onClick={handleOpenModel}
                      variant="destructive"
                      className="cursor-pointer"
                    >
                      send enquiry <Mails />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/3 p-4 border rounded-lg">
          {/* Company Logo and Name */}
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={seller.company_logo} alt={seller.company_name} />
              <AvatarFallback>
                {seller.company_name
                  ?.split(" ")
                  .map(word => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <h2 className="text-xl font-bold">{seller.company_name || seller?.travels_name}</h2>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    {seller.verified_status ? (
                      <CheckCircle className="text-green-500 w-5 h-5 cursor-pointer" />
                    ) : (
                      <XCircle className="text-red-500 w-5 h-5 cursor-pointer" />
                    )}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{seller.verified_status ? "Verified" : "Not Verified"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Company Address */}
          <p className="text-gray-600 mt-2">
            {address.address_line_1}, {address.address_line_2}, {address.city}, {address.state}, {address.country}, {address.pincode}
          </p>

          {/* Additional Company Details */}
          <div className="mt-4">
            <div className="flex flex-col  py-1">
              <span className="font-semibold">Member Since</span>
              <span>{memberSinceYears} Year{memberSinceYears !== 1 ? "s" : ""}</span>
            </div>
            <div className="flex flex-col py-1">
              <span className="font-semibold">Nature of Business</span>
              <span>{seller.company_type}</span>
            </div>
            <div className="flex flex-col py-1">
              <span className="font-semibold">Year of Establishment</span>
              <span>{seller.year_of_establishment}</span>
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-3">

            {/* View More Details Button */}
            <Button variant="outline" className="cursor-pointer"><PhoneOutgoing /> View Number</Button>
            {/* View More Details Button */}
            <Button variant="destructive" className="cursor-pointer"><CircleEllipsis /> View More Details</Button>
          </div>

        </div>

      </div>
      {showAllAttributes && (
        <ProductAttributesPage data={data} />
      )}
    {
      openQuoteModal && 
        <ProductQuoteModel
        product={product}
        open={openQuoteModal}
        setOpen={setOpenQuoteModal}
      />
    }
    </div>
  );
};

export default ProductDetailsPage;
