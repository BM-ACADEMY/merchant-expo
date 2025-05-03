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
      type: String, 
    },
  
  },
  { timestamps: true } 
);

module.exports = mongoose.model("SubCategory", SubCategorySchema);
