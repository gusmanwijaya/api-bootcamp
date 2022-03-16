const express = require("express");
const router = express.Router();

const { isLogin } = require("../../../../middlewares/auth");
const {
  participantValidator,
  participantChangeEmailValidator,
  participantChangePasswordValidator,
} = require("../../../../validator/participant");
const {
  getAll,
  getOne,
  update,
  changeEmail,
  changePassword,
  destroy,
} = require("./controller");

router.use(isLogin);
router.get("/get-all", getAll);
router.get("/get-one/:id", getOne);
router.put("/update/:id", participantValidator, update);
router.put("/change-email/:id", participantChangeEmailValidator, changeEmail);
router.put(
  "/change-password/:id",
  participantChangePasswordValidator,
  changePassword
);
router.delete("/destroy/:id", destroy);

module.exports = router;
