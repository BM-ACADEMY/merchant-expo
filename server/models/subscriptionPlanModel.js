const mongoose = require("mongoose");

const subscriptionPlanSchema = mongoose.Schema(
  {
    plan_name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    features: {
      type: Array, // Stored as JSON array
      default: [],
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

module.exports = mongoose.model("SubscriptionPlan", subscriptionPlanSchema);
