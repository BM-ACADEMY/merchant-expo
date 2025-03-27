import React, { useState, useEffect } from "react";
import axios from "axios";
import MultiStepModal from "./addmerchant";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const useSidebar = () => {
  return { isSidebarOpen: false }; // Mock
};

const MerchantList = () => {
  const { isSidebarOpen } = useSidebar();
  const [searchTerm, setSearchTerm] = useState("");
  const [merchants, setMerchants] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await axios.get("/api/fetch-all-merchants");
        setMerchants(Array.isArray(response.data) ? response.data : []);
        setError(null);
      } catch (error) {
        console.error("Error fetching merchants:", error);
        setError("Failed to fetch merchants. Please try again.");
      }
    };
    fetchMerchants();
  }, []);

  const handleAddMerchant = async (formData) => {
    try {
      const response = await axios.post("/api/create-merchant", formData);
      setMerchants([...merchants, response.data]);
      setError(null);
    } catch (error) {
      console.error("Error adding merchant:", error);
      setError("Failed to add merchant. Please try again.");
    }
  };

  const handleDeleteMerchant = async (merchantId) => {
    try {
      await axios.delete(`/api/delete-merchant/${merchantId}`);
      setMerchants(merchants.filter((merchant) => merchant._id !== merchantId));
      setError(null);
    } catch (error) {
      console.error("Error deleting merchant:", error);
      setError("Failed to delete merchant. Please try again.");
    }
  };

  const filteredMerchants = merchants.filter((merchant) =>
    merchant.company_name
      ? merchant.company_name.toLowerCase().includes(searchTerm.toLowerCase())
      : false
  );

  if (error) {
    return (
      <div className="p-4 text-red-500">
        {error} <button onClick={() => setError(null)}>Retry</button>
      </div>
    );
  }

  return (
    <div className={`${isSidebarOpen ? "p-6 lg:ml-56" : "p-4 lg:ml-16"}`}>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search Merchant..."
          className="w-72"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-[#e03733] hover:bg-[#c0302c] text-white transition-all"
        >
          <PlusCircle className="w-4 h-4 mr-2" /> Add Merchant
        </Button>
      </div>

      <MultiStepModal
        onSubmit={handleAddMerchant}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>GST</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMerchants.length > 0 ? (
              filteredMerchants.map((merchant, index) => (
                <TableRow key={merchant._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{merchant.company_name}</TableCell>
                  <TableCell>{merchant.email}</TableCell>
                  <TableCell>{merchant.phone_number}</TableCell>
                  <TableCell>{merchant.company_type}</TableCell>
                  <TableCell>
                    {merchant.verified_status ? "Verified" : "Not Verified"}
                  </TableCell>
                  <TableCell>{merchant.gst_number}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="w-5 h-5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteMerchant(merchant._id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No merchants added yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MerchantList;