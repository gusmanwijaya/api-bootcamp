const express = require("express");
const router = express.Router();

const { signUpUserValidator } = require("../../../../validator/user");
const { signInValidator } = require("../../../../validator/auth");
const { signUp, signIn } = require("./controller");

router.post("/sign-up", signUpUserValidator, signUp);
router.post("/sign-in", signInValidator, signIn);

module.exports = router;
