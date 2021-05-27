const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../boot/database/sequelize");

const Files = sequelize.define(
  "Files",
  {
    // Model attributes are defined here
    file_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    file_name: {
      type: DataTypes.STRING(255),
    },
    file_size: {
      type: DataTypes.INTEGER,
    },
    file_dimensions: {
      type: DataTypes.STRING(100),
    },
    file_mime_type: {
      type: DataTypes.STRING(100),
    },
    file_path: {
      type: DataTypes.STRING(255),
    },
    file_url: {
      type: DataTypes.STRING(255),
    },
  },
  {
    freezeTableName: true,
  }
);

Files.sync();

module.exports = Files;
