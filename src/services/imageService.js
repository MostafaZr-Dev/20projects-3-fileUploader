const jimp = require("jimp");
const fs = require("fs");

exports.read = async (path) => {
  return await jimp.read(path);
};

exports.resize = async (width, height, path) => {
  const image = await this.read(path);

  await image.resize(width, height);

  return image;
};

exports.crop = async (width, height, path) => {
  const image = await this.read(path);

  await image.crop(
    image.bitmap.width / 2,
    image.bitmap.height / 2,
    width,
    height
  );

  return image;
};

exports.dimensions = async (path) => {
  const image = await this.read(path);
  return {
    width: image.bitmap.width,
    height: image.bitmap.height,
  };
};

exports.save = async (image, path) => {
  await image.write(path);
};
