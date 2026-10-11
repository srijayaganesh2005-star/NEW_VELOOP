const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // ==========================================
    // USER INFORMATION
    // ==========================================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ==========================================
    // GEM BALANCE
    // ==========================================

    gems: {
      type: Number,
      default: 12450,
      min: 0,
    },

    // ==========================================
    // VES BALANCE
    // ==========================================

    ves: {
      type: Number,
      default: 1280,
      min: 0,
    },

    // ==========================================
    // ROLE
    // ==========================================

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // ==========================================
    // STREAK
    // ==========================================

    streak: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ==========================================
    // LEADERBOARD
    // ==========================================

    leaderboardRank: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ==========================================
    // SPIN WHEEL
    // LAST SPIN DATE
    // ==========================================

    lastSpinDate: {
      type: Date,
      default: null,
    },
  },

  {
    timestamps: true,
    collection: "users",
  }
);

module.exports =
  mongoose.models.User ||
  mongoose.model("User", userSchema);