const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['type1', 'type2', 'type3'],
    required: true,
  },
  option: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  details: {
    type: Object, 
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Complaint', complaintSchema);
