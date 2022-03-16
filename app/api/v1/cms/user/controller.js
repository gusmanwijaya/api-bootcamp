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
  changeEmail: async (req, res, next) => {
    try {
      const { id } = req.params;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = new Error("Invalid Input");
        error.errorStatus = 400;
        error.data = errors.array();
        throw error;
      } else {
        let user = await User.findOne({ _id: id }).select("_id email");
        if (!user) {
          res.status(404).json({
            status: 404,
            message: "User not found!",
          });
        } else {
          const { email } = req.body;
          const isAnyEmail = await User.countDocuments({ email });
          if (isAnyEmail > 0) {
            res.status(403).json({
              status: 403,
              message: "Email already registered!",
            });
          } else {
            user.email = email;
            const data = await user.save();
            res.status(200).json({
              status: 200,
              data,
            });
          }
        }
      }
    } catch (error) {
      next(error);
    }
  },
  changePassword: async (req, res, next) => {
    try {
      const { id } = req.params;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = new Error("Invalid Input");
        error.errorStatus = 400;
        error.data = errors.array();
        throw error;
      } else {
        let user = await User.findOne({ _id: id }).select("_id password");
        if (!user) {
          res.status(404).json({
            status: 404,
            message: "User not found!",
          });
        } else {
          const { currentPassword, newPassword, confirmNewPassword } = req.body;
          const checkPassword = await argon2.verify(
            user.password,
            currentPassword
          );
          if (checkPassword) {
            if (currentPassword === newPassword) {
              res.status(400).json({
                status: 400,
                message:
                  "The password you entered is the same as your current password!",
              });
            } else {
              if (newPassword !== confirmNewPassword) {
                res.status(400).json({
                  status: 400,
                  message:
                    "Your new password is not the same as the confirmation password!",
                });
              } else {
                const hashNewPassword = await argon2.hash(newPassword);
                user.password = hashNewPassword;
                const data = await user.save();
                res.status(200).json({
                  status: 200,
                  data,
                });
              }
            }
          } else {
            res.status(400).json({
              status: 400,
              message: "Your current password is wrong!",
            });
          }
        }
      }
    } catch (error) {
      next(error);
    }
  },
};
