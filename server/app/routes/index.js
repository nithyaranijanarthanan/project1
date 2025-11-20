import userRoutes from "./user.routes.js";
import uploadRoutes from "./upload.routes.js";

export default function (app) {

  app.use("/api/users", userRoutes);   // Users Routes
  app.use("/api/uploads", uploadRoutes); // File Upload Routes

}
