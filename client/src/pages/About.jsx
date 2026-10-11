import React from "react";
import "./About.css";
import { useNavigate } from "react-router-dom";
import SpinWheel from "../components/SpinWheel";
const About = () => {
  return (
    
    <div className="about-page">

      {/* ================= HERO ================= */}
      <section className="about-hero">
        <div className="hero-badge">VELOOP REWARDS</div>

        <h1>
          Earn. <span>Engage.</span> Exchange.
        </h1>

    {/* Spin Wheel */}
    <section className="spin-wheel-section">
      <SpinWheel />
    </section>

        <p>
          VEloop Rewards is a digital rewards platform designed to make
          everyday engagement more rewarding.
        </p>

        <a href="#about" className="hero-btn">
          Discover VEloop ↓
        </a>
      </section>
      


      {/* ================= ABOUT ================= */}
      <section className="about-section" id="about">

        <div className="section-label">ABOUT VELOOP</div>

        <h2>
          What is <span>VEloop Rewards?</span>
        </h2>

        <p className="section-description">
          VEloop Rewards brings activities, quizzes, digital rewards and
          user progress together in one platform. Users can create an
          account, participate in activities, earn rewards and track
          their progress through their personal dashboard.
        </p>

        <div className="about-highlight">

          <div className="highlight-icon">V</div>

          <div>
            <h3>One Platform. Multiple Ways to Engage.</h3>

            <p>
              VEloop is designed to create an engaging reward experience
              where users can participate, learn, earn and keep track of
              their progress.
            </p>
          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="about-section">

        <div className="section-label">HOW IT WORKS</div>

        <h2>
          Your journey with <span>VEloop</span>
        </h2>

        <div className="steps-container">

          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-icon">👤</div>
            <h3>Create Account</h3>
            <p>
              Create your VEloop account and start your rewards journey.
            </p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-icon">🧠</div>
            <h3>Complete Activities</h3>
            <p>
              Participate in quizzes and available engagement activities.
            </p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-icon">💎</div>
            <h3>Earn Rewards</h3>
            <p>
              Earn Gems and manage your reward balances through your account.
            </p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step-card">
            <div className="step-number">04</div>
            <div className="step-icon">🏆</div>
            <h3>Track Progress</h3>
            <p>
              Monitor your rewards, progress and leaderboard information.
            </p>
          </div>

        </div>

      </section>


      {/* ================= REWARD SYSTEM ================= */}
      <section className="about-section reward-section">

        <div className="section-label">REWARD SYSTEM</div>

        <h2>
          Rewards that keep you <span>engaged</span>
        </h2>

        <div className="reward-grid">

          {/* GEMS */}
          <div className="reward-card">

            <div className="reward-icon">
              💎
            </div>

            <div className="reward-title">
              GEMS
            </div>

            <p>
              Gems are digital reward points that users can earn through
              eligible activities and quizzes on the VEloop platform.
            </p>

            <div className="reward-line"></div>

            <ul>
              <li>Earn through activities</li>
              <li>Quiz-based rewards</li>
              <li>Stored in your account</li>
              <li>Track balance from dashboard</li>
            </ul>

          </div>


          {/* VES */}
          <div className="reward-card">

            <div className="reward-icon">
              🪙
            </div>

            <div className="reward-title">
              VES
            </div>

            <p>
              VES represents another reward balance maintained within
              the VEloop ecosystem.
            </p>

            <div className="reward-line"></div>

            <ul>
              <li>Separate reward balance</li>
              <li>Visible in dashboard</li>
              <li>Managed through your account</li>
              <li>Designed for future reward features</li>
            </ul>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}
      <section className="about-section">

        <div className="section-label">PLATFORM FEATURES</div>

        <h2>
          Everything in <span>one place</span>
        </h2>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">👤</div>
            <h3>Personal Account</h3>
            <p>
              Manage your profile and reward information securely.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Technical Quizzes</h3>
            <p>
              Test your knowledge and earn rewards through quizzes.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h3>Reward Management</h3>
            <p>
              Keep track of your Gems and VES balances.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Dashboard</h3>
            <p>
              View your account information and reward progress.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Leaderboard</h3>
            <p>
              Track your position and progress within the platform.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Exchange Center</h3>
            <p>
              Explore the platform's reward exchange experience.
            </p>
          </div>

        </div>

      </section>


      {/* ================= FUTURE ================= */}
      <section className="future-section">

        <div className="section-label">WHAT'S NEXT</div>

        <h2>
          The future of <span>VEloop</span>
        </h2>

        <p>
          VEloop is designed to continuously expand its reward ecosystem
          and provide users with more engaging ways to participate.
        </p>

        <div className="future-grid">

          <div>✓ More reward activities</div>
          <div>✓ More technical quizzes</div>
          <div>✓ Reward redemption</div>
          <div>✓ Improved leaderboard</div>
          <div>✓ More ways to earn Gems</div>
          <div>✓ Expanded exchange features</div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="about-cta">

        <div className="cta-logo">
          V
        </div>

        <h2>
          Ready to start your <span>VEloop journey?</span>
        </h2>

        <p>
          Create your account, explore the platform and start earning
          rewards.
        </p>

        <a href="/register" className="cta-button">
          Create Account →
        </a>

      </section>

    </div>
  );
  <div className="about-spin-card">

  <div className="about-spin-icon">
    🎡
  </div>

  <div className="about-spin-content">

    <span>DAILY REWARD</span>

    <h3>
      Spin & Win
    </h3>

    <p>
      Spin the wheel once every day and
      earn free Gems.
    </p>

  </div>

  <button
    onClick={() => navigate("/spin-wheel")}
    className="about-spin-button"
  >
    Spin Now →
  </button>

</div>
};

export default About;