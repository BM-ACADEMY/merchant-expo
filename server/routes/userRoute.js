const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  verifyEmailOtp,
  resendOtp,
} = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");
const User = require("../models/userModel");

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/fetch-all-users', authMiddleware, getUsers);
router.get('/fetch-users-by-id/:id', authMiddleware, getUserById);
router.put('/update-users-by-id/:id', authMiddleware, updateUser);
router.delete('/delete-users-by-id/:id', authMiddleware, deleteUser);
router.post("/verify-otp", verifyEmailOtp);
router.post("/resend-otp", resendOtp);

router.get('/lookup', async (req, res) => {
  try {
    console.log("Lookup route hit with query:", req.query);
    const { user_id, name, email, phone_number } = req.query;

    const query = { $or: [] };

    if (user_id) query.$or.push({ _id: user_id });
    if (name) query.$or.push({ name: { $regex: name, $options: 'i' } });
    if (email) query.$or.push({ email });
    if (phone_number) query.$or.push({ phone: phone_number });

    if (query.$or.length === 0) {
      return res.status(400).json({ success: false, error: 'At least one search parameter is required' });
    }

    const users = await User.find(query).select("-password").populate("role");
    console.log("Found users:", users);

    if (!users || users.length === 0) {
      return res.status(404).json({ success: false, users: [] });
    }

    const userData = users.map(user => ({
      user_id: user._id.toString(),
      name: user.name,
      email: user.email || '',
      phone_number: user.phone,
      role: user.role,
    }));

    res.json({ success: true, users: userData });
  } catch (error) {
    console.error("Lookup error:", error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;