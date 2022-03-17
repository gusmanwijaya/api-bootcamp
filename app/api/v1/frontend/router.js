const express = require("express");
const router = express.Router();

const { transactionValidator } = require("../../../validator/transaction");
const {
  landingPage,
  detailPage,
  checkout,
  getPaymentMethod,
  getTransaction,
} = require("./controller");

router.get("/landing-page", landingPage);
router.get("/detail-page/:id", detailPage);
router.get("/payment-method", getPaymentMethod);
router.post("/checkout", transactionValidator, checkout);
router.get("/history-transaction/:id", getTransaction);

module.exports = router;
