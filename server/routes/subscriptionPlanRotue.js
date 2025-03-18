const express = require("express");
const {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlan,
} = require("../controllers/subscriptionPlanController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new subscription plan
router.post("/create-subscriptionplans", protect, admin, createPlan);

// Get all subscription plans
router.get("/fetch-all-subscriptionplans", getAllPlans);

// Get a single subscription plan by ID
router.get("/fetch-subscriptionplans-by-id/:id", getPlanById);

// Update a subscription plan
router.put("/update-subscriptionplans-by-id/:id", protect, admin, updatePlan);

// Delete a subscription plan
router.delete("/delete-subscriptions-plans-by-id/:id", protect, admin, deletePlan);

module.exports = router;
