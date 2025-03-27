import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MultiStepModal = ({ onSubmit, open, onOpenChange }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    user_id: "",
    name: "",
    email: "",
    phone_number: "",
    address: {
      address_type: "",
      address_line_1: "",
      address_line_2: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    company: {
      company_name: "",
      company_type: "",
      verification_type: "",
      verification_number: "",
    },
    company_logo: null,
    company_images: [],
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const initialFormData = {
    user_id: "",
    name: "",
    email: "",
    phone_number: "",
    address: {
      address_type: "",
      address_line_1: "",
      address_line_2: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    company: {
      company_name: "",
      company_type: "",
      verification_type: "",
      verification_number: "",
    },
    company_logo: null,
    company_images: [],
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      if (selectedImage) URL.revokeObjectURL(selectedImage);
    };
  }, [imagePreview, selectedImage]);

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setStep(1);
    setImagePreview(null);
    setSelectedImage(null);
  };

  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      resetForm();
    }
    onOpenChange(isOpen);
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.user_id) newErrors.user_id = "User ID is required";
      if (!formData.name) newErrors.name = "Name is required";
      
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      
      if (!formData.phone_number) {
        newErrors.phone_number = "Phone number is required";
      } else if (!/^\+?\d{10,15}$/.test(formData.phone_number)) {
        newErrors.phone_number = "Please enter a valid phone number (10-15 digits)";
      }
    }
    
    if (step === 2) {
      if (!formData.address.address_type) newErrors.address_type = "Address type is required";
      if (!formData.address.address_line_1) newErrors.address_line_1 = "Address Line 1 is required";
      if (!formData.address.city) newErrors.city = "City is required";
      if (!formData.address.state) newErrors.state = "State is required";
      if (!formData.address.country) newErrors.country = "Country is required";
      if (!formData.address.pincode) newErrors.pincode = "Pincode is required";
    }
    
    if (step === 3) {
      if (!formData.company.company_name) newErrors.company_name = "Company name is required";
      if (!formData.company.company_type) newErrors.company_type = "Company type is required";
      if (!formData.company.verification_type) newErrors.verification_type = "Verification type is required";
      if (!formData.company.verification_number) newErrors.verification_number = "Verification number is required";
    }
    
    if (step === 4) {
      if (!formData.company_logo) newErrors.company_logo = "Company logo is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep() && step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else handleOpenChange(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: { ...formData.address, [name]: value },
    });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      company: { ...formData.company, [name]: value },
    });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleSelectChange = (field, subField, value) => {
    if (field === "address") {
      setFormData({
        ...formData,
        address: { ...formData.address, [subField]: value },
      });
      if (errors[subField]) setErrors({ ...errors, [subField]: null });
    } else if (field === "company") {
      setFormData({
        ...formData,
        company: { ...formData.company, [subField]: value },
      });
      if (errors[subField]) setErrors({ ...errors, [subField]: null });
    }
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, [field]: file });
      setImagePreview(previewUrl);
      if (errors[field]) setErrors({ ...errors, [field]: null });
    }
  };

  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5 - formData.company_images.length);
    setFormData({
      ...formData,
      company_images: [...formData.company_images, ...files],
    });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formData.company_images];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, company_images: updatedImages });
  };

  const handleImageClick = (file) => {
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    if (validateStep()) {
      onSubmit(formData);
      resetForm();
      handleOpenChange(false);
    }
  };

  const getVerificationNumberLabel = () => {
    switch (formData.company.verification_type) {
      case "pan": return "PAN Number";
      case "msme": return "MSME Certificate Number";
      case "gst": return "GST Number";
      default: return "Verification Number";
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-lg shadow-xl sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            Add New Merchant
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-between mb-6">
          {["Basic", "Address", "Company", "Images"].map((label, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                  step === idx + 1 ? "bg-gray-800" : "bg-gray-300"
                }`}
              >
                {idx + 1}
              </div>
              <span
                className={`mt-2 text-sm ${step === idx + 1 ? "font-bold text-gray-800" : "text-gray-500"}`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label className="text-gray-700">User ID</Label>
              <Input
                name="user_id"
                placeholder="User ID"
                value={formData.user_id}
                onChange={handleInputChange}
                className="border-gray-300 focus:ring-2 focus:ring-[#e03733]"
              />
              {errors.user_id && <p className="text-red-500 text-sm">{errors.user_id}</p>}
            </div>
            <div>
              <Label className="text-gray-700">Name</Label>
              <Input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="border-gray-300 focus:ring-2 focus:ring-[#e03733]"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <Label className="text-gray-700">Email</Label>
              <Input
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="border-gray-300 focus:ring-2 focus:ring-[#e03733]"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <Label className="text-gray-700">Phone Number</Label>
              <Input
                name="phone_number"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="border-gray-300 focus:ring-2 focus:ring-[#e03733]"
              />
              {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}
            </div>
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => handleOpenChange(false)}
                className="w-24 border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleNext}
                className="w-24 bg-[#e03733] hover:bg-[#c0302c] text-white"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label className="text-gray-700">Address Type</Label>
              <Select
                onValueChange={(value) => handleSelectChange("address", "address_type", value)}
                value={formData.address.address_type}
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select Address Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                </SelectContent>
              </Select>
              {errors.address_type && <p className="text-red-500 text-sm">{errors.address_type}</p>}
            </div>
            <div>
              <Label className="text-gray-700">Address Line 1</Label>
              <Input
                name="address_line_1"
                placeholder="Address Line 1"
                value={formData.address.address_line_1}
                onChange={handleAddressChange}
                className="border-gray-300 focus:ring-2 focus:ring-[#e03733]"
              />
              {errors.address_line_1 && <p className="text-red-500 text-sm">{errors.address_line_1}</p>}
            </div>
            <div>
              <Label className="text-gray-700">Address Line 2</Label>
              <Input
                name="address_line_2"
                placeholder="Address Line 2 (Optional)"
                value={formData.address.address_line_2}
                onChange={handleAddressChange}
                className="border-gray-300 focus:ring-2 focus:ring-[#e03733]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-700">City</Label>
                <Input
                  name="city"
                  placeholder="City"
                  value={formData.address.city}
                  onChange={handleAddressChange}
                  className="border-gray-300 focus:ring-2 focus:ring-[#e03733]"
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
              </div>
              <div>
                <Label className="text-gray-700">State</Label>
                <Input
                  name="state"
                  placeholder="State"
                  value={formData.address.state}
                  onChange={handleAddressChange}
                  className="border-gray-300 focus:ring-2 focus:ring-[#e03733]"
                />
                {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-700">Country</Label>
                <Input
                  name="country"
                  placeholder="Country"
                  value={formData.address.country}
                  onChange={handleAddressChange}
                  className="border-gray-300 focus:ring-2 focus:ring-[#e03733]"
                />
                {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
              </div>
              <div>
                <Label className="text-gray-700">Pincode</Label>
                <Input
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.address.pincode}
                  onChange={handleAddressChange}
                  className="border-gray-300 focus:ring-2 focus:ring-[#e03733]"
                />
                {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <Button
                variant="outline"
                onClick={handleBack}
                className="w-24 border-gray-300"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                className="w-24 bg-[#e03733] hover:bg-[#c0302c] text-white"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <Label className="text-gray-700">Company Name</Label>
              <Input
                name="company_name"
                placeholder="Company Name"
                value={formData.company.company_name}
                onChange={handleCompanyChange}
                className="border-gray-300 focus:ring-2 focus:ring-[#e03733]"
              />
              {errors.company_name && <p className="text-red-500 text-sm">{errors.company_name}</p>}
            </div>
            <div>
              <Label className="text-gray-700">Company Type</Label>
              <Select
                onValueChange={(value) => handleSelectChange("company", "company_type", value)}
                value={formData.company.company_type}
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select Company Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retailer">Retailer</SelectItem>
                  <SelectItem value="manufacturer">Manufacturer</SelectItem>
                  <SelectItem value="sub_dealer">Sub-dealer</SelectItem>
                </SelectContent>
              </Select>
              {errors.company_type && <p className="text-red-500 text-sm">{errors.company_type}</p>}
            </div>
            <div>
              <Label className="text-gray-700">Verification Certificate Type</Label>
              <Select
                onValueChange={(value) => handleSelectChange("company", "verification_type", value)}
                value={formData.company.verification_type}
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select Verification Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pan">PAN</SelectItem>
                  <SelectItem value="msme">MSME Certificate</SelectItem>
                  <SelectItem value="gst">GST Number</SelectItem>
                </SelectContent>
              </Select>
              {errors.verification_type && <p className="text-red-500 text-sm">{errors.verification_type}</p>}
            </div>
            <div>
              <Label className="text-gray-700">{getVerificationNumberLabel()}</Label>
              <Input
                name="verification_number"
                placeholder={getVerificationNumberLabel()}
                value={formData.company.verification_number}
                onChange={handleCompanyChange}
                className="border-gray-300 focus:ring-2 focus:ring-[#e03733]"
              />
              {errors.verification_number && <p className="text-red-500 text-sm">{errors.verification_number}</p>}
            </div>
            <div className="flex justify-between gap-4">
              <Button
                variant="outline"
                onClick={handleBack}
                className="w-24 border-gray-300"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                className="w-24 bg-[#e03733] hover:bg-[#c0302c] text-white"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div>
              <Label className="text-gray-700">Company Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "company_logo")}
                className="border-gray-300"
              />
              {errors.company_logo && <p className="text-red-500 text-sm">{errors.company_logo}</p>}
              {imagePreview && (
                <div className="mt-2 relative group">
                  <img
                    src={imagePreview}
                    alt="Company Logo Preview"
                    className="w-20 h-20 object-cover rounded-lg border shadow-sm cursor-pointer hover:opacity-80"
                    onClick={() => handleImageClick(formData.company_logo)}
                  />
                </div>
              )}
            </div>
            <div>
              <Label className="text-gray-700">Company Images (Up to 5)</Label>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => document.getElementById("companyImagesInput").click()}
                  disabled={formData.company_images.length >= 5}
                  className={`bg-[#e03733] hover:bg-[#c0302c] text-white ${
                    formData.company_images.length >= 5 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Add Images
                </Button>
                <span className="text-sm text-gray-500">
                  {`${formData.company_images.length}/5 images uploaded`}
                </span>
              </div>
              <Input
                id="companyImagesInput"
                type="file"
                multiple
                accept="image/*"
                onChange={handleMultipleImagesChange}
                className="hidden"
              />
              <div className="flex flex-wrap gap-4 mt-2">
                {formData.company_images.map((file, index) => {
                  const previewUrl = URL.createObjectURL(file);
                  return (
                    <div key={index} className="relative group">
                      <img
                        src={previewUrl}
                        alt={`Preview ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg border shadow-sm cursor-pointer hover:opacity-80"
                        onClick={() => handleImageClick(file)}
                        onLoad={() => URL.revokeObjectURL(previewUrl)}
                      />
                      <Button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0 p-1 text-xs text-white bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        X
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <Button
                variant="outline"
                onClick={handleBack}
                className="w-24 border-gray-300"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="w-24 bg-[#e03733] hover:bg-[#c0302c] text-white"
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </DialogContent>

      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0">
            <img
              src={selectedImage}
              alt="Full size preview"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <Button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white"
            >
              Close
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
};

export default MultiStepModal;