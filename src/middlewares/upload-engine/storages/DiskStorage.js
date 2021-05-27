const fs = require("fs");
const hashService = require("../../../services/hashService");
const imageService = require("../../../services/imageService");

class DiskStorage {
  constructor(options) {
    this.destination = options?.destination || this._getDistination;
    this.baseDir = options?.configs.baseDir;
    this.baseMedia = options?.configs.baseMedia;
  }

  _existsDir(path) {
    return fs.existsSync(path);
  }

  _getDistination(req, file, cb) {
    if (!this._existsDir(this.baseMedia)) {
      fs.mkdirSync(this.baseMedia, { recursive: true });
    }

    const fileName = this._generateFileName(file);

    cb(null, `${this.baseMedia}/${fileName}`);
  }

  _generateFileName(file) {
    const fileExtension = file.originalname.split(".").pop();

    return `${hashService.generateID()}.${fileExtension}`;
  }

  _handleFile(req, file, cb) {
    this._getDistination(req, file, (error, path) => {
      if (error) return cb(error.message);
      
      const outputStream = fs.createWriteStream(path);

      file.stream.pipe(outputStream);

      outputStream.on("error", cb);

      outputStream.on("finish", async () => {
        const resizedImage = await imageService.resize(200, 200, path);

        const { width, height } = await imageService.dimensions(path);

        const filename = path.split("/").pop();
        const thumbnailPath = `${this.baseMedia}/thumbnail-${filename}`;

        await imageService.save(resizedImage, thumbnailPath);

        cb(null, {
          size: outputStream.bytesWritten,
          path,
          thumbnail: thumbnailPath,
          baseDir: this.baseDir,
          baseMedia: this.baseMedia,
          name: filename,
          dimensions: `${width} * ${height}`,
          width,
          height,
        });
      });
    });
  }

  _removeFile(req, file, cb) {}
}

module.exports = DiskStorage;
