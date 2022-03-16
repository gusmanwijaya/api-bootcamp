const { body } = require("express-validator");

module.exports = {
  speakerValidator: [
    body("name")
      .notEmpty()
      .withMessage("Name can't be empty!")
      .isLength({ max: 50 })
      .withMessage("Name maximal 50 characters!"),
    body("role")
      .notEmpty()
      .withMessage("Role can't be empty!")
      .isLength({ max: 50 })
      .withMessage("Role maximal 50 characters!"),
  ],
};
