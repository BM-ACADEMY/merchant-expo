import React from "react";

const Sidebar = ({ categories = [], selected, onSelect }) => {
  return (
    <div className="w-full md:w-60 bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Related Categories</h2>
      <ul className="space-y-2">
        {categories.map((cat, index) => (
          <li
            key={index}
            onClick={() => onSelect(cat.label)}
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 ${
              selected === cat.label ? "bg-gray-200 font-semibold" : ""
            }`}
          >
       <div className="flex gap-3 items-center ">
             <img src={cat.deep_sub_category_image} className="w-10 h-10" alt={cat.label} />
         <span>   {cat.label}</span>
       </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
