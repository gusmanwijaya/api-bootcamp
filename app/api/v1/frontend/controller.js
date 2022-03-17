const { validationResult } = require("express-validator");
const Event = require("../cms/event/model");
const Payment = require("../cms/payment/model");
const Transaction = require("../cms/transaction/model");

module.exports = {
  landingPage: async (req, res, next) => {
    try {
      const data = await Event.find()
        .select(
          "_id title cover date city price tagline about keypoint vanueName category speaker user"
        )
        .populate("category", "_id name", "Category")
        .populate("speaker", "_id name avatar role", "Speaker")
        .populate("user", "_id name email role", "User");

      res.status(200).json({
        status: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  detailPage: async (req, res, next) => {
    try {
      const { id } = req.params;

      const data = await Event.findOne({ _id: id })
        .select(
          "_id title cover date city price tagline about keypoint vanueName category speaker user"
        )
        .populate("category", "_id name", "Category")
        .populate("speaker", "_id name avatar role", "Speaker")
        .populate("user", "_id name email role", "User");

      if (!data) {
        res.status(404).json({
          status: 404,
          message: "Event not found!",
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
  getPaymentMethod: async (req, res, next) => {
    try {
      const data = await Payment.find()
        .select("_id type imageUrl user")
        .populate("user", "_id name email role", "User");

      res.status(200).json({
        status: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  checkout: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = new Error("Invalid Input");
        error.errorStatus = 400;
        error.data = errors.array();
        throw error;
      } else {
        const { event, personalDetail, payment, participant } = req.body;

        if (personalDetail && Object.keys(personalDetail).length > 0) {
          const historyEvent = await Event.findOne({ _id: event })
            .select(
              "_id title cover date city price tagline about keypoint vanueName category speaker user"
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
            participant,
          });

          res.status(201).json({
            status: 201,
            data,
          });
        } else {
          res.status(400).json({
            status: 400,
            message: "Personal detail can't be empty object!",
          });
        }
      }
    } catch (error) {
      next(error);
    }
  },
  getTransaction: async (req, res, next) => {
    try {
      const { id } = req.params;

      const data = await Transaction.find({ participant: id })
        .select(
          "_id personalDetail historyEvent historyPayment participant createdAt"
        )
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
};
