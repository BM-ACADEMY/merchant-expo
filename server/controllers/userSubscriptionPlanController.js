const UserSubscription = require("../models/userSubscription");
const SubscriptionPlan = require("../models/");

// Create a new user subscription
exports.createSubscription = async (req, res) => {
  try {
    const { user_id, subscription_plan_id, end_date } = req.body;

    // Check if plan exists
    const plan = await SubscriptionPlan.findById(subscription_plan_id);
    if (!plan) {
      return res.status(404).json({ message: "Subscription plan not found" });
    }

    const subscription = new UserSubscription({
      user_id,
      subscription_plan_id,
      end_date,
      status: "Active",
    });

    await subscription.save();
    res.status(201).json({ message: "User subscribed successfully", subscription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all user subscriptions (Admin)
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await UserSubscription.find().populate("user_id subscription_plan_id");
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a user subscription by ID
exports.getSubscriptionById = async (req, res) => {
  try {
    const subscription = await UserSubscription.findById(req.params.id).populate("user_id subscription_plan_id");
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user subscription
exports.updateSubscription = async (req, res) => {
  try {
    const { end_date, status } = req.body;

    let subscription = await UserSubscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    // Update fields
    subscription.end_date = end_date || subscription.end_date;
    subscription.status = status || subscription.status;

    await subscription.save();
    res.status(200).json({ message: "Subscription updated", subscription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user subscription
exports.deleteSubscription = async (req, res) => {
  try {
    const subscription = await UserSubscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    await subscription.deleteOne();
    res.status(200).json({ message: "Subscription deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
