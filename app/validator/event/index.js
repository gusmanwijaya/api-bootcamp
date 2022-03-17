const { body } = require("express-validator");

module.exports = {
  eventValidator: [
    body("title")
      .notEmpty()
      .withMessage("Title can't be empty!")
      .isLength({ max: 50 })
      .withMessage("Title maximal 50 characters!"),
    body("date").notEmpty().withMessage("Date can't be empty!"),
    body("city")
      .notEmpty()
      .withMessage("City can't be empty!")
      .isLength({ max: 50 })
      .withMessage("City maximal 50 characters!"),
    body("price").isNumeric().withMessage("Price must be a number!"),
    body("tagline")
      .notEmpty()
      .withMessage("Tagline can't be empty!")
      .isLength({ max: 50 })
      .withMessage("Tagline maximal 50 characters!"),
    body("about").notEmpty().withMessage("About can't be empty!"),
    body("keypoint").notEmpty().withMessage("Keypoint can't be empty!"),
    body("vanueName")
      .notEmpty()
      .withMessage("Vanue name can't be empty!")
      .isLength({ max: 50 })
      .withMessage("Vanue name maximal 50 characters!"),
  ],
};
