const mongoose = require("mongoose");

const GrocerySellerSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },
        address_id: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },
        email: { type: String, unique: true, required: true },
        gst_number: { type: String, unique: true, required: true },
        pan: { type: String, unique: true, required: true },
        shop_name: { type: String, required: true },
        company_logo: { type: String },
        company_images: [{ type: String }],
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true, maxlength: 6 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("GrocerySeller", GrocerySellerSchema);
