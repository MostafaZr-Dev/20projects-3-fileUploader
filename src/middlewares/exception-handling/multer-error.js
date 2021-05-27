const { MulterError } = require("multer");

module.exports = (error, req, res, next) => {
  if (error instanceof MulterError) {
    req.flash("errors", [error.field]);

    return res.status(422).send({ success: false });
  }

  next(error);
};
