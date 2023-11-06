const multer = require("multer");
const cloudinary = require("../config/db/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "dormitory",
    allowedFormats: ["jpg", "png", "jpeg"],
    transformations: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const upload = multer({
  storage: storage,
  dest: "/pets",
});

module.exports = upload;
