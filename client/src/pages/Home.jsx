import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Home.css";

export default function Home() {

  // =========================================
  // INTERNSHIP FORM STATE
  // =========================================

    // =========================================
  // INTERNSHIP FORM STATE
  // =========================================

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    domain: "",
    duration: "",
    reason: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);


  // =========================================
  // HANDLE INPUT
  // =========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSubmitted(false);
  };


  // =========================================
  // HANDLE INTERNSHIP SUBMIT
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check all fields
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.college.trim() ||
      !formData.domain.trim() ||
      !formData.duration.trim() ||
      !formData.reason.trim()
    ) {
      alert("All fields are required.");
      return;
    }

    try {
      setLoading(true);

      console.log("INTERNSHIP FORM DATA:", formData);

      const response = await fetch(
        "http://localhost:5000/api/internships",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            college: formData.college,
            domain: formData.domain,
            duration: formData.duration,
            reason: formData.reason,
          }),
        }
      );

      // Try to read server response
      const data = await response.json();

      console.log("SERVER RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to submit application."
        );
      }

      // Success
      setSubmitted(true);

      alert("Application submitted successfully!");

      // Clear form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        college: "",
        domain: "",
        duration: "",
        reason: "",
      });

    } catch (error) {
      console.error("INTERNSHIP SUBMIT ERROR:", error);

      alert(
        error.message ||
        "Unable to submit application. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="home">


      {/* =========================================
          BACKGROUND
      ========================================= */}

      <div className="hero-orb orb-one"></div>

      <div className="hero-orb orb-two"></div>

      <div className="gold-particle particle-one">
        ◆
      </div>

      <div className="gold-particle particle-two">
        ✦
      </div>

      <div className="gold-particle particle-three">
        ◇
      </div>



      {/* =========================================
          HERO
      ========================================= */}

      <section className="hero">

        <div className="hero-content">


          <div className="hero-badge">

            <span></span>

            THE NEXT GENERATION REWARDS PLATFORM

          </div>



          <h1>

            Turn Your

            <span> Activity </span>

            Into

            <strong> Rewards.</strong>

          </h1>



          <p>

            Complete simple activities, collect Gems,
            climb the leaderboard and exchange your
            rewards through the VELOOP ecosystem.

          </p>



          <div className="hero-buttons">


            <Link
              to="/dashboard"
              className="primary-button"
            >

              Explore Dashboard

              <span>→</span>

            </Link>



            <Link
              to="/exchange-center"
              className="secondary-button"
            >

              Exchange Center

              <span>◇</span>

            </Link>


          </div>



          <div className="hero-trust">


            <div>

              <strong>
                12.8K+
              </strong>

              <span>
                Active Users
              </span>

            </div>



            <div className="trust-line"></div>



            <div>

              <strong>
                2.4M+
              </strong>

              <span>
                Rewards Earned
              </span>

            </div>



            <div className="trust-line"></div>



            <div>

              <strong>
                99.9%
              </strong>

              <span>
                Platform Uptime
              </span>

            </div>


          </div>


        </div>



        {/* =========================================
            HERO VISUAL
        ========================================= */}

        <div className="hero-visual">


          <div className="visual-glow"></div>


          <div className="reward-orbit orbit-one"></div>

          <div className="reward-orbit orbit-two"></div>



          <div className="reward-card">


            <div className="reward-card-top">

              <span>
                YOUR REWARDS
              </span>


              <div className="live-dot">

                <i></i>

                LIVE

              </div>

            </div>



            <div className="reward-amount">
              12,450
            </div>


            <div className="reward-label">
              AVAILABLE GEMS
            </div>


            <div className="reward-divider"></div>



            <div className="reward-bottom">


              <div>

                <small>
                  VE BALANCE
                </small>

                <strong>
                  1,280 VEs
                </strong>

              </div>



              <div className="reward-icon">
                ◆
              </div>


            </div>


          </div>



          {/* FLOAT LEFT */}

          <div className="float-card float-left">


            <div className="float-icon">
              🏆
            </div>


            <div>

              <small>
                LEADERBOARD
              </small>

              <strong>
                #08 Rank
              </strong>

            </div>


          </div>



          {/* FLOAT RIGHT */}

          <div className="float-card float-right">


            <div className="float-icon gold">
              ◆
            </div>


            <div>

              <small>
                DAILY BONUS
              </small>

              <strong>
                +25 Gems
              </strong>

            </div>


          </div>



          <div className="center-gem">
            ◆
          </div>


        </div>

      </section>



      {/* =========================================
          FEATURES
      ========================================= */}

      <section className="features-section">


        <div className="section-heading">


          <span>
            WHY VELOOP
          </span>


          <h2>

            One Platform.

            <em>
              Endless Rewards.
            </em>

          </h2>


          <p>

            Everything you need to earn, track and
            exchange your rewards in one place.

          </p>


        </div>



        <div className="feature-grid">


          <Feature
            number="01"
            icon="◈"
            title="Earn Gems"
            text="Complete eligible activities and build your reward balance."
          />


          <Feature
            number="02"
            icon="♛"
            title="Compete"
            text="Climb the leaderboard and see how you rank against others."
          />


          <Feature
            number="03"
            icon="◇"
            title="Exchange"
            text="Convert your earned Gems into VEs through the Exchange Center."
          />


        </div>


      </section>



      {/* =========================================
          FINAL CTA
      ========================================= */}

      <section className="home-cta">


        <div className="cta-glow"></div>


        <span>
          READY TO START?
        </span>


        <h2>

          Your next reward

          <em>
            starts here.
          </em>

        </h2>


        <p>

          Jump into your dashboard and discover
          everything waiting for you.

        </p>


        <Link
          to="/dashboard"
          className="primary-button"
        >

          Open Dashboard

          <span>
            →
          </span>

        </Link>


      </section>



      {/* =================================================
          INTERNSHIP APPLICATION
      ================================================= */}

      <section
        className="internship-section"
        id="internship"
      >


        {/* =========================================
            INTERNSHIP HEADING
        ========================================= */}

        <div className="internship-heading">

          <span>
            CAREER OPPORTUNITIES
          </span>

          <h2>

            Start Your

            <em>
              Internship Journey.
            </em>

          </h2>

          <p>

            Build your skills, gain practical experience
            and grow with VELOOP. Submit your internship
            application below.

          </p>

        </div>



        {/* =========================================
            INTERNSHIP CONTAINER
        ========================================= */}

        <div className="internship-container">


          {/* =========================================
              LEFT SIDE
          ========================================= */}

          <div className="internship-info">


            <div className="internship-badge">
              ✦ VELOOP CAREERS
            </div>


            <h3>

              Build Skills.

              <br />

              <span>
                Gain Experience.
              </span>

            </h3>


            <p>

              Choose your preferred technology domain
              and submit your details. Our team can review
              your internship application.

            </p>



            <div className="internship-points">


              <div className="internship-point">

                <span>
                  01
                </span>

                <div>

                  <h4>
                    Choose Your Domain
                  </h4>

                  <p>
                    Select the technology area you want
                    to explore.
                  </p>

                </div>

              </div>



              <div className="internship-point">

                <span>
                  02
                </span>

                <div>

                  <h4>
                    Submit Your Details
                  </h4>

                  <p>
                    Tell us about yourself and your
                    interests.
                  </p>

                </div>

              </div>



              <div className="internship-point">

                <span>
                  03
                </span>

                <div>

                  <h4>
                    Application Review
                  </h4>

                  <p>
                    Your application can be reviewed
                    by the team.
                  </p>

                </div>

              </div>


            </div>


          </div>



          {/* =========================================
              APPLICATION FORM
          ========================================= */}

          <div className="internship-form">


            <div className="internship-form-header">

              <div>

                <span>
                  INTERNSHIP APPLICATION
                </span>

                <h3>
                  Submit Your Application
                </h3>

              </div>


              <div className="internship-form-icon">
                V
              </div>

            </div>



            <form onSubmit={handleSubmit}>


              {/* =====================================
                  ROW 1
              ===================================== */}

              <div className="internship-form-row">


                <div className="internship-field">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />

                </div>



                <div className="internship-field">

                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>


              </div>



              {/* =====================================
                  ROW 2
              ===================================== */}

              <div className="internship-form-row">


                <div className="internship-field">

                  <label>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />

                </div>



                <div className="internship-field">

                  <label>
                    College / University
                  </label>

                  <input
                    type="text"
                    name="college"
                    placeholder="Enter your college name"
                    value={formData.college}
                    onChange={handleChange}
                    required
                  />

                </div>


              </div>



              {/* =====================================
                  ROW 3
              ===================================== */}

              <div className="internship-form-row">


                <div className="internship-field">

                  <label>
                    Internship Domain
                  </label>

                  <select
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select internship domain
                    </option>

                    <option value="Web Development">
                      Web Development
                    </option>

                    <option value="Java Development">
                      Java Development
                    </option>

                    <option value="Python Development">
                      Python Development
                    </option>

                    <option value="Full Stack Development">
                      Full Stack Development
                    </option>

                    <option value="AI / Machine Learning">
                      AI / Machine Learning
                    </option>

                    <option value="Cyber Security">
                      Cyber Security
                    </option>

                  </select>

                </div>



                <div className="internship-field">

                  <label>
                    Preferred Duration
                  </label>

                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select duration
                    </option>

                    <option value="1 Month">
                      1 Month
                    </option>

                    <option value="2 Months">
                      2 Months
                    </option>

                    <option value="3 Months">
                      3 Months
                    </option>

                    <option value="6 Months">
                      6 Months
                    </option>

                  </select>

                </div>


              </div>



              {/* =====================================
                  REASON
              ===================================== */}

              <div className="internship-field internship-message">

                <label>
                  Why are you interested?
                </label>

                <textarea
                  name="reason"
                  rows="5"
                  placeholder="Tell us briefly about your interest, skills or career goals..."
                  value={formData.reason}
                  onChange={handleChange}
                  required
                ></textarea>

              </div>



              {/* =====================================
                  SUBMIT BUTTON
              ===================================== */}

              <button
                type="submit"
                className="internship-submit"
                disabled={loading}
              >

                <span>

                  {loading
                    ? "Submitting..."
                    : "Send Internship Application"}

                </span>

                <span>
                  →
                </span>

              </button>



              {/* =====================================
                  SUCCESS MESSAGE
              ===================================== */}

              {submitted && (

                <div className="internship-success">

                  ✓ Application submitted successfully!

                </div>

              )}


            </form>


          </div>


        </div>



        {/* =========================================
            BOTTOM
        ========================================= */}

        <div className="internship-bottom">

          <span>
            VELOOP REWARDS
          </span>

          <span>
            Build Skills • Gain Experience • Grow
          </span>

        </div>


      </section>


    </div>

  );

}



/* =========================================
   FEATURE COMPONENT
========================================= */

function Feature({
  number,
  icon,
  title,
  text,
}) {

  return (

    <div className="feature-card">


      <div className="feature-number">
        {number}
      </div>


      <div className="feature-icon">
        {icon}
      </div>


      <h3>
        {title}
      </h3>


      <p>
        {text}
      </p>


      <div className="feature-arrow">
        →
      </div>


    </div>

  );

}