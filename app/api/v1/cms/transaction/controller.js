const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Transaction = require("./model");
const Event = require("../event/model");
const Payment = require("../payment/model");

module.exports = {
  create: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = new Error("Invalid Input");
        error.errorStatus = 400;
        error.data = errors.array();
        throw error;
      } else {
        const { event, firstName, lastName, email, role, payment } = req.body;
        const personalDetail = {
          firstName,
          lastName,
          email,
          role,
        };
        const payload = jwt.decode(req.token);
        const historyEvent = await Event.findOne({ _id: event })
          .select(
            "_id title cover date price tagline about keypoint vanueName category speaker user"
          )
          .populate("category", "_id name", "Category")
          .populate("speaker", "_id name avatar role", "Speaker")
          .populate("user", "_id name email role", "User");
        const historyPayment = await Payment.findOne({ _id: payment })
          .select("_id type imageUrl user")
          .populate("user", "_id name email role", "User");

        const data = await Transaction.create({
          event,
          personalDetail,
          payment,
          historyEvent,
          historyPayment,
          participant: payload?.participant?._id,
        });

        res.status(201).json({
          status: 201,
          data,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const data = await Transaction.find()
        .select("_id personalDetail historyEvent historyPayment participant")
        .populate(
          "participant",
          "_id firstName lastName email role",
          "Participant"
        );

      res.status(200).json({
        status: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      const data = await Transaction.findOne({ _id: id })
        .select("_id personalDetail historyEvent historyPayment participant")
        .populate(
          "participant",
          "_id firstName lastName email role",
          "Participant"
        );

      if (!data) {
        res.status(404).json({
          status: 404,
          message: "Transaction not found!",
        });
      } else {
        res.status(200).json({
          status: 200,
          data,
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
