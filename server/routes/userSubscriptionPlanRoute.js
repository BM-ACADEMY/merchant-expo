const express = require("express");
const {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
} = require("../controllers/userSubscriptionController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new user subscription
router.post("/", protect, createSubscription);

// Get all user subscriptions (Admin only)
router.get("/", protect, admin, getAllSubscriptions);

// Get a single user subscription by ID
router.get("/:id", protect, getSubscriptionById);

// Update a user subscription
router.put("/:id", protect, admin, updateSubscription);

// Delete a user subscription
router.delete("/:id", protect, admin, deleteSubscription);

module.exports = router;
