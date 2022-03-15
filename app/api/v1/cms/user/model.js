const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 50,
      required: [true, "Name can't be empty!"],
    },
    email: {
      type: String,
      maxLength: 50,
      required: [true, "Email can't be empty!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password can't be empty!"],
    },
    role: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "superadmin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
