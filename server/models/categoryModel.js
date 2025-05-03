  const mongoose = require("mongoose");

  const CategorySchema = new mongoose.Schema(
    {
      category_name: {
        type: String,
        required: true,
        unique: true,
        // trim: true,
      },
      category_image: {
        type: String,
      },
    },
    { timestamps: true }
  );

  module.exports = mongoose.model("Category", CategorySchema);
