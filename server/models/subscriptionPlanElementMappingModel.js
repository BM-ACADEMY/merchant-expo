
const mongoose = require('mongoose');

const SubscriptionPlanElementMappingSchema = new mongoose.Schema({
  subscription_plan_id: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: 'SubscriptionPlan' 
  },
  element_id: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: 'SubscriptionPlanElement'
  },
  value: {
    type: String,
    maxlength: 255,
    default: null
  },
}, {
  timestamps: true 
});

module.exports = mongoose.model('SubscriptionPlanElementMapping', SubscriptionPlanElementMappingSchema);

