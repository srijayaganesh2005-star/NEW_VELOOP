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
// APP
// =====================================================

const app = express();

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// =====================================================
// SERVER INFORMATION
// =====================================================

console.log("=================================");
console.log("VELOOP REWARDS SERVER");
console.log("=================================");

console.log(
  "MONGO_URI:",
  process.env.MONGO_URI
);

console.log(
  "JWT_SECRET EXISTS:",
  !!process.env.JWT_SECRET
);

console.log(
  "ADMIN_EMAIL:",
  process.env.ADMIN_EMAIL
    ? process.env.ADMIN_EMAIL
    : "NOT SET"
);

console.log(
  "ADMIN_PASSWORD EXISTS:",
  !!process.env.ADMIN_PASSWORD
);

console.log(
  "PORT:",
  process.env.PORT || 5000
);

console.log("=================================");

// =====================================================
// MONGODB CONNECTION
// =====================================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("=================================");
    console.log("MongoDB connected successfully");
    console.log("=================================");

    console.log(
      "Mongo Host:",
      mongoose.connection.host
    );

    console.log(
      "Mongo Port:",
      mongoose.connection.port
    );

    console.log(
      "Mongo Database:",
      mongoose.connection.name
    );

    try {
      const collections =
        await mongoose.connection.db
          .listCollections()
          .toArray();

      console.log(
        "MongoDB Collections:",
        collections.map(
          (collection) =>
            collection.name
        )
      );
    } catch (error) {
      console.error(
        "Could not list MongoDB collections:",
        error.message
      );
    }

    console.log("=================================");
  })
  .catch((error) => {
    console.error("=================================");
    console.error("MONGODB CONNECTION ERROR");
    console.error("=================================");

    console.error(error.message);

    process.exit(1);
  });

// =====================================================
// API ROUTES
// =====================================================

// -----------------------------------------------------
// ADMIN
// -----------------------------------------------------

app.use(
  "/api/admin",
  adminRoutes
);

// -----------------------------------------------------
// AUTHENTICATION
// -----------------------------------------------------

app.use(
  "/api/auth",
  authRoutes
);

// -----------------------------------------------------
// GAME
// IMPORTANT:
// gameRoutes.js handles:
// /api/game/lucky-tap/reward
// /api/game/spin
// etc.
// -----------------------------------------------------

app.use(
  "/api/game",
  gameRoutes
);

// -----------------------------------------------------
// LEADERBOARD
// -----------------------------------------------------

app.use(
  "/api/leaderboard",
  leaderboardRoute
);

// -----------------------------------------------------
// INTERNSHIPS
// -----------------------------------------------------

app.use(
  "/api/internships",
  internshipRoutes
);

// =====================================================
// GAME API TEST
// =====================================================

app.get(
  "/api/game/test",
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Game API is working successfully",
    });
  }
);

// =====================================================
// ROOT TEST
// =====================================================

app.get(
  "/",
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "VELOOP Rewards API is running",
      database: mongoose.connection.name,
    });
  }
);

// =====================================================
// ADMIN TEST
// =====================================================

app.get(
  "/api/admin/test",
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Admin API is working successfully",
    });
  }
);

// =====================================================
// INTERNSHIP TEST
// =====================================================

app.get(
  "/api/internships/test",
  (req, res) => {
    res.status(200).json({
      success: true,
      message:
        "Internship API is working successfully",
    });
  }
);

// =====================================================
// INTERNSHIP STATUS TEST
// =====================================================

app.get(
  "/api/internships/my",
  (req, res, next) => {
    next();
  }
);

// =====================================================
// 404 ROUTE
// IMPORTANT: KEEP THIS AT THE VERY END
// =====================================================

app.use(
  (req, res) => {
    res.status(404).json({
      success: false,
      message: "API route not found",
      path: req.originalUrl,
    });
  }
);

// =====================================================
// ERROR HANDLER
// =====================================================

app.use(
  (
    err,
    req,
    res,
    next
  ) => {
    console.error(
      "================================="
    );

    console.error(
      "SERVER ERROR:"
    );

    console.error(err);

    console.error(
      "================================="
    );

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
);

// =====================================================
// SERVER
// =====================================================

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  () => {
    console.log(
      "================================="
    );

    console.log(
      `Server running on http://localhost:${PORT}`
    );

    console.log(
      `Admin API: http://localhost:${PORT}/api/admin`
    );

    console.log(
      `Admin Test: http://localhost:${PORT}/api/admin/test`
    );

    console.log(
      `Game API: http://localhost:${PORT}/api/game`
    );

    console.log(
      `Game Test: http://localhost:${PORT}/api/game/test`
    );

    console.log(
      `Leaderboard API: http://localhost:${PORT}/api/leaderboard`
    );

    console.log(
      `Internship API: http://localhost:${PORT}/api/internships`
    );

    console.log(
      `Internship Test: http://localhost:${PORT}/api/internships/test`
    );

    console.log(
      "================================="
    );
  }
);