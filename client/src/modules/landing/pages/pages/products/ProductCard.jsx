function ProductCard({ product }) {
    return (
      <div className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:scale-105 hover:border-[#e03733] hover:shadow-lg">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 object-cover"
          />
       <div className="absolute inset-0 bg-black/40 group-hover:bg-black/40 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
          <div className="flex items-center mt-2">
            <p className="text-lg text-[#e03733] font-semibold">₹{product.price.toFixed(2)}</p>
            <span className="ml-2 text-sm text-gray-500">/ {product.unit}</span>
          </div>
        </div>
      </div>
    );
  }
  
  export default ProductCard;