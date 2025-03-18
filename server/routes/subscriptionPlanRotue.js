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
router.post("/", protect, admin, createPlan);

// Get all subscription plans
router.get("/", getAllPlans);

// Get a single subscription plan by ID
router.get("/:id", getPlanById);

// Update a subscription plan
router.put("/:id", protect, admin, updatePlan);

// Delete a subscription plan
router.delete("/:id", protect, admin, deletePlan);

module.exports = router;
