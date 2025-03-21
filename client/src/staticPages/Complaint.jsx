import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const ComplaintForm = () => {
  const [complaintType, setComplaintType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    productDetails: "",
    complaintDescription: "",
    iprType: "",
    brandName: "",
    attachment: null,
    courtOrder: "",
    infringingUrls: "",
    youAre: "",
    agreement: false,
    buyerName: "",
    buyerMobile: "",
    productName: "",
    supplierName: "",
    supplierMobile: "",
    supplierProductName: "",
    attachment1: null,
    attachment2: null,
  });
  const [charCount, setCharCount] = useState(3000);
  const [error, setError] = useState("");

  const complaintOptions = [
    "Issue with BuyLead/Inquiry",
    "Account Activation and Deactivation",
    "Account Related",
    "IPR Dispute",
    "Complaint of Buyer",
    "Complaint of Supplier",
    "Others",
  ];

  const iprOptions = [
    "Trademark Infringement",
    "Copyright Violation",
    "Patent Infringement",
    "Design Concern",
    "Trade Secret Theft",
  ];

  const courtOrderOptions = ["Yes", "No"];

  const handleComplaintTypeChange = (value) => {
    setComplaintType(value);
    setFormData({
      name: "",
      email: "",
      productDetails: "",
      complaintDescription: "",
      iprType: "",
      brandName: "",
      attachment: null,
      courtOrder: "",
      infringingUrls: "",
      youAre: "",
      agreement: false,
      buyerName: "",
      buyerMobile: "",
      productName: "",
      supplierName: "",
      supplierMobile: "",
      supplierProductName: "",
      attachment1: null,
      attachment2: null,
    });
    setCharCount(3000);
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      if (name === "complaintDescription") {
        if (value.length <= 3000) {
          setFormData({ ...formData, [name]: value });
          setCharCount(3000 - value.length);

          if (value.length < 30) {
            setError("Complaint description must be at least 30 characters.");
          } else {
            setError("");
          }
        }
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="text-blue-500">Merchant Expo</span>{" "}
            <span className="text-red-500">Complaint Form</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-500 mb-2">
            <a href="/" className="text-grey-600">Home</a> / <a href="/" className="text-[#E33831]">Complaint Form</a>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Please select the appropriate complaint type and provide the necessary details below.
          </p>

          <Label className="block mb-1">Select Complaint Type</Label>
          <Select onValueChange={handleComplaintTypeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="-- Select Complaint Type --" />
            </SelectTrigger>
            <SelectContent>
              {complaintOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {complaintType && (
            <div className="space-y-3 mt-4">
              <Input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              {complaintType === "IPR Dispute" && (
                <>
                  <Label>IPR Complaints for *</Label>
                  <Select
                    name="iprType"
                    value={formData.iprType}
                    onValueChange={(value) => handleInputChange({
                      target: { name: "iprType", value },
                    })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="-- Select --" />
                    </SelectTrigger>
                    <SelectContent>
                      {iprOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    type="text"
                    name="brandName"
                    placeholder="Your Brand Name *"
                    value={formData.brandName}
                    onChange={handleInputChange}
                    required
                  />

                  <Label>Related Attachment *</Label>
                  <Input
                    type="file"
                    name="attachment"
                    onChange={handleInputChange}
                    required
                  />

                  <Label>Do you have a court order? *</Label>
                  <Select
                    name="courtOrder"
                    value={formData.courtOrder}
                    onValueChange={(value) => handleInputChange({
                      target: { name: "courtOrder", value },
                    })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="-- Select --" />
                    </SelectTrigger>
                    <SelectContent>
                      {courtOrderOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Textarea
                    name="infringingUrls"
                    placeholder="Infringing content URL(s) *"
                    value={formData.infringingUrls}
                    onChange={handleInputChange}
                    required
                  />

                  <Input
                    type="text"
                    name="youAre"
                    placeholder="You are *"
                    value={formData.youAre}
                    onChange={handleInputChange}
                    required
                  />
                </>
              )}

              <Textarea
                name="complaintDescription"
                placeholder="Describe your complaint (Min: 30, Max: 3000 characters) *"
                value={formData.complaintDescription}
                onChange={handleInputChange}
                required
              />
              <p className="text-sm text-gray-600">
                Characters remaining: {charCount}
              </p>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          )}

          <Button className="w-full bg-[#e03733] hover:shadow-lg text-white py-2 rounded-md">
            Submit Complaint
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplaintForm;
