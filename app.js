//Imports
import express from "express";
import dotenv from "dotenv";
import blogRoutes from "./controllers/routes.js";
// Load environment variables from .env file
dotenv.config();
// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON requests
app.use(express.json());

app.use("/api/blog", blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
