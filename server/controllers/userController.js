const User = require("../models/userModel");
const axios = require("axios");

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
    const { name, referral_code, email, phone, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const newUser = new User({ name, referral_code, email, phone, role });
    await newUser.save();
    
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
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
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
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
    const { name, referral_code, email, phone, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, referral_code, email, phone, role },
      { new: true, runValidators: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
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
