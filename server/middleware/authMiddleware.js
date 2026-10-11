const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  try {

    // ==========================================
    // GET AUTHORIZATION HEADER
    // ==========================================

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token required",
      });
    }

    // ==========================================
    // CHECK BEARER FORMAT
    // Expected:
    // Bearer TOKEN
    // ==========================================

    const parts = authHeader.split(" ");

    if (
      parts.length !== 2 ||
      parts[0] !== "Bearer"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    const token = parts[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // ==========================================
    // VERIFY JWT
    // ==========================================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // ==========================================
    // STORE USER ID
    // ==========================================

    req.userId = decoded.userId;

    // ==========================================
    // CONTINUE TO ROUTE
    // ==========================================

    next();

  } catch (error) {

    console.error(
      "Authentication error:",
      error.message
    );

    // JWT expired / invalid
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authentication error",
    });
  }
};

module.exports = authenticateToken;