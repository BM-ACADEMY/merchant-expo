const mongoose = require('mongoose');

const BannerPaymentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // assuming relation to users
    required: true,
    unique: true
  },
  days: {
    type: Number
  },
  amount: {
    type: Number
  },
  payment_status: {
    type: String
  },
  transaction_id: {
    type: String
  },
  status: {
    type: String,
    enum: ['Active', 'Expired', 'Cancelled'],
    default: 'Active',
    required: true
  }
}, {
timestamps:true
});

module.exports = mongoose.model('BannerPayment', BannerPaymentSchema);
