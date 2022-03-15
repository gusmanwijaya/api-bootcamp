const { body } = require("express-validator");

module.exports = {
  signUpParticipantValidator: [
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
    body("password")
      .notEmpty()
      .withMessage("Password can't be empty!")
      .isStrongPassword()
      .withMessage(
        "Password must be at least eight chars long, one uppercase, one number, and one symbol!"
      ),
  ],
  signUpUserValidator: [
    body("name")
      .notEmpty()
      .withMessage("Name can't be empty!")
      .isLength({ max: 50 })
      .withMessage("Name maximal 50 characters!"),
    body("email")
      .notEmpty()
      .withMessage("Email can't be empty!")
      .isEmail()
      .withMessage("Please input a valid email!")
      .isLength({ max: 50 })
      .withMessage("Email maximal 50 characters!"),
    body("password")
      .notEmpty()
      .withMessage("Password can't be empty!")
      .isStrongPassword()
      .withMessage(
        "Password must be at least eight chars long, one uppercase, one number, and one symbol!"
      ),
  ],
  signInValidator: [
    body("email")
      .notEmpty()
      .withMessage("Email can't be empty!")
      .isEmail()
      .withMessage("Please input a valid email!"),
    body("password").notEmpty().withMessage("Password can't be empty!"),
  ],
  categoryValidator: [
    body("name")
      .notEmpty()
      .withMessage("Name can't be empty!")
      .isLength({ max: 50 })
      .withMessage("Name maximal 50 characters!"),
  ],
  userValidator: [
    body("name")
      .notEmpty()
      .withMessage("Name can't be empty!")
      .isLength({ max: 50 })
      .withMessage("Name maximal 50 characters!"),
  ],
};
