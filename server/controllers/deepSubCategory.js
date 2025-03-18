const DeepSubCategory = require("../models/deepSubCategoryModel");
const SuperSubCategory = require("../models/superSubCategoryModel");

// Create a new deep sub-category
exports.createDeepSubCategory = async (req, res) => {
  try {
    const { super_sub_category_id, deep_sub_category_name, image } = req.body;

    // Check if the referenced super sub-category exists
    const superSubCategoryExists = await SuperSubCategory.findById(super_sub_category_id);
    if (!superSubCategoryExists) {
      return res.status(400).json({ message: "Super sub-category not found" });
    }

    const deepSubCategory = new DeepSubCategory({ super_sub_category_id, deep_sub_category_name, image });
    await deepSubCategory.save();

    res.status(201).json({ message: "Deep sub-category created successfully", deepSubCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all deep sub-categories
exports.getDeepSubCategories = async (req, res) => {
  try {
    const deepSubCategories = await DeepSubCategory.find().populate("super_sub_category_id", "super_sub_category_name");
    res.json(deepSubCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get deep sub-category by ID
exports.getDeepSubCategoryById = async (req, res) => {
  try {
    const deepSubCategory = await DeepSubCategory.findById(req.params.id).populate("super_sub_category_id", "super_sub_category_name");
    if (!deepSubCategory) {
      return res.status(404).json({ message: "Deep sub-category not found" });
    }
    res.json(deepSubCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update deep sub-category
exports.updateDeepSubCategory = async (req, res) => {
  try {
    const { super_sub_category_id, deep_sub_category_name, image } = req.body;

    const deepSubCategory = await DeepSubCategory.findByIdAndUpdate(
      req.params.id,
      { super_sub_category_id, deep_sub_category_name, image },
      { new: true, runValidators: true }
    );

    if (!deepSubCategory) {
      return res.status(404).json({ message: "Deep sub-category not found" });
    }
    res.json({ message: "Deep sub-category updated successfully", deepSubCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete deep sub-category
exports.deleteDeepSubCategory = async (req, res) => {
  try {
    const deepSubCategory = await DeepSubCategory.findByIdAndDelete(req.params.id);
    if (!deepSubCategory) {
      return res.status(404).json({ message: "Deep sub-category not found" });
    }
    res.json({ message: "Deep sub-category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
