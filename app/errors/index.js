module.exports = {
  handleError: (error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message || "Internal server error!";
    const data = error.data || null;

    res.status(status).json({
      status,
      message,
      data,
    });
  },
};
