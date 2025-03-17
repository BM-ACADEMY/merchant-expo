const Address = require("../models/addressModel");
const User = require("../models/userModel");

// Create a new address
exports.createAddress = async (req, res) => {
  try {
    const { user_id, entity_type, address_type, address_line_1, address_line_2, city, state, country, pincode } = req.body;

    // Check if the user exists
    const userExists = await User.findById(user_id);
    if (!userExists) {
      return res.status(400).json({ message: "User not found" });
    }

    const address = new Address({ user_id, entity_type, address_type, address_line_1, address_line_2, city, state, country, pincode });
    await address.save();

    res.status(201).json({ message: "Address created successfully", address });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all addresses
exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find().populate("user_id", "name email"); // Assuming User has name and email fields
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get address by ID
exports.getAddressById = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id).populate("user_id", "name email");
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update address
exports.updateAddress = async (req, res) => {
  try {
    const { user_id, entity_type, address_type, address_line_1, address_line_2, city, state, country, pincode } = req.body;

    const address = await Address.findByIdAndUpdate(
      req.params.id,
      { user_id, entity_type, address_type, address_line_1, address_line_2, city, state, country, pincode },
      { new: true, runValidators: true }
    );

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json({ message: "Address updated successfully", address });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete address
exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
