const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema

const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    service: {
      type: ObjectId,
      ref: 'Service',
      required: true,
    },
    total_budget: {
      type: Number,
    },
    installment: {
      type: [Number],
    },
    status: {
      type: String,
      enum: ["Active", "Follow Up", "Cancel", "Client", "Student"],
      default: "Active",
    },
    followUp: {
      type: Date,
    },
    isFollowUp: {
      type: Boolean,
      default: false

    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    remarks: {
      type: String,
    },

  }, { timestamps: true, strict: false });

module.exports = mongoose.model("Auth", authSchema);
