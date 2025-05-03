import { Link ,useNavigate} from "react-router-dom";
import { useState,useContext } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  PhoneCall,
  ChevronDown,
  LogIn,
  UserPlus,
  UserCircle,
  Search,
  Mic,
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import logo from "@/assets/images/merchant-expo-logo.png";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

import { AuthContext } from "@/modules/landing/context/AuthContext";


const Header = () => {
  // const [user, setUser] = useState(null); // Replace with auth state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("products");
  const { user, logout } = useContext(AuthContext);
  console.log(user?.user?.role?.role,'login page user');
  
  const navigate = useNavigate();

  const handleNavigate = (type) => {
    navigate(type === "login" ? "/login" : "/register");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getDashboardLink = () => {
    if (!user || !user?.user?.role) return null;

    const roleRoutes = {
      ADMIN: "/admin",
      MERCHANT: "/merchant",
      SERVICE_PROVIDER: "/serviceProvider",
      SUB_DEALER: "/sub-dealer-dashboard",
      GROCERY_SELLER: "/grocerySeller",
      STUDENT: "/student",
      USER: "/user",
      SUB_ADMIN: "/subAdmin",
    };

    return roleRoutes[user?.user?.role?.role] || null;
  };
  // Dynamic placeholder based on selection
  const placeholderText = {
    products: "Search for products / services...",
    suppliers: "Search for suppliers...",
    buyers: "Search for buyers..."
  };



  return (
    <header className=" flex flex-col  ">
      <div className="text-white bg-white p-1 flex  justify-evenly items-center sticky top-0 z-50">
        {/* Left: Welcome User / Login & Join Free */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative group">
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar>
                  <AvatarImage src={user.avatar || "https://via.placeholder.com/40"} alt="User" />
                  <AvatarFallback>
                    <UserCircle className="w-8 h-8" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">Welcome, {user.name}</span>
                <ChevronDown className="w-4 h-4" />
              </div>

              {/* Dropdown Menu */}
              <div className="absolute left-0 mt-2 bg-white text-black shadow-md w-48 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200">
                {getDashboardLink() && (
                  <DropdownItem to={getDashboardLink()} label="Dashboard" />
                )}
                <DropdownItem to="/profile" label="Profile" />
                <DropdownItem to="/settings" label="Settings" />
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Button className="bg-[#e03733] hover:shadow-lg text-white py-2 rounded-md" onClick={() => handleNavigate("login")}>
                <LogIn className="w-4 h-4" /> Login
              </Button>
              <Button className="bg-yellow-500 text-white flex items-center gap-1" onClick={() => handleNavigate("register")}>
                <UserPlus className="w-4 h-4" /> Join Free
              </Button>
            </>
          )}
        </div>

        {/* Center: Phone Numbers */}
        <div className="text-center flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-yellow-400" />
          <p className="text-sm text-[#1C1B1F]">+1 234 567 8900 | +1 987 654 3210</p>
        </div>

        {/* Right: Hover Dropdown Menus */}
        <div className="flex items-center gap-6 text-[#1C1B1F]">
          <Dropdown
            title="For Buyer"
            options={[
              "How to Buy",
              "Buyer Guide",
              "Secure Payment",
              "Customer Support",
              "FAQs",
            ]}
          />
          <Dropdown
            title="For Seller"
            options={[
              "Sell on Platform",
              "Seller Guide",
              "Marketing Tools",
              "Shipping Help",
              "Seller Support",
            ]}
          />
          <Dropdown
            title="Help"
    
            options={[
              "Contact Us",
              "Report an Issue",
              "Terms & Conditions",
              "Privacy Policy",
              "Refund Policy",
            ]}
          />
        </div>
      </div>
  
      <div
        className="flex items-center justify-between p-4 bg-[#1C1B1F] shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* 🔹 Logo Section */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-20" />
         
        </div>

        {/* 🔹 Search Box */}
        <motion.div
          className="flex items-center border rounded-full border-[#1C1B1F] overflow-hidden w-1/2 bg-white"
          whileHover={{ scale: 1.02 }}
        >
              <Select onValueChange={(value) => setSelectedCategory(value)}>
        <SelectTrigger className="px-3 py-2 bg-white border-r text-gray-700">
          <SelectValue placeholder="Products / Services" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="products">Products / Services</SelectItem>
          <SelectItem value="suppliers">Suppliers</SelectItem>
          <SelectItem value="buyers">Buyers</SelectItem>
        </SelectContent>
      </Select>

      {/* Search Input */}
      <Input
        type="text"
        placeholder={placeholderText[selectedCategory]} // Dynamically set placeholder
        className="flex-grow px-3 py-2 outline-none border-none focus:ring-0 focus:border-transparent border-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Mic Icon */}
      <Mic className="text-gray-500 mx-3 cursor-pointer" />

      {/* Search Button */}
      <Button className="px-5 py-2 bg-yellow-500 text-white font-semibold cursor-pointer">
        Search
      </Button>

        </motion.div>

        {/* 🔹 "Post Buy Requirement" Button */}
        <motion.div whileHover={{ scale: 1.1 }}>
          <Button className="px-5 py-2 bg-red-600 text-white font-semibold rounded-full cursor-pointer">
            Post Buy Requirement
          </Button>
        </motion.div>
      </div>
    </header>
  );
};

// Dropdown using Hover Effect
const Dropdown = ({ title, options }) => {
  return (
    <div className="relative group">
      <div className="hover:text-[#e03733] transition flex items-center gap-1 cursor-pointer">
        {title} <ChevronDown className="w-4 h-4" />
      </div>
      {/* Hover dropdown */}
      <div className="absolute left-0 mt-2 bg-white text-black shadow-md w-48 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200">
        {options.map((option, index) => (
          <DropdownItem
            key={index}
            to={`/${option.toLowerCase().replace(/\s+/g, "-")}`}
            label={option}
          />
        ))}
      </div>
    </div>
  );
};

// Reusable Dropdown Item
const DropdownItem = ({ to, label }) => {
  return (
    <Link to={to} className="block px-4 py-2 hover:bg-gray-100">
      {label}
    </Link>
  );
};

export default Header;
