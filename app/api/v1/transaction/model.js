const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    personalDetail: {
      type: Object,
      required: [true, "Personal detail can't be empty!"],
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    historyEvent: {
      type: Object,
      required: [true, "History event can't be empty!"],
    },
    historyPayment: {
      type: Object,
      required: [true, "History payment can't be empty!"],
    },
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Participant",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
