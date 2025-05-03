const mongoose = require("mongoose");

const PointSchema = new mongoose.Schema(
  {
    point_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    point_count: {
      type: Number,
      required: true,
      default: 0,
    },

    point_amount: {
      type: Number,
      required: true,
      default: 0,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Point", PointSchema);
