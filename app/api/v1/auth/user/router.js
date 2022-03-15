const express = require("express");
const router = express.Router();

const {
  signUpUserValidator,
  signInValidator,
} = require("../../../../validator");
const { signUp, signIn } = require("./controller");

router.post("/sign-up", signUpUserValidator, signUp);
router.post("/sign-in", signInValidator, signIn);

module.exports = router;
