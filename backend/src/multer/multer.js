// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // helper: ensure directory exists
// const ensureDir = (dir) => {
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
//   }
// };

// // Define storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     let uploadPath = "uploads";

//     // Route files properly
//     if (file.mimetype.startsWith("image")) {
//       uploadPath = path.join("uploads", "images");
//     } else if (file.mimetype.startsWith("video")) {
//       uploadPath = path.join("uploads", "videos");
//     }

//     ensureDir(uploadPath);
//     cb(null, uploadPath);
//   },

//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const uniqueName = `${Date.now()}-${Math.round(
//       Math.random() * 1e9
//     )}${ext}`;
//     cb(null, uniqueName);
//   },
// });

// // File filter (accept image/video only)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "image/jpeg",
//     "image/png",
//     "image/webp",
//     "video/mp4",
//     "video/mkv",
//   ];

//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images and videos are allowed!"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// module.exports = upload;


const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio-projects", // Cloudinary folder
    allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mkv"],
    public_id: (req, file) => `${Date.now()}-${Math.round(Math.random() * 1e9)}`,
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "video/mp4",
    "video/mkv",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images and videos are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
