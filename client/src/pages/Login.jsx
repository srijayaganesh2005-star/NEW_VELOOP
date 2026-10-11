import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      // Check existing account in MongoDB
      const data = await loginUser(email, password);

      console.log("Login successful:", data.user);

      // Existing account verified
      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.message || "Invalid email or password."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-glow"></div>

      <div className="auth-card">

        {/* LOGO */}
        <div className="auth-logo">
          V
        </div>

        <span className="auth-label">
          VELOOP REWARDS
        </span>

        {/* TITLE */}
        <h1>
          Welcome <em>Back.</em>
        </h1>

        <p>
          Sign in to access your rewards dashboard.
        </p>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <label htmlFor="email">
            EMAIL
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            autoComplete="email"
            required
          />

          {/* PASSWORD */}
          <label htmlFor="password">
            PASSWORD
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            autoComplete="current-password"
            required
          />

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Sign In →"}
          </button>

        </form>

        {/* REGISTER LINK */}
        <div className="auth-footer">

          <span>
            Don't have an account?
          </span>

          <Link to="/register">
            Create Account
          </Link>

        </div>

      </div>

    </div>
  );
  console.log("LOGIN USER DATA:", data.user);
console.log("GEMS:", data.user.gems);
console.log("VES:", data.user.ves);
}