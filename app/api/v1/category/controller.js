const Category = require("./model");

module.exports = {
  create: async (req, res) => {
    try {
      const {} = req.body;
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message || "Internal server error!",
      });
    }
  },
};
