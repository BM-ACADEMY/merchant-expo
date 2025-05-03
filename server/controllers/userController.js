const User = require("../models/userModel");
const Role = require("../models/roleModel");
<<<<<<< HEAD
const Address = require("../models/addressModel");
=======
const Address=require("../models/addressModel");
>>>>>>> Charles_bm
const { sendOtpEmail } = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
<<<<<<< HEAD
const axios = require("axios");

const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, role, password, confirmPassword } = req.body;
    console.log(req.body);
=======
const axios = require("axios"); // ✅ Moved to the bottom since it's not required immediately

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
    const { name, email, phone, role,gender,profile_pic,date_of_birth, password, confirmPassword } = req.body;
    console.log(req.body,'sdsdsds');
    
>>>>>>> Charles_bm

    if (password?.trim() !== confirmPassword?.trim()) {
      return res.status(400).json({ message: "Password does not match" });
    }

<<<<<<< HEAD
=======
    // Find the "USER" role from the Role collection
>>>>>>> Charles_bm
    let userRole = await Role.findOne({ role: "USER" });
    if (!userRole) {
      return res.status(500).json({ message: "Default role USER not found" });
    }

<<<<<<< HEAD
=======
    // If a role is provided, check if it exists
>>>>>>> Charles_bm
    if (role) {
      const requestedRole = await Role.findOne({ role });
      if (!requestedRole) {
        return res.status(400).json({ message: "Invalid role" });
      }
      userRole = requestedRole;
    }

<<<<<<< HEAD
=======
    // Check if email or phone already exists
>>>>>>> Charles_bm
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or phone already exists" });
    }

<<<<<<< HEAD
    const referral_code = name.substring(0, 2).toUpperCase() + phone;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const encryptedOtp = crypto.createHash("sha256").update(otp).digest("hex");

=======
    // Generate referral code
    const referral_code = name.substring(0, 2).toUpperCase() + phone;

    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Generate and encrypt OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const encryptedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    // Save user with default or provided role
>>>>>>> Charles_bm
    const newUser = new User({
      name,
      referral_code,
      email,
      phone,
<<<<<<< HEAD
      role: userRole._id,
      password: hashPassword,
=======
      gender,
      profile_pic,
      date_of_birth,
      role: userRole._id,
      password: hashPassword, // Use bcrypt hashed password
>>>>>>> Charles_bm
      email_otp: encryptedOtp,
      email_verified: false,
      created_at: new Date(),
    });

    await newUser.save();

<<<<<<< HEAD
=======
    // Send OTP email
>>>>>>> Charles_bm
    await sendOtpEmail(email, otp);

    res.status(201).json({
      success: true,
<<<<<<< HEAD
      error: false,
=======
      error:false,
>>>>>>> Charles_bm
      message: "User registered. OTP sent for verification.",
      data: newUser._id,
    });
  } catch (error) {
<<<<<<< HEAD
    res.status(500).json({ success: false, error: true, message: "Error creating user", error: error.message });
  }
};

=======
    res.status(500).json({ success: false,
      error:true,message: "Error creating user", error: error.message });
  }
};
>>>>>>> Charles_bm
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

<<<<<<< HEAD
=======
    // Check if the user exists
>>>>>>> Charles_bm
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

<<<<<<< HEAD
    if (!user.email_verified) {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const encryptedOtp = crypto.createHash("sha256").update(otp).digest("hex");

      user.email_otp = encryptedOtp;
      await user.save();

=======
    // Check if the email is verified
    if (!user.email_verified) {
      // Generate a new OTP
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const encryptedOtp = crypto.createHash("sha256").update(otp).digest("hex");

      // Update OTP in DB
      user.email_otp = encryptedOtp;
      await user.save();

      // Send OTP email
>>>>>>> Charles_bm
      await sendOtpEmail(email, otp);

      return res.status(403).json({
        message: "Email not verified. A new OTP has been sent to your email.",
      });
    }

<<<<<<< HEAD
=======
    // Verify password using bcrypt
>>>>>>> Charles_bm
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

<<<<<<< HEAD
=======
    // Generate JWT token
>>>>>>> Charles_bm
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

<<<<<<< HEAD
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
=======
    res.status(200).json({ success:true,error:false, message: "Login successful", data:token });
  } catch (error) {
    res.status(500).json({ success:false,error:true,message: "Error logging in", error: error.message });
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
console.log();
>>>>>>> Charles_bm

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

<<<<<<< HEAD
=======
    // Check if OTP is expired
>>>>>>> Charles_bm
    if (user.otpExpires < new Date()) {
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

<<<<<<< HEAD
=======
    // Hash the entered OTP and compare
>>>>>>> Charles_bm
    const hashedOtp = crypto.createHash("sha256").update(email_otp).digest("hex");
    if (hashedOtp !== user.email_otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

<<<<<<< HEAD
    user.email_verified = true;
    user.email_otp = null;
=======
    // Update user verification status
    user.email_verified = true;
    user.otp = null; // Clear OTP after successful verification
>>>>>>> Charles_bm
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error: error.message });
  }
};
<<<<<<< HEAD

=======
// ✅ Verify OTP and Complete Registration
>>>>>>> Charles_bm
exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({ phone });

    if (!user || user.number_otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

<<<<<<< HEAD
    user.number_verified = true;
    user.number_otp = null;
=======
    // ✅ Update user verification status
    user.number_verified = true;
    user.number_otp = null; // Remove OTP after verification
>>>>>>> Charles_bm
    await user.save();

    res.json({
      success: true,
      message: "OTP verified successfully, registration complete",
      user,
    });
  } catch (error) {
<<<<<<< HEAD
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

=======
    res.status(500).json({ success: false,error:true, error: error.message });
  }
};
// Get all users
exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page = 1
    const limit = parseInt(req.query.limit) || 10; // Default limit = 10
    const skip = (page - 1) * limit; // Calculate skip value
    const { name } = req.query;

    // Apply name filter if provided
    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};

    // Fetch users with filtering, pagination, and populate address & role
    const users = await User.find(nameFilter)
      .skip(skip)
      .limit(limit)
      .select("-password") // Exclude password field
      .populate("role") // Populate role from Role model
      .lean(); // Convert to plain JavaScript object

    // Get user IDs
    const userIds = users.map((user) => user._id);

    // Fetch addresses for those users
    const addresses = await Address.find({ user_id: { $in: userIds } }).lean();

    // Map addresses to users
>>>>>>> Charles_bm
    const usersWithDetails = users.map((user) => {
      const userAddress = addresses.find(
        (addr) => addr.user_id.toString() === user._id.toString()
      );
<<<<<<< HEAD
      return { ...user, address: userAddress || {} };
    });

=======
      return { ...user, address: userAddress || {} }; // Return address or empty object
    });

    // Get total count for pagination metadata (with filter)
>>>>>>> Charles_bm
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

<<<<<<< HEAD


// Get a user by ID

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("role");
=======
exports.getUsersForMerchantProduct = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(200).json({
        users: [],
        currentPage: 1,
        totalPages: 0,
        totalUsers: 0,
        perPage: 10,
      });
    }

    const user = await User.findOne({ email: email }).select("_id name email phone").lean();

    res.status(200).json({
      users: user ? [user] : [],
      currentPage: 1,
      totalPages: 1,
      totalUsers: user ? 1 : 0,
      perPage: 10,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};


// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("role"); // Populate the role field
>>>>>>> Charles_bm

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

<<<<<<< HEAD
    const { password, ...userWithoutPassword } = user.toObject();
=======
    const { password, ...userWithoutPassword } = user.toObject(); // Remove password field
>>>>>>> Charles_bm

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};
<<<<<<< HEAD


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
=======
// Update user details
exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone,gender,profile_pic,date_of_birth, role, password } = req.body;
    
    const updateFields = { name, email, gender,profile_pic,date_of_birth, phone, role };
    
    // If password is being updated, hash it before storing
>>>>>>> Charles_bm
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(password, salt);
    }
<<<<<<< HEAD

    // Update user
=======
    
    updateFields.updated_at = new Date(); // Update the timestamp
    
>>>>>>> Charles_bm
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
<<<<<<< HEAD
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

=======
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({success:true, message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({success:false, message: "Error updating user", error: error.message });
  }
};
// Delete user
>>>>>>> Charles_bm
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

<<<<<<< HEAD
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
=======
    res.status(200).json({success:true, message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({success:false, message: "Error deleting user", error: error.message });
  }
};
>>>>>>> Charles_bm
