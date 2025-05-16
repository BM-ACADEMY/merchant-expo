const mongoose = require('mongoose');

const TrendingPointsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Assuming reference to a User collection
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId, // Assuming reference to a Product collection
    ref: 'Product',
    required: true
  },
  date: {
    type: String, // Format: "YYYY-MM-DD"
    required: true
  },
  trending_Points: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// 📌 Ensure one entry per user per product per day
TrendingPointsSchema.index({ user_id: 1, product_id: 1, date: 1 }, { unique: true });

const TrendingPoints = mongoose.model('TrendingPoints', TrendingPointsSchema);

module.exports = TrendingPoints;
