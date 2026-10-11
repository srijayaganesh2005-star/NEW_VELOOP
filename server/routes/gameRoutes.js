const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// =====================================================
// AUTHENTICATION
// =====================================================

function authenticateToken(req, res, next) {

  const authHeader =
    req.headers.authorization;

  console.log(
    "Authorization Header:",
    authHeader ? "RECEIVED" : "NOT RECEIVED"
  );

  // -----------------------------------------------
  // CHECK AUTHORIZATION HEADER
  // -----------------------------------------------

  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ")
  ) {

    return res.status(401).json({

      success: false,

      message:
        "Authentication required",

    });

  }

  // -----------------------------------------------
  // GET TOKEN
  // -----------------------------------------------

  const token =
    authHeader.split(" ")[1];

  // -----------------------------------------------
  // VERIFY TOKEN
  // -----------------------------------------------

  try {

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    req.userId =
      decoded.userId;

    console.log(
      "Authenticated User ID:",
      req.userId
    );

    next();

  } catch (error) {

    console.error(
      "JWT ERROR:",
      error.message
    );

    return res.status(401).json({

      success: false,

      message:
        "Invalid or expired token",

    });

  }

}


// =====================================================
// LUCKY TAP REWARD
// =====================================================

router.post(
  "/lucky-tap/reward",
  authenticateToken,
  async (req, res) => {

    try {

      const { taps } =
        req.body;

      // -----------------------------------------------
      // CHECK GAME COMPLETION
      // -----------------------------------------------

      if (Number(taps) < 10) {

        return res.status(400).json({

          success: false,

          message:
            "Game was not completed",

        });

      }

      // -----------------------------------------------
      // FIND USER
      // -----------------------------------------------

      const user =
        await User.findById(
          req.userId
        );

      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User not found",

        });

      }

      // -----------------------------------------------
      // ADD 10 GEMS
      // -----------------------------------------------

      const oldGems =
        Number(user.gems || 0);

      const newGems =
        oldGems + 10;

      user.gems =
        newGems;

      await user.save();

      // -----------------------------------------------
      // RESPONSE
      // -----------------------------------------------

      return res.json({

        success: true,

        message:
          "Congratulations! You earned 10 Gems.",

        reward: 10,

        gems: newGems,

        user: {

          id: user._id,

          name: user.name,

          email: user.email,

          gems: newGems,

          ves: user.ves,

          role: user.role,

        },

      });

    } catch (error) {

      console.error(
        "Lucky Tap reward error:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "Server error while claiming game reward",

        error:
          error.message,

      });

    }

  }
);


// =====================================================
// SPIN WHEEL REWARD
// =====================================================

router.post(
  "/spin-wheel/reward",
  authenticateToken,
  async (req, res) => {

    try {

      console.log(
        "================================="
      );

      console.log(
        "SPIN WHEEL REQUEST"
      );

      console.log(
        "User ID:",
        req.userId
      );

      // =================================================
      // GET CURRENT DATE IN INDIA
      // =================================================

      const now = new Date();

      const indiaDate =
        new Intl.DateTimeFormat(
          "en-CA",
          {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }
        ).format(now);

      console.log(
        "India Date:",
        indiaDate
      );


      // =================================================
      // AVAILABLE REWARDS
      // =================================================

      const rewards = [
        10,
        25,
        50,
        75,
        100,
        150,
      ];


      // =================================================
      // SELECT RANDOM REWARD
      // =================================================

      const randomIndex =
        Math.floor(
          Math.random() *
          rewards.length
        );

      const reward =
        rewards[randomIndex];


      console.log(
        "Selected Reward:",
        reward
      );


      // =================================================
      // CALCULATE TODAY'S START
      // =================================================
      //
      // We use Asia/Kolkata so the daily spin resets
      // according to Indian time.
      //
      // =================================================

      const [
        year,
        month,
        day
      ] =
        indiaDate
          .split("-")
          .map(Number);


      // Start of today in India
      const startOfToday =
        new Date(
          Date.UTC(
            year,
            month - 1,
            day,
            0,
            0,
            0,
            0
          )
        );


      // Because India is UTC+5:30,
      // convert India midnight to UTC.

      startOfToday.setUTCMinutes(
        startOfToday.getUTCMinutes() - 330
      );


      console.log(
        "Start of Today:",
        startOfToday
      );


      // =================================================
      // ATOMIC SPIN CHECK + GEM UPDATE
      // =================================================
      //
      // This is very important.
      //
      // The database will update the user ONLY if:
      //
      // 1. lastSpinDate is null
      // OR
      // 2. lastSpinDate is before today's start
      //
      // This prevents a user from spinning twice today.
      //
      // =================================================

      const updatedUser =
        await User.findOneAndUpdate(

          {
            _id: req.userId,

            $or: [

              {
                lastSpinDate: null,
              },

              {
                lastSpinDate: {
                  $lt: startOfToday,
                },
              },

            ],
          },

          {

            // -------------------------------------------
            // ADD REWARD TO EXISTING GEMS
            // -------------------------------------------

            $inc: {
              gems: reward,
            },

            // -------------------------------------------
            // SAVE SPIN DATE
            // -------------------------------------------

            $set: {
              lastSpinDate: now,
            },

          },

          {
            new: true,
          }

        );


      // =================================================
      // USER NOT UPDATED
      // =================================================
      //
      // This normally means the user has already spun
      // today.
      //
      // =================================================

      if (!updatedUser) {

        // Check whether user actually exists

        const existingUser =
          await User.findById(
            req.userId
          );

        if (!existingUser) {

          return res.status(404).json({

            success: false,

            message:
              "User not found",

          });

        }


        // User exists but already spun today

        return res.status(400).json({

          success: false,

          alreadySpun: true,

          message:
            "You have already spun today. Please come back tomorrow.",

        });

      }


      // =================================================
      // GET UPDATED GEM BALANCE
      // =================================================

      const newGems =
        Number(
          updatedUser.gems || 0
        );


      // =================================================
      // LOG
      // =================================================

      console.log(
        "Spin successful"
      );

      console.log(
        "Reward:",
        reward
      );

      console.log(
        "New Gems:",
        newGems
      );

      console.log(
        "Last Spin:",
        updatedUser.lastSpinDate
      );

      console.log(
        "================================="
      );


      // =================================================
      // RESPONSE
      // =================================================

      return res.json({

        success: true,

        alreadySpun: false,

        message:
          `Congratulations! You won ${reward} Gems.`,

        reward: reward,

        gems: newGems,

        user: {

          id:
            updatedUser._id,

          name:
            updatedUser.name,

          email:
            updatedUser.email,

          gems:
            newGems,

          ves:
            updatedUser.ves,

          role:
            updatedUser.role,

        },

      });

    } catch (error) {

      console.error(
        "================================="
      );

      console.error(
        "SPIN WHEEL ERROR"
      );

      console.error(
        error
      );

      console.error(
        "================================="
      );

      return res.status(500).json({

        success: false,

        message:
          "Server error while spinning the wheel",

        error:
          error.message,

      });

    }

  }
);


// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;