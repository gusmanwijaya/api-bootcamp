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
  participantValidator: [
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
    body("role")
      .notEmpty()
      .withMessage("Role can't be empty!")
      .isLength({ max: 50 })
      .withMessage("Role maximal 50 characters!"),
  ],
  participantChangeEmailValidator: [
    body("email")
      .notEmpty()
      .withMessage("Email can't be empty!")
      .isEmail()
      .withMessage("Please input a valid email!")
      .isLength({ max: 50 })
      .withMessage("Email maximal 50 characters!"),
  ],
  participantChangePasswordValidator: [
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
