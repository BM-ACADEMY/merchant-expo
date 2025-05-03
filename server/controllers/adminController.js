const Admin = require("../models/adminModel");

// Create a new admin entry
exports.createAdmin = async (req, res) => {
  try {
    const { user_id, is_admin } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const existingAdmin = await Admin.findOne({ user_id });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = new Admin({ user_id, is_admin });
    await admin.save();

    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all admin entries
exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().populate("user_id", "name email"); // Assuming User model has name & email
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get admin entry by ID
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).populate("user_id", "name email");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update admin entry
exports.updateAdmin = async (req, res) => {
  try {
    const { is_admin } = req.body;

    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { is_admin },
      { new: true, runValidators: true }
    );

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json({ message: "Admin updated successfully", admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete admin entry
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
