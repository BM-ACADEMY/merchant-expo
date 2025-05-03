// models/FaqQuestion.js
const mongoose = require('mongoose');

const FaqQuestionSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FaqTopic',
    required: true,
  },
  question: {
    type: String,
    required: true,
    trim: true,
  },
  answer: {
    type: String,
    default: '', 
    trim: true,
  },
  role: {
    type: String,
    enum: ['buyer', 'seller', 'both'],
    default: 'both',
  },
  askedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  answeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isPublished: {
    type: Boolean,
    default: false, 
  },

},{
  timestamps:true,
});

module.exports = mongoose.model('FaqQuestion', FaqQuestionSchema);
