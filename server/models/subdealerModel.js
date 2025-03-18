const mongoose = require("mongoose");

const SubDealerSchema = new mongoose.Schema(
  {
    user_id: { type: Number, unique: true, required: true }, // Links to Users table
    merchant_id: { type: Number, required: true }, // Links to Merchants table
    email: { type: String, unique: true, required: true },
    phone_number: { type: String, required: true, maxLength: 10 },
    password: { type: String, required: true },
    company_name: { type: String, required: true },
    logo: { type: String }, // Optional
    gst_number: { type: String, unique: true, required: true },
    pan: { type: String, unique: true, required: true },
    aadhar: { type: String, unique: true, required: true },
    door_no: { type: String, required: true },
    street: { type: String, required: true },
    village: { type: String, required: true },
    district: { type: String, required: true },
    verified_status: { type: Boolean, default: false },
    trustshield: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubDealer", SubDealerSchema);
