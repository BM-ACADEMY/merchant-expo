const express = require("express");
const { 
    createUser, 
    getUsers, 
    getUserById, 
    updateUser, 
    deleteUser ,
    loginUser,
    verifyEmailOtp,
    resendOtp 
} = require("../controllers/userController");

const{ authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

// Create a new user
router.post('/register', createUser);

//login 
router.post('/login', loginUser);

// Get all users
router.get('/fetch-all-users',authMiddleware, getUsers);

// Get a single user by ID
router.get('/fetch-users-by-id/:id',authMiddleware, getUserById);

// Update a user by ID
router.put('/update-users-by-id/:id',authMiddleware, updateUser);

// Delete a user by ID
router.delete('/delete-users-by-id/:id',authMiddleware, deleteUser);

router.post("/verify-otp", verifyEmailOtp);

router.post("/resend-otp", resendOtp );


module.exports = router;
