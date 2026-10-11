import React, {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  adminLogin
} from "../services/adminService";

import "./AdminLogin.css";


export default function AdminLogin() {

  const navigate =
    useNavigate();


  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  async function handleSubmit(e) {

    e.preventDefault();

    setError("");

    setLoading(true);


    try {

      await adminLogin(
        email,
        password
      );

      navigate("/admin/dashboard");

    } catch (error) {

      setError(
        error.message
      );

    } finally {

      setLoading(false);

    }

  }


  return (

    <div className="admin-login-page">

      <div className="admin-login-card">

        <span className="admin-label">
          VELOOP REWARDS
        </span>

        <h1>
          Admin Login
        </h1>

        <p>
          Login to manage internship applications.
        </p>


        {error && (

          <div className="admin-error">
            {error}
          </div>

        )}


        <form
          onSubmit={handleSubmit}
        >

          <label>
            Admin Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter admin email"
            required
          />


          <label>
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter admin password"
            required
          />


          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Logging in..."
              : "Login as Admin"}

          </button>

        </form>

      </div>

    </div>

  );

}