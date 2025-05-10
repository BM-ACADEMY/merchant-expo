import { useParams, Link } from "react-router-dom";

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
  

const SubCategoryList = () => {
  const { category, subCategory } = useParams();
  const decodedCategory = decodeURIComponent(category || "");
  const decodedSubCategory = decodeURIComponent(subCategory || "");

  const selectedCategory = categories.find(cat => cat.label.toLowerCase().replace(/\s+/g, "-") === decodedCategory);

  if (!selectedCategory) return <div className="p-4">Category not found.</div>;

  const subcategoriesToShow = selectedCategory.subcategories;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">{selectedCategory.label}</h2>
      {subcategoriesToShow.length > 0 ? (
        subcategoriesToShow.map((sub, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold text-sm">{sub.superCategory}</h3>
            <ul className="list-disc list-inside text-gray-700 ml-4">
              {sub.items.map((item, idx) => (
                <li key={idx}>
                  <Link to={item.path} className="text-blue-500 hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No subcategories found.</p>
      )}
    </div>
  );
};

export default SubCategoryList;
