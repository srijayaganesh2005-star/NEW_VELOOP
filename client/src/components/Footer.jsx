import { Link } from "react-router-dom";
import React from "react";
import "./Footer.css";

export default function Footer() {

  return (
    <footer className="footer">

      <div className="footer-inner">

        <div className="footer-brand">

          <div className="footer-logo">
            V
          </div>

          <div>
            <strong>VELOOP</strong>
            <small>REWARDS</small>
          </div>

        </div>


        <p>
          Earn. Engage. Exchange.
        </p>


        <div className="footer-links">

          <Link to="/">Home</Link>

          <Link to="/about">About</Link>

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/exchange-center">
            Exchange Center
          </Link>

        </div>

      </div>


      <div className="footer-bottom">

        <span>
          © 2026 VELOOP Rewards. All rights reserved.
        </span>

        <span>
          Built for the reward-driven.
        </span>

      </div>

    </footer>
  );
}