const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const { validationResult } = require("express-validator");

const config = require("../../../../config");
const User = require("../../cms/user/model");

module.exports = {
  signUp: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = new Error("Invalid Input");
        error.errorStatus = 400;
        error.data = errors.array();
        throw error;
      } else {
        const { name, email, password } = req.body;

        const countDocsUser = await User.countDocuments({ email });
        if (countDocsUser > 0)
          return res.status(403).json({
            status: 403,
            message: "Email already registered!",
          });

        const hashPassword = await argon2.hash(password);
        const data = await User.create({
          name,
          email,
          password: hashPassword,
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
  signIn: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = new Error("Invalid Input");
        error.errorStatus = 400;
        error.data = errors.array();
        throw error;
      } else {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select(
          "_id name email password"
        );
        if (!user) {
          res.status(404).json({
            status: 404,
            message: "Your email is not registered yet!",
          });
        } else {
          const checkPassword = await argon2.verify(user?.password, password);
          if (!checkPassword) {
            res.status(400).json({
              status: 400,
              message: "Your password is wrong!",
            });
          } else {
            const token = jwt.sign(
              {
                user: {
                  _id: user?._id,
                  name: user?.name,
                  email: user?.email,
                },
              },
              config.jwtKey
            );

            res.status(200).json({
              status: 200,
              data: token,
            });
          }
        }
      }
    } catch (error) {
      next(error);
    }
  },
};
