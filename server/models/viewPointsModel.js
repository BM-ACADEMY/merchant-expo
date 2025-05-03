const mongoose = require('mongoose');

const ViewPointSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,  // Assuming user_id will be a reference to a User document
    required: true,
    unique: true,
    ref: 'User'
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,  // Assuming product_id will reference a Product document
    ref: 'Product',
    default: null
  },
  view_points: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const ViewPoint = mongoose.model('ViewPoint', ViewPointSchema);

module.exports = ViewPoint;
