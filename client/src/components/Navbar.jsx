import React, {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  getCurrentUser,
  logoutUser,
} from "../services/authService";

import "./Navbar.css";


export default function Navbar() {

  const [open, setOpen] = useState(false);

  const profileRef = useRef(null);

  const navigate = useNavigate();

  const user = getCurrentUser();

  const userName =
    user?.name || "User";

  const gems =
    user?.gems ?? 0;

  const ves =
    user?.ves ?? 0;

  const avatarLetter =
    userName
      .charAt(0)
      .toUpperCase();


  // ==========================================
  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  // ==========================================

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {

        setOpen(false);

      }

    };


    document.addEventListener(
      "mousedown",
      handleClickOutside
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    logoutUser();

    setOpen(false);

    navigate("/login");

  };


  // ==========================================
  // TRANSACTION HISTORY
  // ==========================================

  const handleTransactionHistory = () => {

    setOpen(false);

    navigate(
      "/transaction-history"
    );

  };


  // ==========================================
  // DASHBOARD
  // ==========================================

  const handleDashboard = () => {

    setOpen(false);

    navigate("/dashboard");

  };


  return (

    <header className="navbar">

      <div className="navbar-inner">


        {/* =====================================
            BRAND
        ===================================== */}

        <NavLink
          to="/"
          className="brand"
        >

          <div className="brand-mark">
            <span>V</span>
          </div>


          <div className="brand-name">

            <strong>
              VELOOP
            </strong>

            <small>
              REWARDS
            </small>

          </div>

        </NavLink>


        {/* =====================================
            NAVIGATION
        ===================================== */}

        <nav className="nav-links">


          {/* HOME */}

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "nav-item active"
                : "nav-item"
            }
          >

            <span>⌂</span>

            Home

          </NavLink>


          {/* ABOUT */}

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "nav-item active"
                : "nav-item"
            }
          >

            <span>✦</span>

            About

          </NavLink>


          {/* DASHBOARD */}

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "nav-item active"
                : "nav-item"
            }
          >

            <span>▣</span>

            Dashboard

          </NavLink>


          {/* =================================
              TECHNICAL QUIZ
          ================================= */}

          <NavLink
            to="/quiz"
            className={({ isActive }) =>
              isActive
                ? "nav-item active"
                : "nav-item"
            }
          >

            <span>🧠</span>

            Quiz

          </NavLink>


          {/* EXCHANGE CENTER */}

          <NavLink
            to="/exchange-center"
            className={({ isActive }) =>
              isActive
                ? "nav-item active exchange"
                : "nav-item exchange"
            }
          >

            <span>◇</span>

            Exchange Center

          </NavLink>


        </nav>


        {/* =====================================
            RIGHT SIDE
        ===================================== */}

        <div className="nav-right">


          {/* =================================
              GEMS
          ================================= */}

          <div className="mini-balance">

            <div className="gem-icon">
              ◆
            </div>


            <div>

              <small>
                GEMS
              </small>

              <strong>
                {gems.toLocaleString()}
              </strong>

            </div>

          </div>


          {/* =================================
              NOTIFICATION
          ================================= */}

          <button
            type="button"
            className="notification"
          >

            ♢

            <i></i>

          </button>


          {/* =================================
              PROFILE
          ================================= */}

          <div
            className="profile-wrapper"
            ref={profileRef}
          >

            <button
              type="button"
              className={`profile ${
                open
                  ? "profile-open"
                  : ""
              }`}
              onClick={() =>
                setOpen(!open)
              }
            >

              <div className="avatar">

                {avatarLetter}

              </div>


              <div className="profile-name">

                <strong>
                  {userName}
                </strong>

                <small>
                  Member
                </small>

              </div>


              <span className="profile-arrow">

                {open
                  ? "⌃"
                  : "⌄"}

              </span>

            </button>


            {/* =================================
                DROPDOWN
            ================================= */}

            {open && (

              <div className="account-dropdown">


                {/* ACCOUNT HEADER */}

                <div className="account-header">

                  <div className="account-avatar">

                    {avatarLetter}

                  </div>


                  <div>

                    <strong>
                      {userName}
                    </strong>

                    <span>
                      Member Account
                    </span>

                  </div>

                </div>


                {/* =================================
                    BALANCES
                ================================= */}

                <div className="account-balances">

                  <div>

                    <small>
                      GEMS
                    </small>

                    <strong>
                      {gems.toLocaleString()}
                    </strong>

                  </div>


                  <div>

                    <small>
                      VEs
                    </small>

                    <strong>
                      {ves.toLocaleString()}
                    </strong>

                  </div>

                </div>


                {/* DIVIDER */}

                <div className="dropdown-divider"></div>


                {/* =================================
                    TRANSACTION HISTORY
                ================================= */}

                <button
                  type="button"
                  className="account-menu-item"
                  onClick={
                    handleTransactionHistory
                  }
                >

                  <span className="menu-icon">
                    ↔
                  </span>


                  <div>

                    <strong>
                      Transaction History
                    </strong>

                    <small>
                      View your reward activity
                    </small>

                  </div>


                  <span className="menu-arrow">
                    →
                  </span>

                </button>


                {/* =================================
                    DASHBOARD
                ================================= */}

                <button
                  type="button"
                  className="account-menu-item"
                  onClick={
                    handleDashboard
                  }
                >

                  <span className="menu-icon">
                    ▣
                  </span>


                  <div>

                    <strong>
                      Dashboard
                    </strong>

                    <small>
                      View your account
                    </small>

                  </div>


                  <span className="menu-arrow">
                    →
                  </span>

                </button>


                {/* =================================
                    DIVIDER
                ================================= */}

                <div className="dropdown-divider"></div>


                {/* =================================
                    LOGOUT
                ================================= */}

                <button
                  type="button"
                  className="account-menu-item logout-item"
                  onClick={
                    handleLogout
                  }
                >

                  <span className="menu-icon">
                    ↪
                  </span>


                  <div>

                    <strong>
                      Logout
                    </strong>

                    <small>
                      Sign out of your account
                    </small>

                  </div>


                  <span className="menu-arrow">
                    →
                  </span>

                </button>


              </div>

            )}

          </div>


        </div>

      </div>

    </header>

  );

}