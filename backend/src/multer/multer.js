const multer = require("multer");
const path = require("path");

// Define storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // store in backend/uploads
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

// File filter (accept image/video only)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "video/mp4", "video/mkv"];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only images and videos are allowed!"), false);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
