const { body } = require("express-validator");

module.exports = {
  signInValidator: [
    body("email")
      .notEmpty()
      .withMessage("Email can't be empty!")
      .isEmail()
      .withMessage("Please input a valid email!"),
    body("password").notEmpty().withMessage("Password can't be empty!"),
  ],
};
