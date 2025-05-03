const mongoose = require("mongoose");

const GrocerySellerSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },
        address_id: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },
        shop_email: { type: String, unique: true, required: true },
        shop_phone_number: { type: String, required: true },
        msme_certificate_number: { type: String, unique: true },
        gst_number: { type: String,  unique: true },
        pan: { type: String, unique: true },
        aadhar: { type: String, required: true, unique: true },
        shop_name: { type: String, required: true },
        company_logo: { type: String },
        company_images: [{ type: String }],
        verified_status: { type: Boolean, default: false }
    },
    { timestamps: true }
);

module.exports = mongoose.model("GrocerySeller", GrocerySellerSchema);
