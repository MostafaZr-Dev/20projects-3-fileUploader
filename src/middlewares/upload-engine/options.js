const path = require("path");
const baseDir = path.resolve(__dirname, "../../../public/uploads");

module.exports = {
  baseDir: baseDir,
  baseMedia: `${baseDir}/media`,
  allowedFormats: ["image/jpeg", "image/png", "image/gif"],
  storage: "disk",
};
