const User = require ("../models/UserModel");
const jwt=require("jsonwebtoken");
// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, referral_code, email, phone } = req.body;

    // Check if email or phone already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({
        statusCode: 400,
        message: "User with this email or phone number already exists.",
        data: null,
      });
    }

    // Generate referral code if not provided
    let generatedReferralCode = referral_code;
    if (!referral_code) {
      const namePrefix = name.substring(0, 2).toUpperCase(); // First 2 letters capitalized
      generatedReferralCode = `${namePrefix}${phone}`;
    }

    // Create user
    const newUser = new User({
      name,
      referral_code: generatedReferralCode,
      email,
      phone,
    });

    await newUser.save();

    res.status(201).json({
      statusCode: 201,
      message: "User created successfully",
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        referral_code: newUser.referral_code,
        created_at: newUser.created_at,
      },
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      data: null,
      error: err.message,
    });
  }
};

//sign in user
exports.signInUser = async (req, res) => {
  try {
    const { email, phone, number_otp } = req.body;

    // Find user by email or phone
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (!user) {
      return res.status(400).json({
        statusCode: 400,
        message: "User not found. Please sign up.",
        data: null,
      });
    }

    // Check if OTP is correct (assuming OTP is stored in DB temporarily)
    // if (number_otp && user.number_otp !== number_otp) {
    //   return res.status(400).json({
    //     statusCode: 400,
    //     message: "Invalid OTP. Please try again.",
    //     data: null,
    //   });
    // }

    // Ensure user is verified before generating a token
    // if (!user.email_verified || !user.number_verified) {
    //   return res.status(400).json({
    //     statusCode: 400,
    //     message: "Please verify your email and phone number first.",
    //     data: null,
    //   });
    // }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, email: user.email, phone: user.phone },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      statusCode: 200,
      message: "Login successful",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          referral_code: user.referral_code,
        },
        token,
      },
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      data: null,
      error: err.message,
    });
  }
};


// Verify phone number
exports.verifyPhoneNumber = async (req, res) => {
  try {
    const { phone, number_otp } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.number_otp !== number_otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    user.number_verified = true;
    user.number_otp = null; // Clear OTP after verification
    await user.save();
    res.status(200).json({ message: "Phone number verified successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

// Verify email
exports.verifyEmail = async (req, res) => {
  try {
    const { email, email_otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.email_otp !== email_otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    user.email_verified = true;
    user.email_otp = null; // Clear OTP after verification
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};
