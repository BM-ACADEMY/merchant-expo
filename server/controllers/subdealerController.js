const SubDealer = require("../models/subdealerModel");
const bcrypt = require("bcryptjs");

// @desc   Get all sub-dealers
// @route  GET /api/subdealers
exports.getAllSubDealers = async (req, res) => {
  try {
    const subdealers = await SubDealer.find();
    res.status(200).json(subdealers);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// @desc   Get a single sub-dealer
// @route  GET /api/subdealers/:id
exports.getSubDealerById = async (req, res) => {
  try {
    const subdealer = await SubDealer.findById(req.params.id);
    if (!subdealer) return res.status(404).json({ error: "SubDealer not found" });

    res.status(200).json(subdealer);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// @desc   Create a new sub-dealer
// @route  POST /api/subdealers
exports.createSubDealer = async (req, res) => {
  try {
    const { email, phone_number, password, gst_number, pan, aadhar } = req.body;

    // Check for existing email, GST, PAN, Aadhar
    const existingSubDealer = await SubDealer.findOne({ 
      $or: [{ email }, { gst_number }, { pan }, { aadhar }] 
    });

    if (existingSubDealer) {
      return res.status(400).json({ error: "Email, GST, PAN, or Aadhar already exists" });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newSubDealer = await SubDealer.create({ ...req.body, password: hashedPassword });
    res.status(201).json(newSubDealer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc   Update a sub-dealer
// @route  PUT /api/subdealers/:id
exports.updateSubDealer = async (req, res) => {
  try {
    // Prevent password update directly (use separate route for password change)
    if (req.body.password) delete req.body.password;

    const updatedSubDealer = await SubDealer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSubDealer) return res.status(404).json({ error: "SubDealer not found" });

    res.status(200).json(updatedSubDealer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc   Delete a sub-dealer
// @route  DELETE /api/subdealers/:id
exports.deleteSubDealer = async (req, res) => {
  try {
    const deletedSubDealer = await SubDealer.findByIdAndDelete(req.params.id);
    if (!deletedSubDealer) return res.status(404).json({ error: "SubDealer not found" });

    res.status(200).json({ message: "SubDealer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
