const jwt = require("jsonwebtoken");
const config = require("../config");

const Participant = require("../api/v1/participant/model");
const User = require("../api/v1/user/model");

module.exports = {
  isLogin: async (req, res, next) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : null;

      const data = jwt.verify(token, config.jwtKey);

      const participant = await Participant.findOne({
        _id: data?.participant?._id,
      }).select("_id firstName lastName email role");

      if (participant) {
        req.participant = participant;
        req.token = token;
        next();
      } else {
        const user = await User.findOne({ _id: data?.user?._id }).select(
          "_id name email role"
        );
        if (user) {
          req.user = user;
          req.token = token;
          next();
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      res.status(401).json({
        status: 401,
        message: "Sorry, please sign in first!",
      });
    }
  },
};
