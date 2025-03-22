const User = require("../models/userModel");
const axios = require("axios");
const Role=require('../models/roleModel');
const { sendOtpEmail } = require("../utils/sendEmail");
const crypto=require('crypto');
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');


const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

// ✅ Create User with OTP Verification
// exports.createUser = async (req, res) => {
//   try {
//     const { name, referral_code, email, phone, role } = req.body;

//     if (!phone)
//       return res.status(400).json({ message: "Phone number is required" });

//     // ✅ Check if email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     // ✅ Generate OTP
//     const otp = generateOtp();

//     // ✅ Check if phone number already exists
//     let user = await User.findOne({ phone });
//     if (!user) {
//       user = new User({
//         name,
//         referral_code,
//         email,
//         phone,
//         role,
//         number_otp: otp,
//       });
//     } else {
//       if (user.number_verified) {
//         return res
//           .status(400)
//           .json({ message: "Phone number already verified" });
//       }
//       user.number_otp = otp;
//     }
//     await user.save();

//     // ✅ Send OTP via Fast2SMS
//     try {
//       const response = await axios.post(
//         "https://www.fast2sms.com/dev/bulkV2",
//         {
//           route: "otp",
//           variables_values: otp.toString(),
//           numbers: phone.toString(),
//         },
//         {
//           headers: { authorization: process.env.FAST2SMS_API_KEY },
//         }
//       );

//       res.json({
//         success: true,
//         message: "OTP sent successfully",
//         data: response.data,
//       });
//     } catch (error) {
//       console.error("Fast2SMS Error:", error.response?.data || error.message);
//       res
//         .status(500)
//         .json({
//           message: "Error sending OTP",
//           error: error.response?.data || error.message,
//         });
//     }

//     res.status(201).json({
//       success: true,
//       message: "OTP sent for verification",
//       data: response.data,
//       userId: user._id, // ✅ Send user ID for verification later
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error sending OTP", error: error.message });
//   }
// };

exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, role, password, confirmPassword } = req.body;

    if (password.trim() !== confirmPassword.trim()) {
      return res.status(400).json({ message: "Password does not match" });
    }

    // Find the "USER" role from the Role collection
    let userRole = await Role.findOne({ role: "USER" });
    if (!userRole) {
      return res.status(500).json({ message: "Default role USER not found" });
    }

    // If a role is provided, check if it exists
    if (role) {
      const requestedRole = await Role.findOne({ role });
      if (!requestedRole) {
        return res.status(400).json({ message: "Invalid role" });
      }
      userRole = requestedRole;
    }

    // Check if email or phone already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or phone already exists" });
    }

    // Generate referral code
    const referral_code = name.substring(0, 2).toUpperCase() + phone;

    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Generate and encrypt OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const encryptedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    // Save user with default or provided role
    const newUser = new User({
      name,
      referral_code,
      email,
      phone,
      role: userRole._id,
      password: hashPassword, // Use bcrypt hashed password
      email_otp: encryptedOtp,
      email_verified: false,
      created_at: new Date(),
    });

    await newUser.save();

    // Send OTP email
    await sendOtpEmail(email, otp);

    res.status(201).json({
      message: "User registered. OTP sent for verification.",
      userId: newUser._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the email is verified
    if (!user.email_verified) {
      // Generate a new OTP
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const encryptedOtp = crypto.createHash("sha256").update(otp).digest("hex");

      // Update OTP in DB
      user.email_otp = encryptedOtp;
      await user.save();

      // Send OTP email
      await sendOtpEmail(email, otp);

      return res.status(403).json({
        message: "Email not verified. A new OTP has been sent to your email.",
      });
    }

    // Verify password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
exports.sendOtp = async (req, res) => {
  try {
      const { phone } = req.body;

      if (!phone) return res.status(400).json({ message: "Phone number is required" });

      const otp = generateOtp();

      // ✅ Find or Create User
      let user = await User.findOne({ phone });
      if (!user) {
          user = new User({ phone, number_otp: otp });
      } else {
          user.number_otp = otp;
      }
      await user.save(); // ✅ Save OTP to DB

      // ✅ Send OTP via Fast2SMS
      const response = await axios.post(
          "https://www.fast2sms.com/dev/bulkV2",
          {
              route: "otp",
              variables_values: otp,
              numbers: phone
          },
          {
              headers: { authorization: process.env.FAST2SMS_API_KEY }
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

    // Check if OTP is expired
    if (user.otpExpires < new Date()) {
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    // Hash the entered OTP and compare
    const hashedOtp = crypto.createHash("sha256").update(email_otp).digest("hex");
    if (hashedOtp !== user.email_otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Update user verification status
    user.email_verified = true;
    user.otp = null; // Clear OTP after successful verification
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error: error.message });
  }
};
// ✅ Verify OTP and Complete Registration
exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({ phone });

    if (!user || user.number_otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // ✅ Update user verification status
    user.number_verified = true;
    user.number_otp = null; // Remove OTP after verification
    await user.save();

    res.json({
      success: true,
      message: "OTP verified successfully, registration complete",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
// Get all users
exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page = 1
    const limit = parseInt(req.query.limit) || 10; // Default limit = 10
    const skip = (page - 1) * limit; // Calculate skip value

    // Fetch users with pagination
    const users = await User.find().skip(skip).limit(limit).select("-password");
     
    // Get total count for pagination metadata
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      users,
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
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};
// Update user details
exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone, role, password } = req.body;
    
    const updateFields = { name, email, phone, role };
    
    // If password is being updated, hash it before storing
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(password, salt);
    }
    
    updateFields.updated_at = new Date(); // Update the timestamp
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};
// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};
