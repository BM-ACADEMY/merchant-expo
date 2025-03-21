const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
 
  },
  referral_code: {
    type: String,
  },
  email: {
    type: String,
    sparse: true,
    unique:true
  },
  phone: {
    type: String,
    unique: true,
  },
  number_otp: {
    type: String,
  },
  number_verified: {
    type: Boolean,
    default: false,
  },
  email_otp: {
    type: String,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
