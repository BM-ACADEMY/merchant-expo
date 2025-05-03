const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    sub_category_name: {
      type: String,
      required: true,
      trim: true,
    },
    sub_category_image: {

      type: String, // Cloudinary URL or local path
    },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields

);

module.exports = mongoose.model("SubCategory", SubCategorySchema);
