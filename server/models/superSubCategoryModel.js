const mongoose = require("mongoose");

const SuperSubCategorySchema = new mongoose.Schema(
  {
    sub_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    super_sub_category_name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("SuperSubCategory", SuperSubCategorySchema);
