const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();


// =====================================================
// JWT TOKEN HELPER
// =====================================================

function createToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    {
      userId: user._id.toString(),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}


// =====================================================
// USER RESPONSE HELPER
// =====================================================

function getUserData(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    gems: Number(user.gems || 0),
    ves: Number(user.ves || 0),
    role: user.role,
    streak: user.streak || 0,
    leaderboardRank: user.leaderboardRank || 0,
  };
}


// =====================================================
// REGISTER
// =====================================================

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("\n=================================");
    console.log("========== REGISTER =============");
    console.log("=================================");

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password received:", password ? "YES" : "NO");


    // -----------------------------------------------
    // VALIDATION
    // -----------------------------------------------

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }


    const cleanName = String(name).trim();
    const cleanEmail = String(email)
      .trim()
      .toLowerCase();


    // -----------------------------------------------
    // CHECK EXISTING USER
    // -----------------------------------------------

    const existingUser = await User.findOne({
      email: cleanEmail,
    });


    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }


    // -----------------------------------------------
    // HASH PASSWORD
    // -----------------------------------------------

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    // -----------------------------------------------
    // CREATE USER
    // -----------------------------------------------

    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,

      // Initial rewards
      gems: 12450,
      ves: 1280,

      role: "user",

      streak: 0,

      leaderboardRank: 0,
    });


    console.log("USER CREATED:", user.email);
    console.log("USER ID:", user._id);


    // -----------------------------------------------
    // CREATE JWT
    // -----------------------------------------------

    const token = createToken(user);


    // -----------------------------------------------
    // RESPONSE
    // -----------------------------------------------

    return res.status(201).json({
      success: true,

      message: "Registration successful",

      token,

      user: getUserData(user),
    });


  } catch (error) {

    console.error(
      "REGISTER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message,
    });
  }
});


// =====================================================
// LOGIN
// =====================================================

router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;


    console.log("\n=================================");
    console.log("========== LOGIN ================");
    console.log("=================================");

    console.log("Email received:", email);
    console.log(
      "Password received:",
      password ? "YES" : "NO"
    );


    // -----------------------------------------------
    // VALIDATION
    // -----------------------------------------------

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }


    const cleanEmail = String(email)
      .trim()
      .toLowerCase();


    console.log(
      "Searching email:",
      cleanEmail
    );


    // -----------------------------------------------
    // DATABASE INFORMATION
    // -----------------------------------------------

    console.log(
      "Connected database:",
      User.db.name
    );

    console.log(
      "Connected host:",
      User.db.host
    );

    console.log(
      "User collection:",
      User.collection.name
    );


    // -----------------------------------------------
    // FIND USER
    // -----------------------------------------------

    const user = await User.findOne({
      email: cleanEmail,
    }).exec();


    console.log(
      "MongoDB user result:",
      user ? user.email : null
    );


    if (!user) {

      console.log(
        "USER NOT FOUND:",
        cleanEmail
      );

      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }


    console.log(
      "USER FOUND:",
      user.email
    );


    // -----------------------------------------------
    // PASSWORD CHECK
    // -----------------------------------------------

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );


    console.log(
      "Password match:",
      passwordMatch
    );


    if (!passwordMatch) {

      console.log(
        "PASSWORD DOES NOT MATCH"
      );

      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }


    console.log(
      "PASSWORD CORRECT"
    );


    // -----------------------------------------------
    // CREATE JWT
    // -----------------------------------------------

    const token = createToken(user);


    console.log(
      "LOGIN SUCCESS"
    );

    console.log(
      "User:",
      user.email
    );

    console.log(
      "Token created successfully"
    );


    // -----------------------------------------------
    // LOGIN RESPONSE
    // -----------------------------------------------

    return res.status(200).json({

      success: true,

      message: "Login successful",

      token,

      user: getUserData(user),

    });


  } catch (error) {

    console.error(
      "LOGIN ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
});


// =====================================================
// GET CURRENT USER
// =====================================================

router.get(
  "/me",
  authenticateToken,
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.userId
        ).select("-password");


      if (!user) {

        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }


      return res.json({

        success: true,

        user: getUserData(user),

      });


    } catch (error) {

      console.error(
        "GET USER ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
);


// =====================================================
// WATCH AD → +10 GEMS
// =====================================================

router.post(
  "/watch-ad",
  authenticateToken,
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.userId
        );


      if (!user) {

        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }


      const oldGems =
        Number(user.gems || 0);


      const reward = 10;


      user.gems =
        oldGems + reward;


      await user.save();


      return res.json({

        success: true,

        message:
          "Congratulations! You earned 10 Gems.",

        reward,

        oldGems,

        newGems: user.gems,

        user: getUserData(user),

      });


    } catch (error) {

      console.error(
        "WATCH AD ERROR:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "Server error while claiming reward",

        error: error.message,

      });
    }
  }
);


// =====================================================
// TECHNICAL QUIZ → EARN GEMS
// =====================================================

router.post(
  "/quiz/submit",
  authenticateToken,
  async (req, res) => {

    try {

      console.log(
        "\n========== QUIZ SUBMISSION =========="
      );

      console.log(
        "User ID:",
        req.userId
      );

      console.log(
        "Answers:",
        req.body.answers
      );


      const { answers } = req.body;


      // -----------------------------------------------
      // VALIDATION
      // -----------------------------------------------

      if (
        !Array.isArray(answers) ||
        answers.length !== 5
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Please answer all 5 questions",
        });
      }


      // -----------------------------------------------
      // CORRECT ANSWERS
      // -----------------------------------------------

      const correctAnswers = [
        "B",
        "A",
        "B",
        "B",
        "D",
      ];


      let score = 0;


      for (
        let i = 0;
        i < 5;
        i++
      ) {

        if (
          String(answers[i])
            .trim()
            .toUpperCase() ===
          correctAnswers[i]
        ) {

          score++;

        }
      }


      // -----------------------------------------------
      // REWARD
      // -----------------------------------------------

      const reward =
        score * 10;


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
          message: "User not found",
        });
      }


      const oldGems =
        Number(user.gems || 0);


      const newGems =
        oldGems + reward;


      user.gems =
        newGems;


      await user.save();


      console.log(
        "Old Gems:",
        oldGems
      );

      console.log(
        "Quiz Reward:",
        reward
      );

      console.log(
        "New Gems:",
        newGems
      );


      return res.json({

        success: true,

        message:
          score === 5
            ? "Excellent! All answers are correct!"
            : `You got ${score} correct answers and earned ${reward} Gems.`,

        score,

        totalQuestions: 5,

        reward,

        oldGems,

        newGems,

        user: getUserData(user),

      });


    } catch (error) {

      console.error(
        "QUIZ ERROR:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "Server error while submitting quiz",

        error: error.message,

      });
    }
  }
);


// =====================================================
// GEM → VE CONVERSION
// =====================================================

router.post(
  "/convert",
  authenticateToken,
  async (req, res) => {

    try {

      console.log(
        "\n========== GEM TO VE CONVERSION =========="
      );


      const {
        requiredGems,
        receiveVEs
      } = req.body;


      console.log(
        "User ID:",
        req.userId
      );

      console.log(
        "Required Gems:",
        requiredGems
      );

      console.log(
        "Receive VEs:",
        receiveVEs
      );


      // -----------------------------------------------
      // VALIDATE INPUT
      // -----------------------------------------------

      if (
        requiredGems === undefined ||
        receiveVEs === undefined
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Conversion details are required",
        });
      }


      const gemsRequired =
        Number(requiredGems);

      const vesReceived =
        Number(receiveVEs);


      if (
        !Number.isFinite(gemsRequired) ||
        !Number.isFinite(vesReceived) ||
        gemsRequired <= 0 ||
        vesReceived <= 0
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Invalid conversion values",
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
          message: "User not found",
        });
      }


      const currentGems =
        Number(user.gems || 0);

      const currentVEs =
        Number(user.ves || 0);


      // -----------------------------------------------
      // CHECK BALANCE
      // -----------------------------------------------

      if (
        currentGems <
        gemsRequired
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Insufficient Gems",

          requiredGems:
            gemsRequired,

          availableGems:
            currentGems,

        });
      }


      // -----------------------------------------------
      // PERFORM CONVERSION
      // -----------------------------------------------

      user.gems =
        currentGems -
        gemsRequired;

      user.ves =
        currentVEs +
        vesReceived;


      await user.save();


      console.log(
        "Old Gems:",
        currentGems
      );

      console.log(
        "Gems Used:",
        gemsRequired
      );

      console.log(
        "New Gems:",
        user.gems
      );

      console.log(
        "Old VEs:",
        currentVEs
      );

      console.log(
        "VEs Received:",
        vesReceived
      );

      console.log(
        "New VEs:",
        user.ves
      );


      // -----------------------------------------------
      // RESPONSE
      // -----------------------------------------------

      return res.status(200).json({

        success: true,

        message:
          "Conversion successful",

        user: getUserData(user),

        conversion: {

          gemsUsed:
            gemsRequired,

          vesReceived:
            vesReceived,

        },

      });


    } catch (error) {

      console.error(
        "CONVERSION ERROR:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "Server error during conversion",

        error: error.message,

      });
    }
  }
);


// =====================================================
// EXPORT
// =====================================================

module.exports = router;