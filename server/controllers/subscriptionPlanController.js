const SubscriptionPlan = require("../models/subscriptionPlanModel");

// Create a new subscription plan
exports.createPlan = async (req, res) => {
  try {
    const { plan_name, price, description, status } = req.body;

    const plan = new SubscriptionPlan({
      plan_name,
      price,
      description,
      status,
    });

    await plan.save();
    res
      .status(201)
      .json({ success: true, message: "Subscription plan created", plan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all subscription plans
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find();
    res.status(200).json({
      success: true,
      message: "Fetch Plan Successfully",
      data: plans,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllPlansForMapping = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find();
    res.status(200).json({
      success: true,
      message: "Fetch Plan Successfully",
      data: plans,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single subscription plan by ID
exports.getPlanById = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Subscription plan not found" });
    }
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a subscription plan
exports.updatePlan = async (req, res) => {
  try {
    const { plan_name, price, description, status } = req.body;

    let plan = await SubscriptionPlan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Subscription plan not found" });
    }

    // Update fields
    plan.plan_name = plan_name || plan.plan_name;
    plan.price = price || plan.price;
    plan.description = description || plan.description;
    plan.status = status || plan.status;

    await plan.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Subscription plan updated",
        data: plan,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a subscription plan
exports.deletePlan = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Subscription plan not found" });
    }

    await plan.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Subscription plan deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};