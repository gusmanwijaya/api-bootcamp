const { body } = require("express-validator");

module.exports = {
  transactionValidator: [
    body("firstName")
      .notEmpty()
      .withMessage("First name can't be empty!")
      .isLength({ max: 50 })
      .withMessage("First name maximal 50 characters!"),
    body("lastName")
      .notEmpty()
      .withMessage("Last name can't be empty!")
      .isLength({ max: 50 })
      .withMessage("Last name maximal 50 characters!"),
    body("email")
      .notEmpty()
      .withMessage("Email can't be empty!")
      .isEmail()
      .withMessage("Please input a valid email!")
      .isLength({ max: 50 })
      .withMessage("Email maximal 50 characters!"),
    body("role")
      .notEmpty()
      .withMessage("Role can't be empty!")
      .isLength({ max: 50 })
      .withMessage("Role maximal 50 characters!"),
  ],
};
