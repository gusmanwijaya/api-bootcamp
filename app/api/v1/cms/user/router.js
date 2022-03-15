const express = require("express");
const router = express.Router();

const { isLogin } = require("../../../../middlewares/auth");
const { userValidator } = require("../../../../validator");
const { getAll, getOne, update, destroy } = require("./controller");

router.use(isLogin);
router.get("/get-all", getAll);
router.get("/get-one/:id", getOne);
router.put("/update/:id", userValidator, update);
router.delete("/destroy/:id", destroy);

module.exports = router;
