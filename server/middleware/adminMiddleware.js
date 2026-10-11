const jwt = require("jsonwebtoken");


// =====================================================
// ADMIN AUTHENTICATION MIDDLEWARE
// =====================================================

function adminMiddleware(req, res, next) {

  try {

    const authHeader =
      req.headers.authorization;


    // ---------------------------------------------
    // CHECK TOKEN
    // ---------------------------------------------

    if (!authHeader) {

      return res.status(401).json({
        success: false,
        message: "Admin authentication required.",
      });

    }


    // Expected:

    // Authorization:
    // Bearer TOKEN

    const parts =
      authHeader.split(" ");


    if (
      parts.length !== 2 ||
      parts[0] !== "Bearer"
    ) {

      return res.status(401).json({
        success: false,
        message: "Invalid authorization format.",
      });

    }


    const token = parts[1];


    // ---------------------------------------------
    // VERIFY JWT
    // ---------------------------------------------

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );


    // ---------------------------------------------
    // CHECK ADMIN ROLE
    // ---------------------------------------------

    if (decoded.role !== "admin") {

      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });

    }


    // ---------------------------------------------
    // STORE ADMIN INFORMATION
    // ---------------------------------------------

    req.admin = decoded;


    next();

  } catch (error) {

    console.error(
      "ADMIN AUTH ERROR:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Invalid or expired admin token.",
    });

  }

}


module.exports = adminMiddleware;