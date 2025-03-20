import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, User, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/assets/images/EasyColllll.png"; 

const Help = () => {
  return (
    <div>
 <div className="w-full min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <div>
          <img src={Logo} alt="Logo" className="h-10" />
        </div>
        <div className="space-x-6">
          <Link to="#" className="text-gray-700 hover:text-purple-600">Home</Link>
          <Link to="#" className="text-gray-700 hover:text-purple-600">About</Link>
          <Link to="#" className="text-gray-700 hover:text-purple-600">Contact</Link>
        </div>
      </nav>

      {/* Search Box */}
      <div className="flex justify-center py-6">
        <div className="flex w-1/2 border border-gray-300 rounded-lg overflow-hidden">
          <div className="relative flex-grow justify-center items-center">
            <Search className="absolute left-3 top-3 text-gray-500" size={20} />
            <Input className="w-full pl-10" placeholder="Search..." />
          </div>
          <Button className="px-6">Search</Button>
        </div>
      </div>

      {/* FAQ Cards */}
      <div className="flex justify-center gap-6 py-10">
        {/* Buyer FAQ Card */}
        <Card className="w-80 shadow-lg">
          <CardHeader className="flex items-center gap-2">
            <User className="text-purple-600" size={32} />
            <CardTitle>Buyer FAQ</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Find answers to common buyer questions about purchases, payments, and shipping.</p>
            <Link to="/buyerFaq">
              <Button className="mt-4" variant="outline">Know More</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Seller FAQ Card */}
        <Card className="w-80 shadow-lg">
          <CardHeader className="flex items-center gap-2">
            <ShoppingCart className="text-purple-600" size={32} />
            <CardTitle>Seller FAQ</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Learn about listing products, managing orders, and payment processing.</p>
            <Link to="/sellerPage">
              <Button className="mt-4" variant="outline">Know More</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
};

export default Help;
