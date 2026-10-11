import React, { useEffect, useRef, useState } from "react";
import {
  User,
  History,
  ArrowLeftRight,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  logoutUser,
} from "../services/authService";

import "./AccountMenu.css";


function AccountMenu() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  const user = getCurrentUser();

  const userName = user?.name || "User";

  const userInitial =
    userName.charAt(0).toUpperCase();


  /* =========================================
     CLOSE WHEN CLICKING OUTSIDE
  ========================================= */

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
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


  /* =========================================
     LOGOUT
  ========================================= */

  const handleLogout = () => {

    logoutUser();

    setOpen(false);

    navigate("/login", {
      replace: true,
    });

  };


  /* =========================================
     NAVIGATION
  ========================================= */

  const handleNavigate = (path) => {

    setOpen(false);

    navigate(path);

  };


  return (
    <div
      className="account-menu"
      ref={menuRef}
    >

      {/* =====================================
          ACCOUNT BUTTON
      ===================================== */}

      <button
        type="button"
        className={`account-button ${
          open ? "account-button-active" : ""
        }`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >

        <div className="account-avatar">
          {userInitial}
        </div>

        <div className="account-user-info">

          <strong>
            {userName}
          </strong>

          <span>
            Member
          </span>

        </div>

        <ChevronDown
          size={15}
          className={`account-chevron ${
            open ? "account-chevron-open" : ""
          }`}
        />

      </button>


      {/* =====================================
          DROPDOWN
      ===================================== */}

      {open && (

        <div className="account-dropdown">

          {/* PROFILE */}

          <button
            type="button"
            className="account-dropdown-item"
            onClick={() =>
              handleNavigate("/profile")
            }
          >

            <div className="dropdown-icon">
              <User size={18} />
            </div>

            <div>
              <strong>
                My Profile
              </strong>

              <span>
                View your account
              </span>
            </div>

          </button>


          {/* TRANSACTION HISTORY */}

          <button
            type="button"
            className="account-dropdown-item"
            onClick={() =>
              handleNavigate("/transactions")
            }
          >

            <div className="dropdown-icon">
              <History size={18} />
            </div>

            <div>
              <strong>
                Transaction History
              </strong>

              <span>
                View all transactions
              </span>
            </div>

          </button>


          {/* EXCHANGE HISTORY */}

          <button
            type="button"
            className="account-dropdown-item"
            onClick={() =>
              handleNavigate("/exchange-history")
            }
          >

            <div className="dropdown-icon">
              <ArrowLeftRight size={18} />
            </div>

            <div>
              <strong>
                Exchange History
              </strong>

              <span>
                View Gem to VE conversions
              </span>
            </div>

          </button>


          {/* SETTINGS */}

          <button
            type="button"
            className="account-dropdown-item"
            onClick={() =>
              handleNavigate("/settings")
            }
          >

            <div className="dropdown-icon">
              <Settings size={18} />
            </div>

            <div>
              <strong>
                Account Settings
              </strong>

              <span>
                Manage your account
              </span>
            </div>

          </button>


          {/* DIVIDER */}

          <div className="account-divider"></div>


          {/* LOGOUT */}

          <button
            type="button"
            className="account-dropdown-item logout-item"
            onClick={handleLogout}
          >

            <div className="dropdown-icon logout-icon">
              <LogOut size={18} />
            </div>

            <div>
              <strong>
                Logout
              </strong>

              <span>
                Sign out of VELOOP
              </span>
            </div>

          </button>

        </div>

      )}

    </div>
  );
}

export default AccountMenu;