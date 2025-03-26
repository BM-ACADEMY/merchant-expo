import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSidebar } from "../../hooks/useSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const MerchantList = () => {
  const { isSidebarOpen } = useSidebar();
  const [searchTerm, setSearchTerm] = useState("");
  const [merchants, setMerchants] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [newMerchant, setNewMerchant] = useState({
    user_id: "",
    email: "",
    phone_number: "",
    company_name: "",
    identifier_type: "",
    identifier_value: "",
    company_type: "",
    company_logo: null,
    company_images: [],
    identifier_image: null
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const merchantRes = await axios.get("/api/merchants");
        setMerchants(Array.isArray(merchantRes.data) ? merchantRes.data : []);
      } catch (error) {
        console.error("Error fetching merchants:", error);
        setMerchants([]);
      }
    }
    fetchData();
  }, []);

  const handleAddMerchant = async () => {
    try {
      await axios.post("/api/merchants", newMerchant);
      setMerchants([...merchants, newMerchant]);
      setNewMerchant({
        user_id: "",
        email: "",
        phone_number: "",
        company_name: "",
        identifier_type: "",
        identifier_value: "",
        company_type: "",
        company_logo: null,
        company_images: [],
        identifier_image: null
      });
      setImagePreview(null);
    } catch (error) {
      console.error("Error adding merchant:", error);
    }
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setNewMerchant({ ...newMerchant, [field]: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

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
        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-auto flex items-center bg-[#e03733] hover:shadow-lg text-white">
              <PlusCircle className="w-4 h-4 mr-2" /> Add Merchant
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Merchant</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <Label>User ID</Label>
              <Input
                placeholder="User ID"
                value={newMerchant.user_id}
                onChange={(e) => setNewMerchant({ ...newMerchant, user_id: e.target.value })}
              />

              <Label>Email</Label>
              <Input
                placeholder="Email"
                value={newMerchant.email}
                onChange={(e) => setNewMerchant({ ...newMerchant, email: e.target.value })}
              />

              <Label>Phone Number</Label>
              <Input
                placeholder="Phone Number"
                value={newMerchant.phone_number}
                onChange={(e) => setNewMerchant({ ...newMerchant, phone_number: e.target.value })}
              />

              <Label>Company Name</Label>
              <Input
                placeholder="Company Name"
                value={newMerchant.company_name}
                onChange={(e) => setNewMerchant({ ...newMerchant, company_name: e.target.value })}
              />

              <Label>Identifier Type</Label>
              <Select onValueChange={(value) => setNewMerchant({ ...newMerchant, identifier_type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Identifier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="msme_certificate_number">MSME Certificate Number</SelectItem>
                  <SelectItem value="gst_number">GST Number</SelectItem>
                  <SelectItem value="pan">PAN</SelectItem>
                </SelectContent>
              </Select>

              <Label>{`Enter ${newMerchant.identifier_type.replace("_", " ")}`}</Label>
              <Input
                value={newMerchant.identifier_value}
                onChange={(e) => setNewMerchant({ ...newMerchant, identifier_value: e.target.value })}
              />

              <Label>Company Type</Label>
              <Select onValueChange={(value) => setNewMerchant({ ...newMerchant, company_type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Company Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Retailer">Retailer</SelectItem>
                  <SelectItem value="Manufacturer">Manufacturer</SelectItem>
                  <SelectItem value="Sub-dealer">Sub-dealer</SelectItem>
                </SelectContent>
              </Select>

              <Label>Company Logo</Label>
              <Input type="file" onChange={(e) => handleImageChange(e, "company_logo")} />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Company Logo Preview"
                  className="w-16 h-16 mt-2 cursor-pointer rounded-lg"
                  onClick={() => window.open(imagePreview)}
                />
              )}

              <Label>Company Images (Up to 5)</Label>
              <Input
                type="file"
                multiple
                onChange={(e) => setNewMerchant({ ...newMerchant, company_images: Array.from(e.target.files) })}
              />

              <Button className="mt-4" onClick={handleAddMerchant}>
                Add Merchant
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Company Type</TableHead>
            <TableHead className="text-right">More</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {merchants.map((merchant) => (
            <TableRow key={merchant.user_id}>
              <TableCell>{merchant.user_id || "N/A"}</TableCell>
              <TableCell>{merchant.email || "N/A"}</TableCell>
              <TableCell>{merchant.phone_number || "N/A"}</TableCell>
              <TableCell>{merchant.company_name || "N/A"}</TableCell>
              <TableCell>{merchant.company_type || "N/A"}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MerchantList;
