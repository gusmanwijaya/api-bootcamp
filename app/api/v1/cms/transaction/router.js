const express = require("express");
const router = express.Router();

const { isLogin } = require("../../../../middlewares/auth");
const { transactionValidator } = require("../../../../validator/transaction");
const { create, getAll, getOne } = require("./controller");

router.use(isLogin);
router.post("/create", transactionValidator, create);
router.get("/get-all", getAll);
router.get("/get-one/:id", getOne);

module.exports = router;
