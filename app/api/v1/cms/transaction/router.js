const express = require("express");
const router = express.Router();

const { isLogin } = require("../../../../middlewares/auth");
const { getAll, getOne } = require("./controller");

router.use(isLogin);
router.get("/get-all", getAll);
router.get("/get-one/:id", getOne);

module.exports = router;
