const express = require("express");
const User = require("../models/User");

const router = express.Router();

// ======================================
// GET LEADERBOARD
// ======================================

router.get("/", async (req, res) => {
  try {
    const users = await User.find(
      {},
      {
        name: 1,
        email: 1,
        gems: 1,
        ves: 1,
      }
    )
      .sort({ ves: -1 })
      .lean();

    const leaderboard = users.map((user, index) => {
      return {
        rank: index + 1,

        id: user._id.toString(),

        name: user.name || "User",

        email: user.email || "",

        totalVEs: Number(user.ves || 0),

        totalGems: Number(user.gems || 0),

        conversionCount: 0,

        score: Number(user.ves || 0),
      };
    });

    res.status(200).json({
      success: true,
      leaderboard,
    });

  } catch (error) {
    console.error("Leaderboard error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load leaderboard",
    });
  }
});

module.exports = router;