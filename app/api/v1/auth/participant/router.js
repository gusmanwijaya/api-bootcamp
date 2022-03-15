const express = require("express");
const router = express.Router();

const { signIn, signUp } = require("./controller");
const {
  signUpParticipantValidator,
  signInValidator,
} = require("../../../../validator");

router.post("/sign-up", signUpParticipantValidator, signUp);
router.post("/sign-in", signInValidator, signIn);

module.exports = router;
