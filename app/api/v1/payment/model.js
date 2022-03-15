const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    type: {
      type: String,
      maxLength: 50,
      required: [true, "Type can't be empty!"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image Url can't be empty!"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
