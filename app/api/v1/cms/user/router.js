const express = require("express");
const router = express.Router();

const { isLogin } = require("../../../../middlewares/auth");
const {
  userValidator,
  userChangeEmailValidator,
  userChangePasswordValidator,
} = require("../../../../validator");
const {
  getAll,
  getOne,
  update,
  destroy,
  changeEmail,
  changePassword,
} = require("./controller");

router.use(isLogin);
router.get("/get-all", getAll);
router.get("/get-one/:id", getOne);
router.put("/update/:id", userValidator, update);
router.delete("/destroy/:id", destroy);
router.put("/change-email/:id", userChangeEmailValidator, changeEmail);
router.put("/change-password/:id", userChangePasswordValidator, changePassword);

module.exports = router;
