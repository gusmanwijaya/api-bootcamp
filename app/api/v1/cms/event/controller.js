const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

const config = require("../../../../config");
const Event = require("./model");
const { findOne } = require("./model");

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
          const {
            title,
            date,
            price,
            tagline,
            about,
            keypoint,
            vanueName,
            category,
            speaker,
          } = req.body;
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
              const data = await Event.create({
                title,
                cover: `images/${fileName}`,
                date,
                price,
                tagline,
                about,
                keypoint,
                vanueName,
                category,
                speaker,
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
      const data = await Event.find()
        .select(
          "_id title cover date price tagline about keypoint vanueName category speaker user"
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
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      const data = await Event.findOne({ _id: id })
        .select(
          "_id title cover date price tagline about keypoint vanueName category speaker user"
        )
        .populate("category", "_id name", "Category")
        .populate("speaker", "_id name avatar role", "Speaker")
        .populate("user", "_id name email role", "User");

      if (!data)
        return res.status(404).json({
          status: 404,
          message: "Event not found!",
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

      const event = await Event.findOne({ _id: id }).select("cover");

      const currentImage = `${config.rootPath}/public/${event?.cover}`;
      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }

      await Event.findOneAndDelete({ _id: id });

      res.status(202).json({
        status: 202,
        message: "Event successfully deleted!",
      });
    } catch (error) {
      next(error);
    }
  },
};
