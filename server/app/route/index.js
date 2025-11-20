import express from "express";
import multer from "multer";
import { uploadFile, getAllUploads } from "../controllers/upload.controller.js";
import { getAllUsers, addUser, updateUser, deleteUser, loginUser } from "../controllers/users.controller.js";

export default function(app) {
  const router = express.Router();

  // ---------------- Multer setup ----------------
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
  });
  const upload = multer({ storage });

  // ---------------- User APIs ----------------
  router.post("/api/login", loginUser);
  router.get("/api/getAllUsers", getAllUsers);
  router.post("/api/addUser", addUser);
  router.put("/api/updateUser/:id", updateUser);
  router.delete("/api/deleteUser/:id", deleteUser);

  // ---------------- File Upload APIs ----------------
  router.get("/upload", getAllUploads);                   // GET all uploads
  router.post("/upload", upload.single("file"), uploadFile); // POST upload

  // Mount all routes
  app.use("/", router);
}
