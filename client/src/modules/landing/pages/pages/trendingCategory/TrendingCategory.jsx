import React from "react";
import CategoryCard from "./CategoryCard"; // Import your custom card component

const categories = [
  {
    id: 1,
    title: "Agriculture",
    imageUrl: "https://img.freepik.com/free-vector/variety-activities-from-agricultural-workers_23-2148815844.jpg",
  },
  {
    id: 2,
    title: "Apparel and Fashion Accessories",
    imageUrl: "https://img.freepik.com/free-photo/flat-lay-trendy-creative-feminine-accessories-arrangement_23-2148430843.jpg",
  },
  {
    id: 3,
    title: "Service Providers and Consultants Directory",
    imageUrl: "https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg",
  },
  {
    id: 4,
    title: "Food Products & Beverages",
    imageUrl: "https://img.freepik.com/free-photo/creative-assortment-with-hamburger-menu_23-2148430843.jpg",
  },
  {
    id: 5,
    title: "Office Supplies & Stationery",
    imageUrl: "https://img.freepik.com/free-photo/top-view-desk-supplies-arrangement-still-life_23-2148430843.jpg",
  },
];


const TrendingCategory = () => {
  return (
    <section className="py-12 px-4  bg-gray-50">
      <h2 className="text-4xl font-bold mb-10 text-center">Trending Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            title={cat.title}
            description={cat.description}
            imageUrl={cat.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingCategory;
