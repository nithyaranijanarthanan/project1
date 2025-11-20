import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from "path";
import routes from './app/route/index.js';
import db from './app/config/db.config.js';

const app = express();

// Make sure uploads folder exists
global.__basedir = process.cwd();
const uploadDir = path.join(global.__basedir, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

// Static folder for uploads
app.use("/uploads", express.static(path.join(global.__basedir, "uploads")));

// Database authentication
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to database:', error);
  }
})();

// Routes
routes(app);

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
