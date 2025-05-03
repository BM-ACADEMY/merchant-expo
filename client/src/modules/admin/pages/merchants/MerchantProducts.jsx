
import React, { useState } from "react";
import { useSidebar } from "../../hooks/useSidebar";
import MerchantProductForm from "./forms/MerchantProductForm";
import {
  useLazyGetMerchantByEmailOrPhoneQuery,

} from "@/redux/api/ProductApi";
import { useMerchant } from "@/modules/admin/context/MerchantContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MerchantProductListing from "./pages/MerchantProductList";



const MerchantProducts = () => {
  const { isSidebarOpen } = useSidebar();
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [fetchMerchant, { isLoading }] =
    useLazyGetMerchantByEmailOrPhoneQuery();

  const { selectedMerchant, setSelectedMerchant } = useMerchant();
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setError(null);

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setSelectedMerchant(null);
      setShowForm(false);
      setError("Please enter a valid email address");
      return;
    }

    try {
      const res = await fetchMerchant(email).unwrap();
      if (res.users && res.users.length > 0) {
        setSelectedMerchant(res.users[0]);
        setShowForm(true);
        setEmail("");
      } else {
        setSelectedMerchant(null);
        setShowForm(false);
        setError("Merchant not found");
      }
    } catch (err) {
      setSelectedMerchant(null);
      setShowForm(false);
      setError("Error fetching merchant");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    console.log(product, "selected product");
  };
  const handleDelete = (productId) => {
    console.log(productId, "selected product id");
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "p-6 lg:ml-56" : "p-4 lg:ml-16"
      } flex flex-col justify-center items-center w-full`}
    >
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-xl font-bold">Add Merchant Product</h2>
      </div>
      <div className="flex  gap-4">
        <div>
          {/* Search Input */}
          <div className="flex flex-col lg:flex-row justify-center items-center gap-6 mb-4">
            {/* Left-side Note */}
            <div className="max-w-sm text-gray-700 text-sm bg-yellow-50 border border-yellow-200 p-4 rounded-md shadow-sm">
              <p className="font-medium text-yellow-800 mb-1">Note:</p>
              <p>
                Do you want to add a merchant product?
                <br />
                First, select the merchant by entering their email.
              </p>
            </div>

            {/* Right-side Input + Button */}
            <div className="flex gap-2 items-center justify-center w-full max-w-md">
              <Input
                type="text"
                placeholder="Enter merchant email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="border px-4 py-2 rounded-md w-full"
              />
              <Button onClick={handleSearch}>
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          {/* Merchant Card */}
          {showForm && selectedMerchant && (
            <div className="max-w-md  mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">
                      Selected Merchant Info
                    </p>
                    <div className="text-lg font-semibold">
                      {selectedMerchant.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {selectedMerchant.email}
                    </div>
                    <div className="text-sm text-gray-600">
                      {selectedMerchant.phone}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Product Form */}
          {showForm && <MerchantProductForm editingProduct={editingProduct} />}
        </div>
        <div className="w-1 rounded-r-sm bg-[#1C1B1F]"></div>
        {showForm && (
          <div>
            <MerchantProductListing
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>
     
    </div>
  );
};


export default MerchantProducts;
