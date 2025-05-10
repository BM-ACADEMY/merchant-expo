// import { ArrowRight } from "lucide-react";
// const categories = [
//     {
//       categoryName: "Fashion",
//       image: "https://img.freepik.com/free-photo/fashion-style-design-ideas-clothing_1150-7757.jpg",
//       subCategories: [
//         { name: "Men's Clothing" },
//         { name: "Women's Clothing" },
//         { name: "Accessories" }
//       ]
//     },
//     {
//       categoryName: "Electronics",
//       image: "https://img.freepik.com/free-photo/futuristic-electronic-products-innovations_1150-19025.jpg",
//       subCategories: [
//         { name: "Mobile Phones" },
//         { name: "Laptops" },
//         { name: "Headphones" }
//       ]
//     },
//     {
//       categoryName: "Home & Furniture",
//       image: "https://img.freepik.com/free-photo/modern-living-room-interior_1150-14171.jpg",
//       subCategories: [
//         { name: "Sofas" },
//         { name: "Beds" },
//         { name: "Dining Tables" }
//       ]
//     },
//     {
//       categoryName: "Books",
//       image: "https://img.freepik.com/free-photo/books-library-with-vintage-effect_1150-14932.jpg",
//       subCategories: [
//         { name: "Fiction" },
//         { name: "Non-fiction" },
//         { name: "Children's Books" }
//       ]
//     },
//     {
//       categoryName: "Groceries",
//       image: "https://img.freepik.com/free-photo/grocery-store-fresh-products_1150-14689.jpg",
//       subCategories: [
//         { name: "Fruits & Vegetables" },
//         { name: "Dairy" },
//         { name: "Snacks" }
//       ]
//     },
//     {
//       categoryName: "Toys",
//       image: "https://img.freepik.com/free-photo/assorted-toys-kids_1150-19414.jpg",
//       subCategories: [
//         { name: "Action Figures" },
//         { name: "Board Games" },
//         { name: "Dolls" }
//       ]
//     },
//     {
//       categoryName: "Sports",
//       image: "https://img.freepik.com/free-photo/sports-equipment-rack-gym_1150-10080.jpg",
//       subCategories: [
//         { name: "Football" },
//         { name: "Basketball" },
//         { name: "Tennis" }
//       ]
//     },
//     {
//       categoryName: "Health & Beauty",
//       image: "https://img.freepik.com/free-photo/health-beauty-products-on-white-background_1150-13629.jpg",
//       subCategories: [
//         { name: "Skincare" },
//         { name: "Hair Care" },
//         { name: "Makeup" }
//       ]
//     },
//     {
//       categoryName: "Automotive",
//       image: "https://img.freepik.com/free-photo/modern-car-interior_1150-12088.jpg",
//       subCategories: [
//         { name: "Car Accessories" },
//         { name: "Motorbikes" },
//         { name: "Auto Parts" }
//       ]
//     },
//     {
//       categoryName: "Pets",
//       image: "https://img.freepik.com/free-photo/pet-care-products_1150-11624.jpg",
//       subCategories: [
//         { name: "Dogs" },
//         { name: "Cats" },
//         { name: "Birds" }
//       ]
//     }
//   ];
  
// const AllCategoriesPage=()=> {
//     return (
//         <div className="bg-white p-4 w-[250px] border border-gray-200 h-auto">
//         <h3 className="font-bold mb-4 text-black">Top Categories</h3>
//         <ul className="space-y-2">
//           {categories.map((cat) => {
//             const Icon = LucideIcons[cat.icon] || LucideIcons["Square"];
//             return (
//               <li
//                 key={cat.id}
//                 className={cn(
//                   "cursor-pointer text-black border-b border-gray-200 rounded transition hover:bg-gray-100",
//                   selectedId === cat.id && "bg-blue-200"
//                 )}
//                 onMouseEnter={() => onHover(cat)}
//                 onMouseLeave={() => !isTouchActive && onLeave()}
//                 onTouchStart={() => handleTouchStart(cat)}
//               >
//                 <Link
//                   to={`/category/${cat.id}`}
//                   className="flex items-center gap-2 py-[5px] px-2"
//                 >
//                   <Icon size={18} className="text-gray-800" />
//                   <span className="text-sm">{cat.label}</span>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     );
//   }

//   export default AllCategoriesPage;


import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Category data with super categories and subcategories
const categoriesData = [
  {
    id: 1,
    label: "Home Supplies",
    icon: "Boxes",
    category_image: "https://img.freepik.com/free-photo/modern-living-room-interior_1150-14171.jpg",
    subcategories: [
      {
        superCategory: "Metal Furniture",
        sub_category_image: "https://img.freepik.com/free-photo/modern-living-room-interior_1150-14171.jpg",
        items: [
          { label: "Steel Furniture", path: "/categories/home-supplies/metal-furniture/steel-furniture" },
          { label: "Recliner Chair", path: "/categories/home-supplies/metal-furniture/recliner-chair" },
          { label: "Steel Table", path: "/categories/home-supplies/metal-furniture/steel-table" },
          { label: "Steel Almirah", path: "/categories/home-supplies/metal-furniture/steel-almirah" },
        ],
      },
      {
        superCategory: "Furniture Hardware & Fittings",
        sub_category_image: "https://img.freepik.com/free-photo/modern-living-room-interior_1150-14171.jpg",
        items: [
          { label: "Table Top", path: "/categories/home-supplies/furniture-hardware-fittings/table-top" },
          { label: "Backrest", path: "/categories/home-supplies/furniture-hardware-fittings/backrest" },
          { label: "Bed Frames", path: "/categories/home-supplies/furniture-hardware-fittings/bed-frames" },
          { label: "Furniture Hardware", path: "/categories/home-supplies/furniture-hardware-fittings/furniture-hardware" },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Agriculture",
    icon: "Tractor",
    category_image: "https://img.freepik.com/free-photo/agricultural-field-farm_1150-14083.jpg",
    subcategories: [
      {
        superCategory: "Farming Tools",
        items: [
          { label: "Shovels", path: "/categories/agriculture/farming-tools/shovels" },
          { label: "Hoes", path: "/categories/agriculture/farming-tools/hoes" },
          { label: "Tractors", path: "/categories/agriculture/farming-tools/tractors" },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Food Products & Beverage",
    icon: "Utensils",
    category_image: "https://img.freepik.com/free-photo/variety-vegetables-healthy-food_23-2148744702.jpg",
    subcategories: [],
  },
  {
    id: 4,
    label: "Apparel & Fashion",
    icon: "Shirt",
    category_image: "https://img.freepik.com/free-photo/wardrobe-modern-clothing-hangers-fashion_23-2148721025.jpg",
    subcategories: [],
  },
  {
    id: 5,
    label: "Chemicals",
    icon: "FlaskConical",
    category_image: "https://img.freepik.com/free-photo/laboratory-glassware-chemicals_23-2148734820.jpg",
    subcategories: [],
  },
  {
    id: 6,
    label: "Industrial Supplies",
    icon: "Factory",
    category_image: "https://img.freepik.com/free-photo/industrial-factory-complex-with-smoke-stacks_23-2148891198.jpg",
    subcategories: [],
  },
  {
    id: 7,
    label: "Construction & Real Estate",
    icon: "Building2",
    category_image: "https://img.freepik.com/free-photo/construction-site-sunset_1150-16821.jpg",
    subcategories: [],
  },
  {
    id: 8,
    label: "Furniture",
    icon: "Wrench",
    category_image: "https://img.freepik.com/free-photo/furniture-modern-interior_1150-13870.jpg",
    subcategories: [
      {
        superCategory: "Living Room & Plastic Furniture",
        items: [
          { label: "Sofa Set", path: "/categories/furniture/living-room-plastic-furniture/sofa-set" },
          { label: "Cupboard", path: "/categories/furniture/living-room-plastic-furniture/cupboard" },
          { label: "TV Unit", path: "/categories/furniture/living-room-plastic-furniture/tv-unit" },
          { label: "Chairs", path: "/categories/furniture/living-room-plastic-furniture/chairs" },
        ],
      },
      {
        superCategory: "Bedroom, Bathroom & Kids Furniture",
        items: [
          { label: "Almirah", path: "/categories/furniture/bedroom-bathroom-kids-furniture/almirah" },
          { label: "Double Bed", path: "/categories/furniture/bedroom-bathroom-kids-furniture/double-bed" },
          { label: "Folding Bed", path: "/categories/furniture/bedroom-bathroom-kids-furniture/folding-bed" },
          { label: "Bunk Bed", path: "/categories/furniture/bedroom-bathroom-kids-furniture/bunk-bed" },
          { label: "Foldable Wardrobe", path: "/categories/furniture/bedroom-bathroom-kids-furniture/foldable-wardrobe" },
        ],
      },
    ],
  },
  {
    id: 9,
    label: "Health & Beauty",
    icon: "Heart",
    category_image: "https://img.freepik.com/free-photo/beauty-products-composition_23-2148557218.jpg",
    subcategories: [],
  },
  {
    id: 10,
    label: "All Categories",
    icon: "Grid",
    category_image: "https://img.freepik.com/free-photo/variety-products-shopping-concept_23-2148793882.jpg",
    subcategories: [],
  },
];

  
const AllCategoriesPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoriesData
          .filter((cat) => cat.label !== "All Categories")
          .flatMap((category) =>
            category.subcategories.map((sub, index) => (
              <Card key={`${category.id}-${index}`} className="overflow-hidden relative">
                <div className="relative h-48">
                  <img
                    src={sub.sub_category_image}
                    alt={sub.superCategory}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-5 left-5 bg-black bg-opacity-50 text-white text-lg font-semibold px-3 py-1 rounded">
                    {sub.superCategory}
                  </div>
                </div>
              </Card>
            ))
          )}
      </div>
    </div>
  );
};

export default AllCategoriesPage;



