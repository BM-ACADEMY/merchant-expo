const express = require("express");
const {
  createPlan,

  getAllPlansForMapping,

  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlan,
} = require("../controllers/subscriptionPlanController");


const router = express.Router();

// Create a new subscription plan

router.post("/create-subscriptionplans", protect, admin, createPlan);

router.post("/create-subscriptionplans", createPlan);


// Get all subscription plans
router.get("/fetch-all-subscriptionplans", getAllPlans);


router.get("/fetch-all-subscriptionplans-for-mapping", getAllPlansForMapping);


// Get a single subscription plan by ID
router.get("/fetch-subscriptionplans-by-id/:id", getPlanById);

// Update a subscription plan

router.put("/update-subscriptionplans-by-id/:id", protect, admin, updatePlan);

// Delete a subscription plan
router.delete("/delete-subscriptions-plans-by-id/:id", protect, admin, deletePlan);

router.put("/update-subscriptionplans/:id", updatePlan);

// Delete a subscription plan
router.delete("/delete-subscriptionsplans/:id", deletePlan);


module.exports = router;
