const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

const config = require("../../../../config");
const Speaker = require("./model");

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
          const { name, role } = req.body;
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
              const data = await Speaker.create({
                name,
                avatar: `images/${fileName}`,
                role,
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
        data = await Speaker.find()
          .select("_id name avatar role user")
          .populate("user", "_id name email role", "User");
      } else {
        data = await Speaker.find({ user })
          .select("_id name avatar role user")
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

      const data = await Speaker.findOne({ _id: id })
        .select("_id name avatar role user")
        .populate("user", "_id name email role", "User");

      if (!data)
        return res.status(404).json({
          status: 404,
          message: "Speaker not found!",
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

      const speaker = await Speaker.findOne({ _id: id }).select("avatar");

      const currentImage = `${config.rootPath}/public/${speaker?.avatar}`;
      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }

      await Speaker.findOneAndDelete({ _id: id });

      res.status(202).json({
        status: 202,
        message: "Speaker successfully deleted!",
      });
    } catch (error) {
      next(error);
    }
  },
};
