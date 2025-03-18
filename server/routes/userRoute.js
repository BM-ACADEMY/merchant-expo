const express = require("express");
const { 
    createUser, 
    getUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} = require("../controllers/userController");


const router = express.Router();

// Create a new user
router.post('/create-users', authMiddleware, createUser);

// Get all users
router.get('/fetch-all-users', authMiddleware, getUsers);

// Get a single user by ID
router.get('/fetch-users-by-id/:id', authMiddleware, getUserById);

// Update a user by ID
router.put('/update-users-by-id/:id', authMiddleware, updateUser);

// Delete a user by ID
router.delete('/delete-users-by-id/:id', authMiddleware, deleteUser);

module.exports = router;
