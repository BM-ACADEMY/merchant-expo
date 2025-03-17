const SubscriptionPlan = require("../models/SubscriptionPlan");

// Create a new subscription plan
exports.createPlan = async (req, res) => {
  try {
    const { plan_name, price, duration, description, features, status } = req.body;

    const plan = new SubscriptionPlan({
      plan_name,
      price,
      duration,
      description,
      features,
      status,
    });

    await plan.save();
    res.status(201).json({ message: "Subscription plan created", plan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all subscription plans
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const { plan_name, price, duration, description, features, status } = req.body;

    let plan = await SubscriptionPlan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Subscription plan not found" });
    }

    // Update fields
    plan.plan_name = plan_name || plan.plan_name;
    plan.price = price || plan.price;
    plan.duration = duration || plan.duration;
    plan.description = description || plan.description;
    plan.features = features || plan.features;
    plan.status = status || plan.status;

    await plan.save();
    res.status(200).json({ message: "Subscription plan updated", plan });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(200).json({ message: "Subscription plan deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
