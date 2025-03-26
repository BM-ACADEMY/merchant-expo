const mongoose = require("mongoose");

const merchantSchema = new mongoose.Schema(
  {
    user_id: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true },
    company_name: { type: String, required: true },
    msme_certificate_number: { type: String, required: true, unique: true },
    certificate_image: { type: String },
    gst_number: { type: String, required: true, unique: true },
    pan: { type: String, required: true, unique: true },
    aadhar: { type: String, required: true, unique: true },
    verified_status: { type: Boolean, default: false },
    trustshield: { type: Boolean, default: false },
    company_type: { type: String, enum: ["Retailer", "Manufacturer", "Sub_dealer"], required: true },
    company_logo: { type: String },
    company_images: { type: [String] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Merchant", merchantSchema);
