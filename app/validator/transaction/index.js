const { body } = require("express-validator");

module.exports = {
  transactionValidator: [
    body("event")
      .notEmpty()
      .withMessage("Event can't be empty!")
      .isMongoId()
      .withMessage("Event must be an ObjectId"),
    body("personalDetail")
      .notEmpty()
      .withMessage("Personal detail can't be empty!")
      .isObject()
      .withMessage("Personal detail must be an object!"),
    body("payment")
      .notEmpty()
      .withMessage("Payment can't be empty!")
      .isMongoId()
      .withMessage("Payment must be an ObjectId"),
    body("participant")
      .notEmpty()
      .withMessage("Participant can't be empty!")
      .isMongoId()
      .withMessage("Participant must be an ObjectId"),
  ],
};
