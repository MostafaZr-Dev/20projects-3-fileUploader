const express = require("express");

const filesController = require("../components/files/controller");
const multer = require("../middlewares/upload-engine/multer");

const router = express.Router();

router.get("/", filesController.files);
router.get("/upload", filesController.index);
router.post("/upload/save", multer, filesController.save);

router.post("/upload/delete/:id", filesController.delete);

module.exports = router;
