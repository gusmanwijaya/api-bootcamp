const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

const config = require("../../../../config");
const Payment = require("./model");

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
        if (!req.file) {
          res.status(400).json({
            status: 400,
            message: "Please input an image!",
          });
        } else {
          const { type } = req.body;
          const payload = jwt.decode(req.token);

          const tmpPath = req.file?.path;
          const originalExtension =
            req.file?.originalname.split(".")[
              req.file?.originalname.split(".").length - 1
            ];
          const fileName = req.file?.filename + "." + originalExtension;
          const targetPath = path.resolve(
            config.rootPath,
            `public/images/${fileName}`
          );

          const src = fs.createReadStream(tmpPath);
          const dest = fs.createWriteStream(targetPath);

          src.pipe(dest);
          src.on("end", async () => {
            try {
              const data = await Payment.create({
                type,
                imageUrl: `images/${fileName}`,
                user: payload?.user?._id,
              });
              res.status(201).json({
                status: 201,
                data,
              });
            } catch (error) {
              next(error);
            }
          });
        }
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
        data = await Payment.find()
          .select("_id type imageUrl user")
          .populate("user", "_id name email role", "User");
      } else {
        data = await Payment.find({ user })
          .select("_id type imageUrl user")
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

      const data = await Payment.findOne({ _id: id })
        .select("_id type imageUrl user")
        .populate("user", "_id name email role", "User");

      if (!data)
        return res.status(404).json({
          status: 404,
          message: "Payment not found!",
        });

      res.status(200).json({
        status: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  destroy: async (req, res, next) => {
    try {
      const { id } = req.params;

      const payment = await Payment.findOne({ _id: id }).select("imageUrl");

      const currentImage = `${config.rootPath}/public/${payment?.imageUrl}`;
      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }

      await Payment.findOneAndDelete({ _id: id });

      res.status(202).json({
        status: 202,
        message: "Payment successfully deleted!",
      });
    } catch (error) {
      next(error);
    }
  },
};
