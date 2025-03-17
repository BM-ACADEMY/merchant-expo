const Access = require("../models/accessModel");

// Create a new access entry
exports.createAccess = async (req, res) => {
  try {
    const { user_id, is_category } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const existingAccess = await Access.findOne({ user_id });
    if (existingAccess) {
      return res.status(400).json({ message: "Access already exists for this user" });
    }

    const access = new Access({ user_id, is_category });
    await access.save();

    res.status(201).json({ message: "Access created successfully", access });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all access entries
exports.getAccessList = async (req, res) => {
  try {
    const accessList = await Access.find().populate("user_id", "name email");
    res.json(accessList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get access entry by ID
exports.getAccessById = async (req, res) => {
  try {
    const access = await Access.findById(req.params.id).populate("user_id", "name email");
    if (!access) {
      return res.status(404).json({ message: "Access entry not found" });
    }
    res.json(access);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update access entry
exports.updateAccess = async (req, res) => {
  try {
    const { is_category } = req.body;

    const access = await Access.findByIdAndUpdate(
      req.params.id,
      { is_category },
      { new: true, runValidators: true }
    );

    if (!access) {
      return res.status(404).json({ message: "Access entry not found" });
    }
    res.json({ message: "Access updated successfully", access });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete access entry
exports.deleteAccess = async (req, res) => {
  try {
    const access = await Access.findByIdAndDelete(req.params.id);
    if (!access) {
      return res.status(404).json({ message: "Access entry not found" });
    }
    res.json({ message: "Access entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
