const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    project: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    followup: {
      type: Date,
      default: Date.now() + 20 * 60 * 60 * 1000 * 24,
    },
    status: {
      type: String,
      enum: ["active", "followup", "cancel"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auth", authSchema);
