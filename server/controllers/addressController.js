const Address = require("../models/addressModel");
const User = require("../models/userModel");
const mongoose=require('mongoose');

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

exports.getAddressesForPostByRequirement = async (req, res) => {
  try {
    // Get the role ID for MERCHANT from the Role collection
    const merchantRole = await mongoose.model("Role").findOne({ role: "MERCHANT" });

    if (!merchantRole) {
      return res.status(404).json({ message: "MERCHANT role not found" });
    }

    // Fetch addresses where the user has the MERCHANT role
    const addresses = await Address.find()
      .populate({
        path: "user_id",
        match: { role: merchantRole._id },
        select: "name email role",
        populate: {
          path: "role",
          select: "role",
        },
      });

    // Filter out addresses where user_id is null (non-MERCHANT users will be null due to match)
    const merchantAddresses = addresses.filter(address => address.user_id);

    res.json(merchantAddresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get address by ID
exports.getAddressById = async (req, res) => {
  try {
    const {id}=req.params;
    console.log(req.params);
    
    const address = await Address.find({user_id :id}).populate("user_id", "name email");

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

    const { entity_type, address_type, address_line_1, address_line_2, city, state, country, pincode } = req.body;
    const userId = req.params.userId; // Extract userId from params

    // Ensure userId exists
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const address = await Address.findOneAndUpdate(
      { _id: selectedAddressId, user_id }, // Make sure the address belongs to the user
      {
        entity_type,
        address_type,
        address_line_1,
        address_line_2,
        city,
        state,
        country,
        pincode,
      },

      { new: true, runValidators: true }
    );

    if (!address) {
      return res.status(404).json({ message: "Address not found for this user" });
    }
    res.json({ success: true, error: false, message: "Address updated successfully", address });
  } catch (error) {
    res.status(500).json({ success: false, error: true, message: error.message });

  }
};

// Delete address
exports.deleteAddress = async (req, res) => {
  try {
    const { user_id, addressId } = req.body;

    if (!user_id || !addressId) {
      return res.status(400).json({ message: "User ID and Address ID are required" });
    }

    // Check if the address belongs to the user
    const address = await Address.findOneAndDelete({ _id: addressId, user_id });

    if (!address) {
      return res.status(404).json({ message: "Address not found or does not belong to user" });
    }

    res.json({ success: true, error: false, message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: true, message: error.message });

  }
};
