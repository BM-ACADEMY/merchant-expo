const express = require("express");
const { 
    createUser, 
    getUsers, 
    getUserById, 
    updateUser, 
    deleteUser ,
    sendOtp,
    verifyOtp
} = require("../controllers/userController");

const authMiddleware = require("../middleware/userValidation");
const router = express.Router();

// Create a new user
router.post('/create-users', createUser);

// Get all users
router.get('/fetch-all-users', getUsers);

// Get a single user by ID
router.get('/fetch-users-by-id/:id', getUserById);

// Update a user by ID
router.put('/update-users-by-id/:id', updateUser);

// Delete a user by ID
router.delete('/delete-users-by-id/:id', deleteUser);

router.post("/verify-otp", verifyOtp);

module.exports = router;
