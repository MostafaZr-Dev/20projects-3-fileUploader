const fileService = require("../../services/filesService");
const dateService = require("../../services/dateService");

exports.files = (files) => {
  return files.map((file) => {
    const size = fileService.formatBytes(file.file_size);
    const thumbnail = fileService.getThumbnail(file.file_url);

    return {
      id: file.file_id,
      name: file.file_name,
      size,
      dimensions: file.file_dimensions,
      mimeType: file.file_mime_type,
      thumbnail,
      fileUrl: file.file_url,
      uploadedAt: dateService.formatDate(file.createdAt),
    };
  });
};
