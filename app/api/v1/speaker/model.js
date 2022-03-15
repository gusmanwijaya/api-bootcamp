const mongoose = require("mongoose");

const speakerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 50,
      required: [true, "Name can't be empty!"],
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      maxLength: 50,
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

module.exports = mongoose.model("Speaker", speakerSchema);
