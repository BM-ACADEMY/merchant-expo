const mongoose = require("mongoose");

const merchantSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    address_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    company_email: {
      type: String,
      required: [true, "Company email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Please enter a valid email address",
      },
    },
    company_phone_number: { type: String, required: true },
    company_name: { type: String, required: true },
    msme_certificate_number: { type: String, unique: true, sparse: true }, // sparse allows null
    gst_number: { type: String, unique: true, sparse: true },
    pan: { type: String, unique: true, sparse: true },
    aadhar: { type: String, required: true, unique: true },
    verified_status: { type: Boolean, default: false },
    trustshield: { type: Boolean, default: false },
    company_type: {
      type: String,
      enum: ["Retailer", "Manufacturer", "Sub_dealer"],
      required: true,
    },
    company_logo: { type: String },
    company_images: { type: [String] },
    description: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          const wordCount = value.trim().split(/\s+/).length;
          return wordCount >= 30 && wordCount <= 3000;
        },
        message: "Description must be between 30 and 3000 words.",
      },
    },
    number_of_employees: {
      type: Number,
      required: true,
      min: [1, "Number of employees must be at least 1"],
    },
    year_of_establishment: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          const currentYear = new Date().getFullYear();
          return value >= 1800 && value <= currentYear;
        },
        message: "Enter a valid year of establishment.",
      },
    },

  },
  { timestamps: true }
);
module.exports = mongoose.model("Merchant", merchantSchema);

