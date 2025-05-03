import { useContext, useState, useEffect } from "react";
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
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";
import { Clock, ListChecks, ShoppingBag, X } from "lucide-react";
import {
  useGetPostByRequirementsQuery,
  useGetMerchantAddressQuery,
  useCreatePostByRequirementMutation,
  useUpdatePostByRequirementMutation,
  useDeletePostByRequirementMutation
} from "@/redux/api/PostByRequirementApi";
import { AuthContext } from "../modules/landing/context/AuthContext";
import { toast } from "react-toastify";
import PostByRequirementList from "./pages/PostByRequirementList";

const states = ["Chhattisgarh", "Assam", "Bihar", "Arunachal Pradesh"];

export function PostRequirement() {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({
    product_or_service: "",
    quantity: "",
    unit_of_measurement: "",
    phone_number: "",
    country: { label: "India (+91)", value: "+91", code: "IN" },
    supplier_preference: "All India",
    selected_states: [],
    user_id: user?.user?._id || null
  });

  useEffect(() => {
    if (isEditing) {
      setFormData({
        product_or_service: isEditing.product_or_service || "",
        quantity: isEditing.quantity || "",
        unit_of_measurement: isEditing.unit_of_measurement || "",
        phone_number: isEditing.phone_number || "",
        country: { label: "India (+91)", value: "+91", code: "IN" },
        supplier_preference: isEditing.supplier_preference || "All India",
        selected_states: isEditing.selected_states || [],
        user_id: user?.user?._id || null
      });
    }
    else {
      setFormData({
        product_or_service: "",
        quantity: "",
        unit_of_measurement: "",
        phone_number: "",
        country: { label: "India (+91)", value: "+91", code: "IN" },
        supplier_preference: "All India",
        selected_states: [],
        user_id: user?.user?._id || null
      })
    }
  }, [isEditing]);

  const [phoneError, setPhoneError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [createPost] = useCreatePostByRequirementMutation();
  const [updatePost] = useUpdatePostByRequirementMutation();

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
        phone_number: "",
      }));
    }
  };

  const handlePhoneNumberChange = (value) => {
    setFormData((prev) => ({ ...prev, phone_number: value }));

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
      selected_states: prev.selected_states.filter((state) => state !== stateToRemove),
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let errors = {};

    if (!formData?.product_or_service?.trim())
      errors.product_or_service = "Product/Service is required.";

    if (!formData?.quantity)
      errors.quantity = "Quantity is required.";

    if (!formData?.unit_of_measurement?.trim())
      errors.unit_of_measurement = "Unit of measurement is required.";

    if (!formData?.phone_number?.trim())
      errors.phone_number = "Phone number is required.";

    if (!isValidPhoneNumber(formData?.phone_number, formData?.country.code))
      errors.phone_number = "Invalid phone number.";

    if (
      formData?.supplier_preference === "Specific States" &&
      formData?.selected_states.length === 0
    ) {
      errors.selected_states = "Select at least one state.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const setSupplierPreferenceMethod = (preference) => {
    setFormData((prev) => ({
      ...prev,
      supplierPreference: preference,
      selected_states:
        preference === "Specific States" ? prev.selected_states : [],
    }));
  };

  const handleStateSelection = (state) => {
    setFormData((prev) => ({
      ...prev,
      selected_states: prev.selected_states.includes(state)
        ? prev.selected_states.filter((s) => s !== state)
        : [...prev.selected_states, state],
    }));
  };

  const handleEdit = (edit) => {
    console.log(edit, 'selected');

    setIsEditing(edit)
  }

  const resetForm = () => {
    setFormData({
      product_or_service: "",
      quantity: "",
      unit_of_measurement: "",
      phone_number: "",
      country: { label: "India (+91)", value: "+91", code: "IN" },
      supplier_preference: "All India",
      selected_states: [],
      user_id: user?.user?._id || null
    });
    setIsEditing(null); // Use `null` not `{}`
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isEditing && isEditing._id) {
        const response = await updatePost({ id: isEditing._id, ...formData }).unwrap();
        console.log("Updated successfully:", response);
        if (response.success) {
          toast.success(response.message || "Requirement Updated Successfully");
        } else {
          toast.error(response.message || "Failed to Update");
        }
      } else {
        const response = await createPost(formData).unwrap();
        console.log("Created successfully:", response);
        if (response.success) {
          toast.success(response.message || "Requirement Added Successfully");
        } else {
          toast.error(response.message || "Failed to Add");
        }
      }
      resetForm(); // Reset form and editing state
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.message || "Something went wrong!");
    }
  };


  return (
    <div >
      <h2 className="text-xl font-bold mb-4 border-b-2">Add Post By Requirement</h2>
      <div className="flex flex-col lg:flex-row justify-center p-4 gap-4">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full lg:max-w-3xl bg-white rounded-2xl p-4 sm:p-6"
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
              <form className="space-y-4">
                <div>
                  <label className="font-medium">Product / Service</label>
                  <Input
                    name="product_or_service"
                    placeholder="Enter product or service"
                    value={formData?.product_or_service}
                    onChange={handleChange}
                  />
                  {formErrors.product_or_service && (
                    <p className="text-red-500 text-sm">
                      {formErrors.product_or_service}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium">Quantity</label>
                    <Input
                      name="quantity"
                      placeholder="Enter quantity"
                      value={formData?.quantity}
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
                      name="unit_of_measurement"
                      placeholder="E.g., kg, pcs"
                      value={formData?.unit_of_measurement}
                      onChange={handleChange}
                    />
                    {formErrors.unit_of_measurement && (
                      <p className="text-red-500 text-sm">{formErrors.unit_of_measurement}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="font-medium">Phone Number</label>
                  <div className="flex gap-2 mt-2 items-center">
                    <Select
                      options={countryOptions}
                      value={formData?.country}
                      onChange={handleCountryChange}
                      className="w-1/3"
                    />
                    <PhoneInput
                      placeholder="Enter phone number"
                      name="phone_number"
                      value={formData?.phone_number}
                      onChange={handlePhoneNumberChange}
                      defaultCountry={formData?.country?.code}
                      className="border p-2 rounded-md flex-1 outline-0 border-none"
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
                        className={`px-4 py-2 rounded-lg border ${formData?.supplier_preference === option
                          ? "border-blue-500 bg-blue-100"
                          : "border-gray-300"
                          }`}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            supplier_preference: option,
                            selected_states:
                              option === "Specific States"
                                ? formData?.selected_states
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
                {formData?.supplier_preference === "Specific States" && (
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
                          {states?.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {/* Show selected states as badges */}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData?.selected_states.map((state) => (
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

                    {formErrors.selected_states && (
                      <p className="text-red-500 text-sm">
                        {formErrors.selected_states}
                      </p>
                    )}
                  </div>
                )}
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-[#e03733] hover:shadow-lg text-white py-2 rounded-md"
                >
                  {
                    isEditing ? "Update Requirement" : "Submit Requirement"
                  }
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
          className="w-full lg:max-w-md bg-white shadow-lg rounded-2xl p-4 sm:p-6"
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
      <div className="mt-4">
        <PostByRequirementList onEdit={handleEdit} />
      </div>
    </div>
  );
}
