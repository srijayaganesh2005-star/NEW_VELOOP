
const express = require("express");
const nodemailer = require("nodemailer");
const adminMiddleware = require("../middleware/adminMiddleware");
const InternshipApplication = require("../models/InternshipApplication");

const router = express.Router();

// =====================================================
// EMAIL TRANSPORTER - OPTIONAL CONFIGURATION
// =====================================================

let transporter = null;

const emailConfigured = Boolean(
  process.env.EMAIL_USER &&
  process.env.EMAIL_PASS &&
  process.env.INTERNSHIP_EMAIL
);

if (emailConfigured) {
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter.verify((error) => {
    console.log("=================================");

    if (error) {
      console.error("EMAIL CONFIGURATION ERROR");
      console.error(error.message);
    } else {
      console.log("EMAIL TRANSPORTER READY");
      console.log("Sending account:", process.env.EMAIL_USER);
      console.log("Receiving account:", process.env.INTERNSHIP_EMAIL);
    }

    console.log("=================================");
  });
} else {
  console.log(
    "Email is disabled. Internship applications can still be saved."
  );
}

// =====================================================
// POST - SUBMIT INTERNSHIP APPLICATION
// USER
// =====================================================

router.post("/", async (req, res) => {
  try {
    console.log("=================================");
    console.log("INTERNSHIP APPLICATION REQUEST");
    console.log("Received internship application request");
    console.log("=================================");

    const {
      fullName,
      email,
      phone,
      college,
      domain,
      duration,
      reason,
    } = req.body;

    // =================================================
    // VALIDATION
    // =================================================

    if (
      !fullName ||
      !email ||
      !phone ||
      !college ||
      !domain ||
      !duration ||
      !reason
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // =================================================
    // CLEAN DATA
    // =================================================

    const cleanFullName = String(fullName).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPhone = String(phone).trim();
    const cleanCollege = String(college).trim();
    const cleanDomain = String(domain).trim();
    const cleanDuration = String(duration).trim();
    const cleanReason = String(reason).trim();

    // =================================================
    // EMAIL VALIDATION
    // =================================================

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // =================================================
    // SAVE APPLICATION TO MONGODB
    // =================================================

    const application = new InternshipApplication({
      fullName: cleanFullName,
      email: cleanEmail,
      phone: cleanPhone,
      college: cleanCollege,
      domain: cleanDomain,
      duration: cleanDuration,
      reason: cleanReason,

      // Every new application starts as Pending
      status: "Pending",
    });

    const savedApplication = await application.save();

    console.log("=================================");
    console.log("APPLICATION SAVED TO MONGODB");
    console.log("Application ID:", savedApplication._id);
    console.log("Initial Status:", savedApplication.status);
    console.log("=================================");

    // =================================================
    // EMAIL CONFIGURATION CHECK
    // =================================================

    let emailSent = false;

    if (
      transporter &&
      process.env.EMAIL_USER &&
      process.env.EMAIL_PASS &&
      process.env.INTERNSHIP_EMAIL
    ) {
      const receiverEmail = process.env.INTERNSHIP_EMAIL;

      // =================================================
      // EMAIL
      // =================================================

      const mailOptions = {
        from: `"VELOOP Rewards" <${process.env.EMAIL_USER}>`,
        to: receiverEmail,
        replyTo: cleanEmail,
        subject: `New Internship Application - ${cleanFullName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <body style="margin:0;padding:20px;background:#f5f5f5;font-family:Arial,sans-serif;">
            <div style="max-width:700px;margin:auto;background:white;padding:30px;border-radius:12px;border:1px solid #ddd;">
              <h2 style="color:#d4a72c;">VELOOP Rewards</h2>
              <h2>New Internship Application</h2>
              <hr />
              <h3>Applicant Details</h3>
              <p><strong>Full Name:</strong> ${cleanFullName}</p>
              <p><strong>Email:</strong> ${cleanEmail}</p>
              <p><strong>Phone:</strong> ${cleanPhone}</p>
              <p><strong>College / University:</strong> ${cleanCollege}</p>
              <p><strong>Internship Domain:</strong> ${cleanDomain}</p>
              <p><strong>Preferred Duration:</strong> ${cleanDuration}</p>
              <h3>Why are you interested?</h3>
              <p>${cleanReason}</p>
              <hr />
              <p><strong>Application ID:</strong> ${savedApplication._id}</p>
              <p><strong>Status:</strong> Pending</p>
              <hr />
              <p><strong>Applicant Email:</strong> ${cleanEmail}</p>
              <p>This application was submitted through VELOOP Rewards.</p>
            </div>
          </body>
          </html>
        `,
      };

      // =================================================
      // SEND EMAIL
      // =================================================

      try {
        const info = await transporter.sendMail(mailOptions);
        emailSent = true;

        console.log("=================================");
        console.log("EMAIL SENT SUCCESSFULLY");
        console.log("Message ID:", info.messageId);
        console.log("FROM:", process.env.EMAIL_USER);
        console.log("TO:", receiverEmail);
        console.log("=================================");
      } catch (emailError) {
        // Email failure must not fail the application.
        // The application has already been saved to MongoDB.
        console.error("EMAIL SENDING ERROR:", emailError.message);
      }
    } else {
      console.log("EMAIL CONFIGURATION NOT AVAILABLE");
    }

    // =================================================
    // SUCCESS RESPONSE
    // =================================================

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      applicationId: savedApplication._id,
      emailSent,
      application: savedApplication,
    });
  } catch (error) {
    console.error("INTERNSHIP APPLICATION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit internship application.",
      error: error.message,
    });
  }
});

// =====================================================
// GET - USER MY APPLICATIONS
// USER SIDE STATUS
// =====================================================

router.get("/my", async (req, res) => {
  try {
    const email = req.query.email;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const cleanEmail = String(email).trim().toLowerCase();

    console.log("=================================");
    console.log("USER APPLICATION STATUS REQUEST");
    console.log("Email:", cleanEmail);
    console.log("=================================");

    const applications = await InternshipApplication
      .find({ email: cleanEmail })
      .sort({ createdAt: -1 });

    console.log("Applications found:", applications.length);

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("GET MY APPLICATIONS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load your applications.",
      error: error.message,
    });
  }
});

// =====================================================
// GET - USER APPLICATIONS BY EMAIL
// ADDITIONAL USER STATUS ROUTE
// =====================================================

router.get("/my/:email", async (req, res) => {
  try {
    const email = req.params.email;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const cleanEmail = decodeURIComponent(email).trim().toLowerCase();

    console.log("=================================");
    console.log("USER STATUS REQUEST BY EMAIL");
    console.log("Email:", cleanEmail);
    console.log("=================================");

    const applications = await InternshipApplication
      .find({ email: cleanEmail })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("GET USER APPLICATIONS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load your applications.",
      error: error.message,
    });
  }
});

// =====================================================
// GET - ALL INTERNSHIP APPLICATIONS
// ADMIN ONLY
// =====================================================

router.get("/", adminMiddleware, async (req, res) => {
  try {
    const applications = await InternshipApplication
      .find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("GET INTERNSHIP APPLICATIONS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch internship applications.",
    });
  }
});

// =====================================================
// PATCH - UPDATE APPLICATION STATUS
// ADMIN ONLY
// =====================================================

router.patch("/:id/status", adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log("=================================");
    console.log("UPDATE APPLICATION STATUS");
    console.log("Application ID:", id);
    console.log("New Status:", status);
    console.log("=================================");

    // =================================================
    // VALIDATE STATUS
    // =================================================

    const allowedStatuses = [
      "Pending",
      "Under Review",
      "Accepted",
      "Rejected",
    ];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status.",
      });
    }

    // =================================================
    // FIND APPLICATION
    // =================================================

    const application = await InternshipApplication.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Internship application not found.",
      });
    }

    // =================================================
    // UPDATE STATUS
    // =================================================

    application.status = status;

    const updatedApplication = await application.save();

    console.log("=================================");
    console.log("APPLICATION STATUS UPDATED");
    console.log("Application:", updatedApplication._id);
    console.log("Status:", updatedApplication.status);
    console.log("Applicant Email:", updatedApplication.email);
    console.log("=================================");

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully.",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("UPDATE APPLICATION STATUS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update application status.",
      error: error.message,
    });
  }
});

// =====================================================
// TEST ROUTE
// =====================================================

router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Internship API is working successfully.",
  });
});

// =====================================================
// EXPORT
// =====================================================

module.exports = router;
