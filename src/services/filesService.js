const fs = require("fs");
const path = require("path");

exports.formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

exports.getThumbnail = (url) => {
  const fileParts = url.split("/");

  const filename = fileParts.pop();

  const prefix = "thumbnail-";
  const thumbnailName = filename.padStart(
    filename.length + prefix.length,
    prefix
  );

  return `${fileParts.join("/")}/${thumbnailName}`;
};

exports.deleteFileFromDisk = (filePath) => {
  const mediaPath = path.resolve(__dirname, "../../public/uploads/media");

  const selectedFileName = filePath.split("/").pop();
  const selectedThumbnail = `thumbnail-${selectedFileName}`;

  const mediaFiles = fs.readdirSync(mediaPath);

  const filesForDelete = mediaFiles.filter(
    (filename) =>
      filename === selectedFileName || filename === selectedThumbnail
  );

  filesForDelete.forEach((filename) => {
    fs.unlinkSync(`${mediaPath}/${filename}`);
  });
};
