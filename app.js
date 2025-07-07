//Imports
import express from "express";
import dotenv from "dotenv";
import blogRoutes from "./controllers/routes.js";
import path from "path";
import { fileURLToPath } from "url";

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config();
// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON requests
app.use(express.json());
// Middleware to serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/blog", blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
