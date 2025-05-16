import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../ProductsPages/Sidebar";
import FilterHeader from "../ProductsPages/FilterHeader";
import ProductCard from "../ProductsPages/ProductCard";
import { LayoutGrid, AlignLeft } from 'lucide-react';

// Sample Data
const deepSubCategories = [
    { label: "White Kerosene", product_count: 70, deep_sub_category_image: "https://img.freepik.com/free-photo/beautiful-scenery-mountain-lake-with-sunlight_181624-34079.jpg" },
    { label: "Blue Kerosene", product_count: 50, deep_sub_category_image: "https://img.freepik.com/free-photo/business-people-working-laptop_53876-102586.jpg" },
    { label: "Industrial Kerosene", product_count: 69, deep_sub_category_image: "https://img.freepik.com/free-photo/top-view-desk-concept-with-copy-space_23-2148236865.jpg" },
];

const sampleProducts = [
    {
        title: "Premium White Kerosene, Industrial Use",
        price: 55,
        unit: "Litre",
        city: "Navi Mumbai",
        images: [
            "https://img.freepik.com/free-photo/laboratory-flask-with-clear-liquid_123827-28557.jpg",
            "https://img.freepik.com/free-photo/white-chemical-liquid-bottle_123827-28556.jpg",
            "https://img.freepik.com/free-photo/industrial-container-clear-liquid_123827-28553.jpg",
        ],
        attributes: {
            MOQ: "100 Litres",
            Type: "Kerosene",
            Application: "Industrial",
            City: "Navi Mumbai",
            Purity: "99.9%",
        },
    },
    {
        title: "Blue Kerosene for Domestic Use",
        price: 45,
        unit: "Litre",
        city: "Pune",
        images: [
            "https://img.freepik.com/free-photo/blue-liquid-chemical-glass_123827-28561.jpg",
            "https://img.freepik.com/free-photo/chemical-bottle-closeup-blue-color_123827-28562.jpg",
            "https://img.freepik.com/free-photo/laboratory-bottle-liquid-blue_123827-28563.jpg",
        ],
        attributes: {
            MOQ: "50 Litres",
            Type: "Kerosene",
            Application: "Domestic",
            City: "Pune",
            Color: "Blue",
        },
    },
    {
        title: "Low Odor Kerosene for Indoor Heating",
        price: 60,
        unit: "Litre",
        city: "Delhi",
        images: [
            "https://img.freepik.com/free-photo/liquid-chemical-beaker_123827-28558.jpg",
            "https://img.freepik.com/free-photo/science-experiment-blue-liquid_123827-28559.jpg",
            "https://img.freepik.com/free-photo/blue-liquid-scientific-bottle_123827-28560.jpg",
        ],
        attributes: {
            MOQ: "75 Litres",
            Type: "Kerosene",
            Application: "Heating",
            City: "Delhi",
            Odor: "Low",
        },
    },
    {
        title: "Eco Kerosene with Clean Burn",
        price: 70,
        unit: "Litre",
        city: "Hyderabad",
        images: [
            "https://img.freepik.com/free-photo/clean-liquid-clear-bottle_123827-28564.jpg",
            "https://img.freepik.com/free-photo/chemical-clean-burning-fuel_123827-28565.jpg",
            "https://img.freepik.com/free-photo/eco-liquid-laboratory-glassware_123827-28566.jpg",
        ],
        attributes: {
            MOQ: "120 Litres",
            Type: "Kerosene",
            Application: "Eco Burn",
            City: "Hyderabad",
            Feature: "Low Emission",
        },
    },
    {
        title: "Refined Kerosene for Generators",
        price: 52,
        unit: "Litre",
        city: "Ahmedabad",
        images: [
            "https://img.freepik.com/free-photo/refined-fuel-liquid-generator_123827-28567.jpg",
            "https://img.freepik.com/free-photo/clear-liquid-in-lab-bottle_123827-28568.jpg",
            "https://img.freepik.com/free-photo/fuel-glass-container-generator-use_123827-28569.jpg",
        ],
        attributes: {
            MOQ: "90 Litres",
            Type: "Kerosene",
            Application: "Generators",
            City: "Ahmedabad",
            Grade: "Refined",
        },
    },
    {
        title: "High-Performance Kerosene for Aviation",
        price: 95,
        unit: "Litre",
        city: "Bangalore",
        images: [
            "https://img.freepik.com/free-photo/aviation-fuel-glass-container_123827-28570.jpg",
            "https://img.freepik.com/free-photo/kerosene-liquid-aviation-grade_123827-28571.jpg",
            "https://img.freepik.com/free-photo/high-purity-fuel-clear-glass_123827-28572.jpg",
        ],
        attributes: {
            MOQ: "200 Litres",
            Type: "Kerosene",
            Application: "Aviation",
            City: "Bangalore",
            Grade: "Aviation",
        },
    },
];

const ProductListPage = () => {
    const { deepSubCategory } = useParams();
    console.log(deepSubCategory,"deepSubCategory");
    
    const [selectedCategory, setSelectedCategory] = useState("White Kerosene");
    const [searchLocation, setSearchLocation] = useState("");
    const [nearMe, setNearMe] = useState(false);
    const [selectedCity, setSelectedCity] = useState("");
    const [viewType, setViewType] = useState("list");
    const cities = ["Navi Mumbai", "Pune", "Delhi", "Ahmedabad", "Chennai"];

    return (
        <div className="container mx-auto p-4">
            {/* Header */}
            <h1 className="text-2xl font-bold mb-4">
                {selectedCategory} ({sampleProducts.length} Products Available)
            </h1>

            {/* Filter */}
            <FilterHeader
                searchLocation={searchLocation}
                onSearchLocationChange={setSearchLocation}
                nearMe={nearMe}
                onNearMeToggle={() => setNearMe(!nearMe)}
                selectedCity={selectedCity}
                onCityChange={setSelectedCity}
                cities={cities}
            />

            {/* Layout */}
            <div className="flex gap-4">
                {/* Sidebar */}
                <Sidebar
                    categories={deepSubCategories}
                    selected={selectedCategory}
                    onSelect={setSelectedCategory}
                />

                {/* Product list */}
                <div className="flex-1">
                    {/* View Toggle */}
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => setViewType("list")}
                            className={`px-3 py-1 border flex gap-3 cursor-pointer items-center rounded-l ${viewType === "list" ? "bg-gray-200" : ""}`}
                        >

                            <LayoutGrid className="w-3 h-3" />  <span >List</span>

                        </button>
                        <button
                            onClick={() => setViewType("grid")}
                            className={`px-3 py-1 border cursor-pointer flex gap-3 items-center rounded-r ${viewType === "grid" ? "bg-gray-200" : ""}`}
                        >
                            <AlignLeft className="w-3 h-3" /> <span> Grid</span>
                        </button>
                    </div>
                    {/* Explore by Product Section */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-4">Explore by Product</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {deepSubCategories.slice(0, 5).map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedCategory(item.label)}
                                    className={`cursor-pointer flex gap-2 items-center border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 ${selectedCategory === item.label ? "ring-2 ring-[#e03733]" : ""
                                        }`}
                                >
                                    <img
                                        src={item.deep_sub_category_image}
                                        alt={item.label}
                                        className=" h-20 w-20 object-cover border-2 p-1"
                                    />
                                    <div className="p-2  text-sm font-medium">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product List */}
                    <div className={viewType === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-6"}>
                        {sampleProducts.map((product, idx) => (
                            <ProductCard key={idx} product={product} viewType={viewType} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListPage;
