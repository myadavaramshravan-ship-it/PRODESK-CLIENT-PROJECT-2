const mongoose = require("mongoose");

const qrScanLogSchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },

    scannedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    scanTime: {
      type: Date,
      default: Date.now,
    },

    device: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("QRScanLog", qrScanLogSchema);