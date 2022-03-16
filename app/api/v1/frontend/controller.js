const Event = require("../cms/event/model");

module.exports = {
  landingPage: async (req, res, next) => {
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
};
