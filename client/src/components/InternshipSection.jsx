import React, { useState } from "react";

function InternshipSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    domain: "",
    duration: "",
    reason: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/internships/apply",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Application failed"
        );
      }

      setMessage(
        "Application submitted successfully!"
      );

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
      console.error(
        "INTERNSHIP SUBMIT ERROR:",
        error
      );

      setMessage(
        error.message === "Failed to fetch"
          ? "Unable to connect to server. Please make sure the backend is running on port 5000."
          : error.message
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="internship-section"
      id="internship"
    >

      <div className="internship-container">

        {/* LEFT SIDE */}

        <div className="internship-intro">

          <span className="internship-tag">
            INTERNSHIP PROGRAM
          </span>

          <h2>
            Build Skills.
            <br />
            <span>Gain Experience.</span>
          </h2>

          <p>
            Take the next step in your career with the VELOOP
            internship program. Choose your preferred domain,
            share your details and submit your application.
          </p>

          <div className="internship-features">

            <div className="internship-feature">

              <span>01</span>

              <div>

                <h4>
                  Choose Your Domain
                </h4>

                <p>
                  Select the technology area you are interested in.
                </p>

              </div>

            </div>


            <div className="internship-feature">

              <span>02</span>

              <div>

                <h4>
                  Submit Your Details
                </h4>

                <p>
                  Tell us about yourself and your career interests.
                </p>

              </div>

            </div>


            <div className="internship-feature">

              <span>03</span>

              <div>

                <h4>
                  Application Review
                </h4>

                <p>
                  Our team will receive and review your application.
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="internship-form">

          <div className="internship-form-header">

            <span>
              INTERNSHIP APPLICATION
            </span>

            <h3>
              Submit Your Application
            </h3>

          </div>


          <form onSubmit={handleSubmit}>

            {/* NAME + EMAIL */}

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


            {/* PHONE + COLLEGE */}

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


            {/* DOMAIN + DURATION */}

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


            {/* REASON */}

            <div className="internship-field">

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
              />

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              className="internship-submit"
              disabled={loading}
            >

              {loading
                ? "Sending..."
                : "Send Internship Application"}

              <span>
                →
              </span>

            </button>


            {/* MESSAGE */}

            {message && (

              <div className="internship-message">

                {message}

              </div>

            )}

          </form>

        </div>

      </div>

    </section>
  );
}

export default InternshipSection;