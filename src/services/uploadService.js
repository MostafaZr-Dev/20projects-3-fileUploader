const FilesModel = require("../models/files");

exports.getFiles = async () => {
  try {
    const result = await FilesModel.findAll({
      order: [["createdAt", "DESC"]],
    });

    return {
      success: true,
      files: result.map((file) => file.dataValues),
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

exports.saveFiles = async (files) => {
  try {
    const result = await FilesModel.bulkCreate(files);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

exports.getFile = async (id) => {
  try {
    const result = await FilesModel.findOne({
      where: {
        file_id: id,
      },
    });

    return {
      success: true,
      file: result.dataValues,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

exports.deleteFile = async (id) => {
  try {
    const result = await FilesModel.destroy({
      where: {
        file_id: id,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
