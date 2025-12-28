require("dotenv").config();
const connectDB = require("./database/dbConnection"); // your DB connection helper
const cloudinary = require("./config/cloudinary"); // your cloudinary config
const Project = require("./src/models/project.model"); // adjust path if needed
const path = require("path");
const fs = require("fs");

// Helper to check if local file exists
const fileExists = (filePath) => fs.existsSync(filePath);

// Connect to MongoDB and run migration
connectDB().then(async () => {
  try {
    const projects = await Project.find();

    for (let project of projects) {
      let updated = false;

      // ----- Handle Image -----
      if (project.image && !project.image.startsWith("http")) {
        const localImagePath = path.join(
          __dirname,
          "uploads/images",
          path.basename(project.image)
        );

        if (fileExists(localImagePath)) {
          const uploadedImage = await cloudinary.uploader.upload(localImagePath, {
            folder: "portfolio-projects",
          });
          project.image = uploadedImage.secure_url;
          updated = true;
          console.log(`✅ Migrated image for project "${project.title}"`);
        } else {
          console.warn(`⚠️ Local image not found: ${localImagePath}`);
        }
      }

      // ----- Handle Video -----
      if (project.video && !project.video.startsWith("http")) {
        const localVideoPath = path.join(
          __dirname,
          "uploads/videos",
          path.basename(project.video)
        );

        if (fileExists(localVideoPath)) {
          const uploadedVideo = await cloudinary.uploader.upload(localVideoPath, {
            folder: "portfolio-projects",
            resource_type: "video",
          });
          project.video = uploadedVideo.secure_url;
          updated = true;
          console.log(`✅ Migrated video for project "${project.title}"`);
        } else {
          console.warn(`⚠️ Local video not found: ${localVideoPath}`);
        }
      }

      // Save project if updated
      if (updated) {
        await project.save();
      }
    }

    console.log("🎉 Migration complete! All media updated to Cloudinary.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration error:", err);
    process.exit(1);
  }
});
