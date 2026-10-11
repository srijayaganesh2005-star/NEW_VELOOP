const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// =====================================================
// ADMIN LOGIN
// POST /api/admin/login
// =====================================================

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // -------------------------------------------------
    // 1. VALIDATE INPUT
    // -------------------------------------------------

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // -------------------------------------------------
    // 2. GET ADMIN CREDENTIALS FROM .env
    // -------------------------------------------------

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error("ADMIN_EMAIL or ADMIN_PASSWORD is missing.");

      return res.status(500).json({
        success: false,
        message: "Admin credentials are not configured.",
      });
    }

    // -------------------------------------------------
    // 3. CHECK EMAIL
    // -------------------------------------------------

    const emailMatches =
      email.trim().toLowerCase() ===
      adminEmail.trim().toLowerCase();

    // -------------------------------------------------
    // 4. CHECK PASSWORD
    // -------------------------------------------------

    const passwordMatches =
      password === adminPassword;

    // -------------------------------------------------
    // 5. INVALID CREDENTIALS
    // -------------------------------------------------

    if (!emailMatches || !passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials.",
      });
    }

    // -------------------------------------------------
    // 6. CHECK JWT SECRET
    // -------------------------------------------------

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing.");

      return res.status(500).json({
        success: false,
        message: "JWT secret is not configured.",
      });
    }

    // -------------------------------------------------
    // 7. CREATE ADMIN JWT TOKEN
    // -------------------------------------------------

    const token = jwt.sign(
      {
        email: adminEmail,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    // -------------------------------------------------
    // 8. SEND SUCCESS RESPONSE
    // -------------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Admin login successful.",

      token,

      admin: {
        email: adminEmail,
        role: "admin",
      },
    });

  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Admin login failed.",
    });
  }
});


// =====================================================
// ADMIN LOGOUT
// =====================================================

router.post("/logout", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Admin logged out successfully.",
  });
});


// =====================================================
// CHECK ADMIN TOKEN
// GET /api/admin/me
// =====================================================

router.get("/me", (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    // No Authorization header
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Admin authorization token is required.",
      });
    }

    // Expected:
    // Authorization: Bearer TOKEN

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format.",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Make sure token belongs to admin
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    return res.status(200).json({
      success: true,
      admin: {
        email: decoded.email,
        role: decoded.role,
      },
    });

  } catch (error) {
    console.error("ADMIN TOKEN ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired admin token.",
    });
  }
});


module.exports = router;