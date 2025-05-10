import { useState, useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';
// Utility function for className concatenation
const cn = (...classes) => classes.filter(Boolean).join(' ');

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Category data with super categories and subcategories
const categories = [
  {
    id: 1,
    label: "Home Supplies",
    icon: "Boxes",
    // path: "/categories/home-supplies",
    subcategories: [
      {
        superCategory: "Metal Furniture",
        items: [
          { label: "Steel Furniture", path: "/categories/home-supplies/metal-furniture/steel-furniture" },
          { label: "Recliner Chair", path: "/categories/home-supplies/metal-furniture/recliner-chair" },
          { label: "Steel Table", path: "/categories/home-supplies/metal-furniture/steel-table" },
          { label: "Steel Almirah", path: "/categories/home-supplies/metal-furniture/steel-almirah" },
        ],
      },
      {
        superCategory: "Furniture Hardware & Fittings",
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
    // path: "/categories/agriculture",
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
    // path: "/categories/food-products-beverage",
    subcategories: [],
  },
  {
    id: 4,
    label: "Apparel & Fashion",
    icon: "Shirt",
    // path: "/categories/apparel-fashion",
    subcategories: [],
  },
  {
    id: 5,
    label: "Chemicals",
    icon: "FlaskConical",
    // path: "/categories/chemicals",
    subcategories: [],
  },
  {
    id: 6,
    label: "Industrial Supplies",
    icon: "Factory",
    // path: "/categories/industrial-supplies",
    subcategories: [],
  },
  {
    id: 7,
    label: "Construction & Real Estate",
    icon: "Building2",
    // path: "/categories/construction-real-estate",
    subcategories: [],
  },
  {
    id: 8,
    label: "Furniture",
    icon: "Wrench",
    // path: "/categories/furniture",
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
    // path: "/categories/health-beauty",
    subcategories: [],
  },
  {
    id: 10,
    label: "All Categories",
    icon: "Grid",
    // path: "/all-categories",
    subcategories: [],
  },
];


const CategorySidebar = ({ onHover, onLeave, selectedId }) => {
  const [isTouchActive, setIsTouchActive] = useState(false);

  const handleTouchStart = (cat) => {
    if (isTouchActive && cat === null) {
      onLeave();
      setIsTouchActive(false);
    } else {
      onHover(cat);
      setIsTouchActive(true);
    }
  };

  return (
    <div className="bg-white p-4 w-[250px] border border-gray-200 h-auto">
      <h3 className="font-bold mb-4 text-black">Top Categories</h3>
      <ul className="space-y-2">
        {categories.map((cat) => {
          const Icon = LucideIcons[cat.icon] || LucideIcons["Square"];
          const slug = slugify(cat.label);
          const isAllCategories = cat.label === "All Categories";

          return (
            <li
              key={cat.id}
              className={cn(
                "cursor-pointer text-black border-b border-gray-200 rounded transition hover:bg-gray-100",
                selectedId === cat.id && "bg-blue-200"
              )}
              onMouseEnter={() => onHover(cat)}
              onMouseLeave={() => !isTouchActive && onLeave()}
              onTouchStart={() => handleTouchStart(cat)}
            >
              <Link
                to={isAllCategories ? "/all-categories" : `/all-categories/${slug}`}
                className="flex items-center gap-2 py-[5px] px-2"
              >
                <Icon size={18} className="text-gray-800" />
                <span className="text-sm">{cat.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default CategorySidebar;