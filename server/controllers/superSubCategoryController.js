const SuperSubCategory = require("../");
const SubCategory = require("../models/superSubCategoryModel");

// Create a new super sub-category
exports.createSuperSubCategory = async (req, res) => {
  try {
    const { sub_category_id, super_sub_category_name } = req.body;

    // Check if the referenced sub-category exists
    const subCategoryExists = await SubCategory.findById(sub_category_id);
    if (!subCategoryExists) {
      return res.status(400).json({ message: "Sub-category not found" });
    }

    const superSubCategory = new SuperSubCategory({ sub_category_id, super_sub_category_name });
    await superSubCategory.save();

    res.status(201).json({ message: "Super sub-category created successfully", superSubCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all super sub-categories
exports.getSuperSubCategories = async (req, res) => {
  try {
    const superSubCategories = await SuperSubCategory.find().populate("sub_category_id", "sub_category_name");
    res.json(superSubCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get super sub-category by ID
exports.getSuperSubCategoryById = async (req, res) => {
  try {
    const superSubCategory = await SuperSubCategory.findById(req.params.id).populate("sub_category_id", "sub_category_name");
    if (!superSubCategory) {
      return res.status(404).json({ message: "Super sub-category not found" });
    }
    res.json(superSubCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update super sub-category
exports.updateSuperSubCategory = async (req, res) => {
  try {
    const { sub_category_id, super_sub_category_name } = req.body;

    const superSubCategory = await SuperSubCategory.findByIdAndUpdate(
      req.params.id,
      { sub_category_id, super_sub_category_name },
      { new: true, runValidators: true }
    );

    if (!superSubCategory) {
      return res.status(404).json({ message: "Super sub-category not found" });
    }
    res.json({ message: "Super sub-category updated successfully", superSubCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete super sub-category
exports.deleteSuperSubCategory = async (req, res) => {
  try {
    const superSubCategory = await SuperSubCategory.findByIdAndDelete(req.params.id);
    if (!superSubCategory) {
      return res.status(404).json({ message: "Super sub-category not found" });
    }
    res.json({ message: "Super sub-category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
