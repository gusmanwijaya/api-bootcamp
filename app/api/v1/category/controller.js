const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Category = require("./model");

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
        const { name } = req.body;
        const payload = jwt.decode(req.token);
        const data = await Category.create({ name, user: payload?.user?._id });
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
      const { user } = req.query;
      let data;

      if (!user) {
        data = await Category.find()
          .select("_id name user")
          .populate("user", "_id name email role", "User");
      } else {
        data = await Category.find({ user })
          .select("_id name user")
          .populate("user", "_id name email role", "User");
      }

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

      const data = await Category.findOne({ _id: id })
        .select("_id name user")
        .populate("user", "_id name email role", "User");

      if (!data)
        return res.status(404).json({
          status: 404,
          message: "Category not found!",
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

        let category = await Category.findOne({ _id: id }).select(
          "_id name user"
        );
        if (!category) {
          res.status(404).json({
            status: 404,
            message: "Category not found!",
          });
        } else {
          category.name = name;
          const data = await category.save();
          res.status(200).json({
            status: 200,
            data,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  },
  destroy: async (req, res, next) => {
    try {
      const { id } = req.params;

      await Category.findOneAndDelete({ _id: id });

      res.status(202).json({
        status: 202,
        message: "Category successfully deleted!",
      });
    } catch (error) {
      next(error);
    }
  },
};
