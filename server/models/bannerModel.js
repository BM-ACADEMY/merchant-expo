const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  subcription_id: {
    type: String,
    required: true,
    maxlength: 255
  },
  banner_payment_id: {
    type: String,
    required: true,
    maxlength: 255
  },
  title: {
    type: String
  },
  circle_logo: {
    type: String
  },
  banner_image: {
    type: String
  },
  rectangle_logo: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
timestamps:true
});

module.exports = mongoose.model('Banner', BannerSchema);
