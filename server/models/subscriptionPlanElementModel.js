

const mongoose = require('mongoose');

const SubscriptionPlanElementSchema = new mongoose.Schema({
  element_name: {
    type: String,
    required: true,
    maxlength: 255
  }
}, {
  timestamps: true // to match Sequelize config
});

module.exports = mongoose.model('SubscriptionPlanElement', SubscriptionPlanElementSchema);

