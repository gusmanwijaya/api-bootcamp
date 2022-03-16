const express = require("express");
const router = express.Router();

const multer = require("multer");
const os = require("os");

const { isLogin } = require("../../../../middlewares/auth");
const { eventValidator } = require("../../../../validator/event");
const { create, getAll, getOne, destroy } = require("./controller");

router.use(isLogin);
router.post(
  "/create",
  multer({
    dest: os.tmpdir(),
  }).single("cover"),
  eventValidator,
  create
);
router.get("/get-all", getAll);
router.get("/get-one/:id", getOne);
router.delete("/destroy/:id", destroy);

module.exports = router;
