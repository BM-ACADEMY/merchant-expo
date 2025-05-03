// models/Role.js
const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

const roleSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  role: {
    type: String,
    enum: ["USER", "MERCHANT", "SERVICE-PROVIDER","SUB-DEALER" ,"GROCERY-SELLER", "STUDENT", "ADMIN", "SUB-ADMIN"],
    required: true,
    unique: true,
  },
});

// Auto-increment role ID before saving
roleSchema.pre("save", async function (next) {
  if (!this.id) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "roleId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq;
  }
  next();
});

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;

