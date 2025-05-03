<<<<<<< HEAD
const SubscriptionPlan = require("../models/SubscriptionPlan");
=======
const SubscriptionPlan = require("../models/subscriptionPlanModel");
>>>>>>> Charles_bm

// Create a new subscription plan
exports.createPlan = async (req, res) => {
  try {
<<<<<<< HEAD
    const { plan_name, price, duration, description, features, status } = req.body;
=======
    const { plan_name, price, description, status } = req.body;
>>>>>>> Charles_bm

    const plan = new SubscriptionPlan({
      plan_name,
      price,
<<<<<<< HEAD
      duration,
      description,
      features,
=======
      description,
>>>>>>> Charles_bm
      status,
    });

    await plan.save();
<<<<<<< HEAD
    res.status(201).json({ message: "Subscription plan created", plan });
  } catch (error) {
    res.status(500).json({ message: error.message });
=======
    res
      .status(201)
      .json({ success: true, message: "Subscription plan created", plan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
>>>>>>> Charles_bm
  }
};

// Get all subscription plans
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find();
<<<<<<< HEAD
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
=======
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
>>>>>>> Charles_bm
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
<<<<<<< HEAD
    const { plan_name, price, duration, description, features, status } = req.body;
=======
    const { plan_name, price, description, status } = req.body;
>>>>>>> Charles_bm

    let plan = await SubscriptionPlan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Subscription plan not found" });
    }

    // Update fields
    plan.plan_name = plan_name || plan.plan_name;
    plan.price = price || plan.price;
<<<<<<< HEAD
    plan.duration = duration || plan.duration;
    plan.description = description || plan.description;
    plan.features = features || plan.features;
    plan.status = status || plan.status;

    await plan.save();
    res.status(200).json({ message: "Subscription plan updated", plan });
  } catch (error) {
    res.status(500).json({ message: error.message });
=======
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
>>>>>>> Charles_bm
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
<<<<<<< HEAD
    res.status(200).json({ message: "Subscription plan deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
=======
    res
      .status(200)
      .json({ success: true, message: "Subscription plan deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
>>>>>>> Charles_bm
  }
};
