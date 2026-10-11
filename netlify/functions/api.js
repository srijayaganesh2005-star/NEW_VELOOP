
const express = require("express");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const cors = require("cors");

require("dotenv").config({
  path: require("path").resolve(__dirname, "../../server/.env"),
});

const adminRoutes = require("../../server/routes/adminRoutes");
const authRoutes = require("../../server/routes/authRoutes");
const gameRoutes = require("../../server/routes/gameRoutes");
const leaderboardRoute = require("../../server/routes/leaderboardRoute");
const internshipRoutes = require("../../server/routes/internshipRoutes");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://gentle-rugelach-b651c0.netlify.app",
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Keep one MongoDB connection per warm function instance.
let mongoConnectionPromise;

async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not configured");
  }

  if (!mongoConnectionPromise) {
    mongoConnectionPromise = mongoose
      .connect(process.env.MONGO_URI)
      .catch((error) => {
        mongoConnectionPromise = null;
        throw error;
      });
  }

  await mongoConnectionPromise;
}

// All API routes retain their existing prefixes.
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/leaderboard", leaderboardRoute);
app.use("/api/internships", internshipRoutes);

app.get("/api/game/test", (req, res) => {
  res.json({
    success: true,
    message: "Game API is working successfully",
  });
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "VELOOP Rewards API is running",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
    path: req.originalUrl,
  });
});

const handler = serverless(app);

exports.handler = async (event, context) => {
  try {
    await connectDatabase();
    return await handler(event, context);
  } catch (error) {
    console.error("Function error:", error.message);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: false,
        message: "Backend or database connection failed",
      }),
    };
  }
};
