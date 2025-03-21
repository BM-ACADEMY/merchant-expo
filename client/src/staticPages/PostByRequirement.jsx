import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";
import { Clock, ListChecks, ShoppingBag, X } from "lucide-react";

const states = ["Chhattisgarh", "Assam", "Bihar", "Arunachal Pradesh"];

export default function PostRequirement() {
  const [formData, setFormData] = useState({
    productService: "",
    quantity: "",
    unit: "",
    phoneNumber: "",
    country: { label: "India (+91)", value: "+91", code: "IN" },
    supplierPreference: "All India",
    selectedStates: [],
  });

  const [phoneError, setPhoneError] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const countryOptions = countryList()
    .getData()
    .map((country) => ({
      label: `${country.label} (${country.value})`,
      value: country.value,
      code: country.value.replace("+", ""),
    }));

  const handleCountryChange = (selectedCountry) => {
    if (formData.country.value !== selectedCountry.value) {
      setFormData((prev) => ({
        ...prev,
        country: selectedCountry,
        phoneNumber: "",
      }));
    }
  };

  const handlePhoneNumberChange = (value) => {
    setFormData((prev) => ({ ...prev, phoneNumber: value }));

    if (value) {
      if (!isValidPhoneNumber(value, formData.country.code)) {
        setPhoneError("Invalid phone number for selected country.");
      } else {
        setPhoneError("");
      }
    }
  };
  const removeState = (stateToRemove) => {
    setFormData((prev) => ({
      ...prev,
      selectedStates: prev.selectedStates.filter((state) => state !== stateToRemove),
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.productService.trim())
      errors.productService = "Product/Service is required.";
    if (!formData.quantity.trim()) errors.quantity = "Quantity is required.";
    if (!formData.unit.trim()) errors.unit = "Unit is required.";
    if (!formData.phoneNumber.trim())
      errors.phoneNumber = "Phone number is required.";
    if (!isValidPhoneNumber(formData.phoneNumber, formData.country.code))
      errors.phoneNumber = "Invalid phone number.";

    if (
      formData.supplierPreference === "Specific States" &&
      formData.selectedStates.length === 0
    ) {
      errors.selectedStates = "Select at least one state.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const setSupplierPreferenceMethod = (preference) => {
    setFormData((prev) => ({
      ...prev,
      supplierPreference: preference,
      selectedStates:
        preference === "Specific States" ? prev.selectedStates : [],
    }));
  };

  const handleStateSelection = (state) => {
    setFormData((prev) => ({
      ...prev,
      selectedStates: prev.selectedStates.includes(state)
        ? prev.selectedStates.filter((s) => s !== state)
        : [...prev.selectedStates, state],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex justify-center bg-gray-100 p-4 gap-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-white rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-center mb-4 text-[#e03733]">
          Let Us Know <span className="text-black"> What You Need</span>
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Complete these simple steps and get instant quotes from verified
          suppliers.
        </p>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-medium">Product / Service</label>
                <Input
                  name="productService"
                  placeholder="Enter product or service"
                  value={formData.productService}
                  onChange={handleChange}
                />
                {formErrors.productService && (
                  <p className="text-red-500 text-sm">
                    {formErrors.productService}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium">Quantity</label>
                  <Input
                    name="quantity"
                    placeholder="Enter quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                  {formErrors.quantity && (
                    <p className="text-red-500 text-sm">
                      {formErrors.quantity}
                    </p>
                  )}
                </div>
                <div>
                  <label className="font-medium">Unit of Measurement</label>
                  <Input
                    name="unit"
                    placeholder="E.g., kg, pcs"
                    value={formData.unit}
                    onChange={handleChange}
                  />
                  {formErrors.unit && (
                    <p className="text-red-500 text-sm">{formErrors.unit}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="font-medium">Phone Number</label>
                <div className="flex gap-2 mt-2 items-center">
                  <Select
                    options={countryOptions}
                    value={formData.country}
                    onChange={handleCountryChange}
                    className="w-1/3"
                  />
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChange={handlePhoneNumberChange}
                    defaultCountry={formData.country.code}
                    className="border p-2 rounded-md flex-1"
                  />
                </div>
                {phoneError && (
                  <p className="text-red-500 text-sm">{phoneError}</p>
                )}
              </div>

              {/* Supplier Preference */}
              <div>
                <label className="font-medium">Supplier Preference</label>
                <div className="flex gap-4 mt-2">
                  {["All India", "Near Me", "Specific States"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`px-4 py-2 rounded-lg border ${
                        formData.supplierPreference === option
                          ? "border-blue-500 bg-blue-100"
                          : "border-gray-300"
                      }`}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          supplierPreference: option,
                          selectedStates:
                            option === "Specific States"
                              ? formData.selectedStates
                              : [],
                        })
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* State Selection using shadcn Select */}
              {formData.supplierPreference === "Specific States" && (
                <div>
                  <label className="font-medium">Choose Multiple States</label>
                  <Select
                    onValueChange={(value) => handleStateSelection(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select states" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {states.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {/* Show selected states as badges */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.selectedStates.map((state) => (
                      <Badge
                        key={state}
                        className="bg-blue-200 text-blue-800 px-2 py-1 flex items-center gap-1"
                      >
                        {state}
                        <button
                          onClick={() => removeState(state)}
                          className="ml-1 p-1 rounded-full hover:bg-blue-300 transition duration-200"
                        >
                          <X className="h-4 w-4 cursor-pointer text-blue-800" />
                        </button>
                      </Badge>
                    ))}
                  </div>

                  {formErrors.selectedStates && (
                    <p className="text-red-500 text-sm">
                      {formErrors.selectedStates}
                    </p>
                  )}
                </div>
              )}
              <Button
                type="submit"
                className="w-full bg-[#e03733] hover:shadow-lg text-white py-2 rounded-md"
              >
                Submit Requirement
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      {/* Right Side: Buyers Advantages */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md "
      >
        <h2 className="text-xl font-semibold mb-4 text-[#e03733]">
          Buyers Advantages?
        </h2>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Clock className="text-gray-700 w-10 h-10" />
            <div>
              <h3 className="font-semibold">Immediate Responses</h3>
              <p className="text-sm text-gray-600">
                Get instant feedback from suppliers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ShoppingBag className="text-gray-700 w-10 h-10" />
            <div>
              <h3 className="font-semibold">Genuine Suppliers</h3>
              <p className="text-sm text-gray-600">
                Accredited suppliers that meet your needs.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ListChecks className="text-gray-700 w-10 h-10" />
            <div>
              <h3 className="font-semibold">Multiple Choices</h3>
              <p className="text-sm text-gray-600">
                Get the power to choose the best!
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
