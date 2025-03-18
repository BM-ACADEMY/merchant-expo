const SubCategory = require("../models/subCategoryModel");
const Category = require("../models/categoryModel");

// Create a new sub-category
exports.createSubCategory = async (req, res) => {
  try {
    const { category_id, sub_category_name, image } = req.body;

    // Check if the referenced category exists
    const categoryExists = await Category.findById(category_id);
    if (!categoryExists) {
      return res.status(400).json({ message: "Category not found" });
    }

    const subCategory = new SubCategory({ category_id, sub_category_name, image });
    await subCategory.save();

    res.status(201).json({ message: "Sub-category created successfully", subCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all sub-categories
exports.getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("category_id", "category_name");
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get sub-category by ID
exports.getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id).populate("category_id", "category_name");
    if (!subCategory) {
      return res.status(404).json({ message: "Sub-category not found" });
    }
    res.json(subCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update sub-category
exports.updateSubCategory = async (req, res) => {
  try {
    const { category_id, sub_category_name, image } = req.body;

    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      { category_id, sub_category_name, image },
      { new: true, runValidators: true }
    );

    if (!subCategory) {
      return res.status(404).json({ message: "Sub-category not found" });
    }
    res.json({ message: "Sub-category updated successfully", subCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete sub-category
exports.deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!subCategory) {
      return res.status(404).json({ message: "Sub-category not found" });
    }
    res.json({ message: "Sub-category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
