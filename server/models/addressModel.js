const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    entity_type: {
      type: String,
      enum: ["user", "merchant", "grocery_seller", "service_provider","student","admin","sub_admin"],
      required: true,
    },
    address_type: {
      type: String,
      enum: ["personal", "company"],
      required: true,
    },
    address_line_1: {
      type: String,
      required: true,
    },
    address_line_2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
