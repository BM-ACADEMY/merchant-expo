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
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("SubscriptionPlan", subscriptionPlanSchema);
