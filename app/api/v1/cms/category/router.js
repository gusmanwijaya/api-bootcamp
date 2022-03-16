const express = require("express");
const router = express.Router();

const { isLogin } = require("../../../../middlewares/auth");
const { categoryValidator } = require("../../../../validator/category");
const { create, getAll, getOne, update, destroy } = require("./controller");

router.use(isLogin);
router.post("/create", categoryValidator, create);
router.get("/get-all", getAll);
router.get("/get-one/:id", getOne);
router.put("/update/:id", categoryValidator, update);
router.delete("/destroy/:id", destroy);

module.exports = router;
