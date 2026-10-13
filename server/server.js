
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// =====================================================
// ROUTES
// =====================================================
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const gameRoutes = require("./routes/gameRoutes");
const leaderboardRoute = require("./routes/leaderboardRoute");
const internshipRoutes = require("./routes/internshipRoutes");

// =====================================================
// APP CONFIGURATION
// =====================================================
const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================================================
// ENVIRONMENT VALIDATION
// =====================================================
console.log("=================================");
console.log("VELOOP REWARDS SERVER");
console.log("=================================");
console.log("MongoDB URI configured:", Boolean(process.env.MONGO_URI));
console.log("JWT secret configured:", Boolean(process.env.JWT_SECRET));
console.log("Admin email configured:", Boolean(process.env.ADMIN_EMAIL));
console.log("Admin password configured:", Boolean(process.env.ADMIN_PASSWORD));
console.log(
  "Email configured:",
  Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS)
);
console.log("Port:", PORT);
console.log("=================================");

// =====================================================
// API ROUTES
// =====================================================
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/leaderboard", leaderboardRoute);
app.use("/api/internships", internshipRoutes);

// =====================================================
// ROOT ROUTE
// =====================================================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "VELOOP Rewards API is running",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
  });
});

// =====================================================
// HEALTH CHECK
// =====================================================
app.get("/api/health", (req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;

  res.status(databaseConnected ? 200 : 503).json({
    success: databaseConnected,
    server: "running",
    database: databaseConnected ? "connected" : "disconnected",
    emailConfigured: Boolean(
      process.env.EMAIL_USER && process.env.EMAIL_PASS
    ),
  });
});

// =====================================================
// API TEST ROUTES
// =====================================================
app.get("/api/game/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Game API is working successfully",
  });
});

app.get("/api/admin/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin API is working successfully",
  });
});

app.get("/api/internships/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Internship API is working successfully",
  });
});

// =====================================================
// 404 HANDLER
// =====================================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
    path: req.originalUrl,
  });
});

// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================
app.use((err, req, res, next) => {
  console.error("Request error:", err.message);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// =====================================================
// DATABASE CONNECTION AND SERVER STARTUP
// =====================================================
async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from the .env file");
    }

    if (
      !process.env.JWT_SECRET ||
      process.env.JWT_SECRET === "YOUR_LONG_RANDOM_SECRET"
    ) {
      throw new Error("Set a real, unique JWT_SECRET in the .env file");
    }

    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log("MongoDB connected successfully");
    console.log("Database:", mongoose.connection.name);

    app.listen(PORT, () => {
      console.log("=================================");
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`Admin API: http://localhost:${PORT}/api/admin`);
      console.log(`Game API: http://localhost:${PORT}/api/game`);
      console.log(
        `Leaderboard API: http://localhost:${PORT}/api/leaderboard`
      );
      console.log(
        `Internship API: http://localhost:${PORT}/api/internships`
      );
      console.log("=================================");

      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn(
          "Email credentials are not configured. Email-sending routes must handle this case separately."
        );
      }
    });
  } catch (error) {
    console.error("=================================");
    console.error("SERVER STARTUP FAILED");
    console.error("=================================");

    if (error.message.includes("bad auth")) {
      console.error(
        "MongoDB authentication failed. Check the database username and password in Atlas and .env."
      );
    } else if (
      error.message.includes("querySrv") ||
      error.message.includes("ECONNREFUSED")
    ) {
      console.error(
        "MongoDB DNS/network error. Verify the cluster hostname, DNS and Atlas Network Access."
      );
    } else {
      console.error(error.message);
    }

    process.exit(1);
  }
}

// =====================================================
// GRACEFUL SHUTDOWN
// =====================================================
async function shutdown(signal) {
  console.log(`${signal} received. Closing server...`);

  try {
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Shutdown error:", error.message);
    process.exit(1);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

// START
startServer();
