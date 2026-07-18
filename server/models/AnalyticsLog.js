const mongoose = require("mongoose");

const analyticsLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AnalyticsLog", analyticsLogSchema);