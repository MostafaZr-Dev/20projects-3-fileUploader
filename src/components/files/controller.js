const fs = require("fs");

const uploadService = require("../../services/uploadService");
const filesService = require("../../services/filesService");
const fileTransformer = require("./transformer");

exports.files = async (req, res) => {
  const result = await uploadService.getFiles();

  let message = null;
  if (!result.success) {
    message = "something went wrong!";
  }

  const { files } = result;

  const transformedFiles = fileTransformer.files(files);

  res.renderPage("pages/files", {
    files: transformedFiles,
    message,
    filesExist: transformedFiles.length > 0,
    helpers: {
      currentFile: function (id) {
        const current = transformedFiles.filter((file) => file.id === id).pop();

        return JSON.stringify({
          id: current.id,
          name: current.name,
          url: current.fileUrl,
        });
      },
    },
  });
};

exports.index = async (req, res) => {
  res.renderPage("pages/upload");
};

exports.save = async (req, res) => {
  const files = req.files;

  const { protocol, hostname } = req;
  const port = req.app.get("port");

  const baseUrl = `${protocol}://${hostname}${port ? `:${port}` : ""}`;

  const filesData = files.map((file) => {
    return {
      file_name: file.name.split(".").shift(),
      file_size: file.size,
      file_dimensions: file.dimensions,
      file_mime_type: file.mimetype,
      file_path: file.path,
      file_url: `${baseUrl}/uploads/media/${file.name}`,
    };
  });

  const result = await uploadService.saveFiles(filesData);

  req.flash("message", "Successfully File Uploaded.");

  res.status(201).send({
    success: true,
  });
  
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  const result = await uploadService.getFile(id);

  if (!result.success) {
  }

  const { file } = result;

  await uploadService.deleteFile(id);

  filesService.deleteFileFromDisk(file.file_path);

  req.flash("message", "Successfully Delete File.");
  res.redirect("/");
};
