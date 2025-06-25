import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/userRoutes.js";
// import userRouter from "./routes/userRoutes.js";
// // import connectCloudinary from "./config/connectCloudinary.js";
// import videoRouter from "./routes/videoRoutes.js";

const app = express();

let server;
dotenv.config();

const PORT = process.env.PORT || 3000;

// connectCloudinary();

// Enhanced CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      process.env.CLIENT_URL,
      process.env.ADMIN_URL,
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5174",
    ];

    // Check if origin is in allowedOrigins or starts with an allowed origin
    if (
      allowedOrigins.includes(origin) ||
      allowedOrigins.some((allowed) => origin.startsWith(allowed))
    ) {
      return callback(null, true);
    }

    // Log rejected origins in development
    if (process.env.NODE_ENV === "development") {
      console.log("CORS rejected origin:", origin);
      console.log("Allowed origins:", allowedOrigins);
    }

    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middlewares
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api/u", userRouter);
// app.use("/api/video", videoRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Verby server running . 😁!!.",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

//404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint does not exist.",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.message.includes("CORS")) {
    return res.status(403).json({
      success: false,
      message: err.message,
      allowedOrigins:
        corsOptions.origin instanceof Function
          ? ["Dynamic check based on rules"]
          : corsOptions.origin,
    });
  }

  res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

const startServer = async () => {
  try {
    await connectDB();
    server = app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV || "development"} mode`
      );
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Allowed client URL: ${process.env.CLIENT_URL}`);
      console.log(`Allowed admin URL: ${process.env.ADMIN_URL}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  // Close server & exit process
  server?.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});