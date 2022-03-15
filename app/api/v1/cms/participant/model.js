const mongoose = require("mongoose");

const participantSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      maxLength: 50,
      required: [true, "First name can't be empty!"],
    },
    lastName: {
      type: String,
      maxLength: 50,
      required: [true, "Last name can't be empty!"],
    },
    email: {
      type: String,
      maxLength: 50,
      required: [true, "Email can't be empty!"],
      unique: true,
    },
    role: {
      type: String,
      maxLength: 50,
      required: [true, "Role can't be empty!"],
    },
    password: {
      type: String,
      required: [true, "Password can't be empty!"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Participant", participantSchema);
