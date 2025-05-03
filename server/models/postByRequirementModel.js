const mongoose = require('mongoose');

const PostByRequirementSchema = new mongoose.Schema({
  product_or_service: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unit_of_measurement: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  supplier_preference: {
    type: String,
    enum: ['All India', 'Near Me', 'Specific States'],
    required: true
  },
  selected_states: {
    type: [String],
    default: []
  }
}, { timestamps: true });

// Export the model
module.exports = mongoose.model('PostByRequirement', PostByRequirementSchema);
