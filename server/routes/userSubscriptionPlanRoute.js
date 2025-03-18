const express = require("express");
const {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
} = require("../controllers/userSubscriptionPlanController");


const router = express.Router();

// Create a new user subscription
router.post("/create-usersubscriptionplans", protect, createSubscription);

// Get all user subscriptions (Admin only)
router.get("/fetch-all-usersubscriptionplans", protect, admin, getAllSubscriptions);

// Get a single user subscription by ID
router.get("/fetch-usersubscriptionplans-by-id/:id", protect, getSubscriptionById);

// Update a user subscription
router.put("/update-usersubscriptionplans-by-id/:id", protect, admin, updateSubscription);

// Delete a user subscription
router.delete("/delete-usersubscriptionplans-by-id/:id", protect, admin, deleteSubscription);

module.exports = router;
