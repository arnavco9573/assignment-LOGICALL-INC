// src/index.ts
import express from "express";
import cors from "cors";
import prisma from "./lib/prisma"; // This import should work now
import mainRouter from "./routes"; // This import should also work now

const app = express();
const PORT = process.env.PORT || 3001;

// === Middleware ===
app.use(cors());
app.use(express.json());

// === API Routes ===
// All routes are now handled by our main router
// and will be prefixed with /api
app.use("/api", mainRouter);

// === Server Start ===
const startServer = async () => {
  try {
    // Check database connection on startup
    await prisma.$connect();
    console.log("✅ Database connected successfully.");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(
        `API endpoints available at http://localhost:${PORT}/api/entries`
      );
    });
  } catch (error) {
    console.error("❌ Failed to connect to the database.");
    console.error(error);
    process.exit(1); // Exit on connection failure
  }
};

startServer();
