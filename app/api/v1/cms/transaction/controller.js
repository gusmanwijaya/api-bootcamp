const Transaction = require("./model");

module.exports = {
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
