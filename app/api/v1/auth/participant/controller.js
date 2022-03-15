const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const { validationResult } = require("express-validator");

const config = require("../../../../config");
const Participant = require("../../cms/participant/model");

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
        const { firstName, lastName, email, role, password } = req.body;

        const countDocsEmail = await Participant.countDocuments({ email });
        if (countDocsEmail > 0)
          return res.status(403).json({
            status: 403,
            message: "Email already registered!",
          });

        const hashPassword = await argon2.hash(password);

        const data = await Participant.create({
          firstName,
          lastName,
          email,
          role,
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

        const participant = await Participant.findOne({ email }).select(
          "_id firstName lastName email role password"
        );
        if (!participant) {
          res.status(404).json({
            status: 404,
            message: "Your email is not registered yet!",
          });
        } else {
          const checkPassword = await argon2.verify(
            participant?.password,
            password
          );
          if (checkPassword) {
            const token = jwt.sign(
              {
                participant: {
                  _id: participant?._id,
                  firstName: participant?.firstName,
                  lastName: participant?.lastName,
                  email: participant?.email,
                  role: participant?.role,
                },
              },
              config.jwtKey
            );

            res.status(200).json({
              status: 200,
              data: token,
            });
          } else {
            res.status(400).json({
              status: 400,
              message: "Your password is wrong!",
            });
          }
        }
      }
    } catch (error) {
      next(error);
    }
  },
};
