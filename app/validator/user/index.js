const { body } = require("express-validator");

module.exports = {
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
  userValidator: [
    body("name")
      .notEmpty()
      .withMessage("Name can't be empty!")
      .isLength({ max: 50 })
      .withMessage("Name maximal 50 characters!"),
  ],
  userChangeEmailValidator: [
    body("email")
      .notEmpty()
      .withMessage("Email can't be empty!")
      .isEmail()
      .withMessage("Please input a valid email!")
      .isLength({ max: 50 })
      .withMessage("Email maximal 50 characters!"),
  ],
  userChangePasswordValidator: [
    body("currentPassword")
      .notEmpty()
      .withMessage("Current password can't be empty!"),
    body("newPassword")
      .notEmpty()
      .withMessage("New password can't be empty!")
      .isStrongPassword()
      .withMessage(
        "New password must be at least eight chars long, one uppercase, one number, and one symbol!"
      ),
    body("confirmNewPassword")
      .notEmpty()
      .withMessage("Confirmation new password can't be empty!"),
  ],
};
