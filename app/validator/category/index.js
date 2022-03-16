const { body } = require("express-validator");

module.exports = {
  categoryValidator: [
    body("name")
      .notEmpty()
      .withMessage("Name can't be empty!")
      .isLength({ max: 50 })
      .withMessage("Name maximal 50 characters!"),
  ],
};
