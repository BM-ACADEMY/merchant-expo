const mongoose = require('mongoose');

const productQuoteSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',   // or whatever your user model is called
    required: true,
  },
  productOwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',   // or whatever your user model is called
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  matchQuotes: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const ProductQuote = mongoose.model('ProductQuote', productQuoteSchema);

module.exports = ProductQuote;
