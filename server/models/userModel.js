const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  referral_code: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    sparse: true,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  gender:{
    type:String,

  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  number_otp: {
    type: String,
  },
  password:{
    type:String
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
  profile_pic:{
    type:String
  },
  date_of_birth:{
    type:Date
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Auto-generate referral code and default role before saving
userSchema.pre("save", async function (next) {
  if (!this.referral_code) {
    this.referral_code = this.name.substring(0, 2).toUpperCase() + this.phone;
  }

  if (!this.role) {
    const defaultRole = await mongoose.model("Role").findOne({ role: "USER" });
    if (defaultRole) {
      this.role = defaultRole._id;
    }
  }

  this.updated_at = new Date();
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
