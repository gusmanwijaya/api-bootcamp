const { body } = require("express-validator");

module.exports = {
  paymentValidator: [
    body("type")
      .notEmpty()
      .withMessage("Type can't be empty!")
      .isLength({ max: 50 })
      .withMessage("Type maximal 50 characters!"),
  ],
};
