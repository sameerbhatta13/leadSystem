const mongoose = require("mongoose");

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
      type: String,
      enum: [
        "MERN Stack",
        "Python Django",
        "Flutter",
        "App Development",
        "Web Development",
        "Digital Marketing",
        "Ui/Ux Design",

      ],
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
  },
  {
    strict: false
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auth", authSchema);
