const { validationResult } = require("express-validator");
const argon2 = require("argon2");

const User = require("./model");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const data = await User.find().select("_id name email role");
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
      const data = await User.findOne({ _id: id }).select(
        "_id name email role"
      );
      if (!data)
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      res.status(200).json({
        status: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = new Error("Invalid Input");
        error.errorStatus = 400;
        error.data = errors.array();
        throw error;
      } else {
        const { name } = req.body;

        let user = await User.findOne({ _id: id }).select(
          "_id name email role"
        );
        if (!user)
          return res.status(404).json({
            status: 404,
            message: "User not found!",
          });

        user.name = name;
        const data = await user.save();

        res.status(200).json({
          status: 200,
          data,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  destroy: async (req, res, next) => {
    try {
      const { id } = req.params;
      await User.findOneAndDelete({ _id: id });
      res.status(202).json({
        status: 202,
        message: "User successfully deleted!",
      });
    } catch (error) {
      next(error);
    }
  },
};
