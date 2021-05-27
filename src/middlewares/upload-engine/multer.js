const multer = require("multer");

const StorageManager = require("./storages/StorageManager");
const options = require("./options");

const storage = new StorageManager({
  configs: options,
}).get(options.storage);

const fileFilter = (req, file, cb) => {
  console.log("type", file.mimetype);
  if (!options.allowedFormats.includes(file.mimetype)) {
    return cb(
      new multer.MulterError(
        "IMAGE_TYPE_ERROR",
        "Invalid file type. Only jpg, png and gif image files are allowed."
      )
    );
  }

  cb(null, true);
};

const upload = multer({ storage, fileFilter }).array("upload-files");

module.exports = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      return next(error);
    }

    next();
  });
};
