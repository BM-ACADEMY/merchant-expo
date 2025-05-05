const User = require("../models/userModel");
const Role = require("../models/roleModel");
const Address = require("../models/addressModel");
const { sendOtpEmail } = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, role, password, confirmPassword } = req.body;
    console.log(req.body);

    if (password?.trim() !== confirmPassword?.trim()) {
      return res.status(400).json({ message: "Password does not match" });
    }

    let userRole = await Role.findOne({ role: "USER" });
    if (!userRole) {
      return res.status(500).json({ message: "Default role USER not found" });
    }

    if (role) {
      const requestedRole = await Role.findOne({ role });
      if (!requestedRole) {
        return res.status(400).json({ message: "Invalid role" });
      }
      userRole = requestedRole;
    }

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or phone already exists" });
    }

    const referral_code = name.substring(0, 2).toUpperCase() + phone;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const encryptedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    const newUser = new User({
      name,
      referral_code,
      email,
      phone,
      role: userRole._id,
      password: hashPassword,
      email_otp: encryptedOtp,
      email_verified: false,
      created_at: new Date(),
    });

    await newUser.save();

    await sendOtpEmail(email, otp);

    res.status(201).json({
      success: true,
      error: false,
      message: "User registered. OTP sent for verification.",
      data: newUser._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: true, message: "Error creating user", error: error.message });
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.email_verified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const encryptedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    user.email_otp = encryptedOtp;
    await user.save();

    await sendOtpEmail(email, otp);

    res.status(200).json({ success: true, message: "OTP resent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error resending OTP", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.email_verified) {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const encryptedOtp = crypto.createHash("sha256").update(otp).digest("hex");

      user.email_otp = encryptedOtp;
      await user.save();

      await sendOtpEmail(email, otp);

      return res.status(403).json({
        message: "Email not verified. A new OTP has been sent to your email.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ success: true, error: false, message: "Login successful", data: token });
  } catch (error) {
    res.status(500).json({ success: false, error: true, message: "Error logging in", error: error.message });
  }
};

exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) return res.status(400).json({ message: "Phone number is required" });

    const otp = generateOtp();

    let user = await User.findOne({ phone });
    if (!user) {
      user = new User({ phone, number_otp: otp });
    } else {
      user.number_otp = otp;
    }
    await user.save();

    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "otp",
        variables_values: otp,
        numbers: phone,
      },
      {
        headers: { authorization: process.env.FAST2SMS_API_KEY },
      }
    );

    res.json({ success: true, message: "OTP sent successfully", data: response.data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.verifyEmailOtp = async (req, res) => {
  try {
    const { email, email_otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    const hashedOtp = crypto.createHash("sha256").update(email_otp).digest("hex");
    if (hashedOtp !== user.email_otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.email_verified = true;
    user.email_otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({ phone });

    if (!user || user.number_otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    user.number_verified = true;
    user.number_otp = null;
    await user.save();

    res.json({
      success: true,
      message: "OTP verified successfully, registration complete",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: true, error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { name } = req.query;

    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};

    const users = await User.find(nameFilter)
      .skip(skip)
      .limit(limit)
      .select("-password")
      .populate("role")
      .lean();

    const userIds = users.map((user) => user._id);

    const addresses = await Address.find({ user_id: { $in: userIds } }).lean();

    const usersWithDetails = users.map((user) => {
      const userAddress = addresses.find(
        (addr) => addr.user_id.toString() === user._id.toString()
      );
      return { ...user, address: userAddress || {} };
    });

    const totalUsers = await User.countDocuments(nameFilter);

    res.status(200).json({
      users: usersWithDetails,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
      perPage: limit,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};



// Get a user by ID

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};


// Update user details

exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone, role, password } = req.body;

    // Validate role if provided
    if (role) {
      const roleExists = await Role.findById(role);
      if (!roleExists) {
        return res.status(400).json({ success: false, message: "Invalid role ID" });
      }
    }

    // Prepare update fields
    const updateFields = { name, email, phone, role, updated_at: new Date() };

    // Hash password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(password, salt);
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    ).populate("role");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Format response to match frontend expectations
    const userResponse = {
      user_id: updatedUser._id.toString(),
      name: updatedUser.name,
      email: updatedUser.email || "",
      phone_number: updatedUser.phone,
      role: updatedUser.role, // Populated role object
    };

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ success: false, message: "Error updating user", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

exports.lookupUser = async (req, res) => {
  try {
    const { email, phone, name } = req.query;

    let query = {};
    if (email) query.email = email;
    if (phone) query.phone = phone;
    if (name) query.name = { $regex: name, $options: "i" };

    const users = await User.find(query).select("-password").populate("role");

    if (users.length === 0) {
      return res.status(404).json({ success: false, users: [] });
    }

    // Format users to match frontend expectations
    const userData = users.map((user) => ({
      user_id: user._id.toString(),
      name: user.name,
      email: user.email || "",
      phone_number: user.phone,
      role: user.role,
    }));

    res.status(200).json({ success: true, users: userData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error looking up user", error: error.message });
  }
};