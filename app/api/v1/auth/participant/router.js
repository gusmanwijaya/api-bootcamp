const express = require("express");
const router = express.Router();

const { signIn, signUp } = require("./controller");
const { signInValidator } = require("../../../../validator/auth");
const {
  signUpParticipantValidator,
} = require("../../../../validator/participant");

router.post("/sign-up", signUpParticipantValidator, signUp);
router.post("/sign-in", signInValidator, signIn);

module.exports = router;
