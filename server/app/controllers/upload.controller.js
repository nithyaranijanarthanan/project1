import db from "../config/db.config.js"; // <- import your db
// or import Upload if you want to use the model directly
// import Upload from "../models/upload.model.js";

// Upload a file
export const uploadFile = async (req, res) => {
  console.log("Upload route hit!");
  console.log("Request body:", req.body);
  console.log("Request file:", req.file);

  try {
    if (!req.file) {
      console.log("No file received");
      return res.status(400).json({ status: 400, reason: "No file uploaded" });
    }

    console.log("File received:", req.file);

    // Rename `path` to avoid conflict with Node's path module
    const { filename, mimetype, size, path: filePath } = req.file;

    // Optional: link to logged-in user (assume req.userId is set after auth)
    const userId = req.userId || null;

    // Use db.uploads.create to save in database
    const savedFile = await db.uploads.create({ filename, mimetype, size, path: filePath, userId });
    console.log("File saved in DB:", savedFile);

    res.status(200).json({ status: 200, reason: "File uploaded", results: savedFile });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ status: 500, reason: "Server error" });
  }
};

// Get all uploads
export const getAllUploads = async (req, res) => {
  try {
    const uploads = await db.uploads.findAll({ order: [["createdAt", "DESC"]] });
    res.status(200).json({ status: 200, results: uploads });
  } catch (err) {
    console.error("Fetch uploads error:", err);
    res.status(500).json({ status: 500, reason: "Server error" });
  }
};
