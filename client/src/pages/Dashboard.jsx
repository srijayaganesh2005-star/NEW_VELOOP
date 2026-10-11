import React, {
  useEffect,
  useState
} from "react";

import {
  getCurrentUser
} from "../services/authService";

import LeaderboardBanner from "../components/LeaderboardBanner";
import WatchAdBanner from "../components/WatchAdBanner";
import ContactBanner from "../components/ContactBanner";
import FollowEarnBanner from "../components/FollowEarnBanner";
import DailyBonusBanner from "../components/DailyBonusBanner";
import SpinWheel from "../components/SpinWheel";

import "./Dashboard.css";


export default function Dashboard() {

  // =========================================
  // CURRENT USER
  // =========================================

  const user = getCurrentUser();

  const userName =
    user?.name || "User";

  const userEmail =
    user?.email || "";

  const gems =
    user?.gems ?? 0;

  const ves =
    user?.ves ?? 0;


  // =========================================
  // INTERNSHIP STATUS
  // =========================================

  const [
    internshipApplications,
    setInternshipApplications
  ] = useState([]);


  const [
    internshipLoading,
    setInternshipLoading
  ] = useState(true);


  const [
    internshipError,
    setInternshipError
  ] = useState("");


  // =========================================
  // LOAD USER INTERNSHIP APPLICATIONS
  // =========================================

  useEffect(() => {

    loadInternshipApplications();

  }, [userEmail]);


  async function loadInternshipApplications() {

    try {

      setInternshipLoading(true);

      setInternshipError("");


      // -----------------------------------------
      // CHECK USER EMAIL
      // -----------------------------------------

      if (!userEmail) {

        setInternshipError(
          "Unable to identify your account email."
        );

        setInternshipLoading(false);

        return;
      }


      // -----------------------------------------
      // PREPARE EMAIL
      // -----------------------------------------

      const email =
        encodeURIComponent(
          userEmail
            .trim()
            .toLowerCase()
        );


      console.log(
        "Loading internship application for:",
        userEmail
      );


      // -----------------------------------------
      // BACKEND API
      // -----------------------------------------

      const response =
        await fetch(
          `http://localhost:5000/api/internships/my?email=${email}`,
          {
            method: "GET",

            headers: {
              Accept:
                "application/json"
            }
          }
        );


      // -----------------------------------------
      // READ RESPONSE
      // -----------------------------------------

      const data =
        await response.json();


      console.log(
        "INTERNSHIP STATUS RESPONSE:",
        data
      );


      // -----------------------------------------
      // CHECK RESPONSE
      // -----------------------------------------

      if (!response.ok) {

        throw new Error(
          data.message ||
          "Unable to load internship applications."
        );

      }


      // -----------------------------------------
      // SAVE APPLICATIONS
      // -----------------------------------------

      setInternshipApplications(

        Array.isArray(
          data.applications
        )
          ? data.applications
          : []

      );


    } catch (error) {

      console.error(
        "INTERNSHIP STATUS ERROR:",
        error
      );


      setInternshipError(
        error.message ||
        "Unable to load internship status."
      );


    } finally {

      setInternshipLoading(false);

    }

  }


  // =========================================
  // TRANSACTION HISTORY
  // =========================================

  const getTransactionHistory = () => {

    try {

      const history =
        localStorage.getItem(
          "conversionHistory"
        );


      if (!history) {

        return [];

      }


      const parsedHistory =
        JSON.parse(history);


      return Array.isArray(
        parsedHistory
      )
        ? parsedHistory
        : [];


    } catch (error) {

      console.error(
        "Failed to load transaction history:",
        error
      );


      return [];

    }

  };


  const transactions =
    getTransactionHistory();


  // =========================================
  // FORMAT DATE
  // =========================================

  const formatDate = (
    dateValue
  ) => {

    if (!dateValue) {

      return "Unknown date";

    }


    try {

      return new Date(
        dateValue
      ).toLocaleString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }
      );


    } catch (error) {

      return "Unknown date";

    }

  };


  // =========================================
  // STATUS CLASS
  // =========================================

  const getStatusClass = (
    status
  ) => {

    if (!status) {

      return "pending";

    }


    return status
      .toLowerCase()
      .replace(
        /\s+/g,
        "-"
      );

  };


  // =========================================
  // RENDER
  // =========================================

  return (

    <div className="dashboard-page">


      {/* =========================================
          HEADER
      ========================================= */}

      <section className="dashboard-heading">

        <div>

          <span>
            MY DASHBOARD
          </span>


          <h1>

            Welcome back,

            <em>
              {" "}
              {userName}.
            </em>

          </h1>


          <p>

            Keep earning. Keep growing. Your next
            reward is closer than you think.

          </p>

        </div>


        {/* STREAK */}

        <div className="streak-box">

          <span>
            🔥
          </span>


          <div>

            <small>
              CURRENT STREAK
            </small>


            <strong>
              5 DAYS
            </strong>

          </div>

        </div>

      </section>



      {/* =========================================
          BALANCES
      ========================================= */}

      <section className="balance-grid">


        {/* GEMS */}

        <div className="balance-card gold-card">

          <div className="balance-card-icon">
            ◆
          </div>


          <span>
            AVAILABLE GEMS
          </span>


          <strong>
            {gems.toLocaleString()}
          </strong>


          <small>
            Your current balance
          </small>

        </div>



        {/* VEs */}

        <div className="balance-card">

          <div className="balance-card-icon">
            ◇
          </div>


          <span>
            AVAILABLE VEs
          </span>


          <strong>
            {ves.toLocaleString()}
          </strong>


          <small>
            Ready to exchange
          </small>

        </div>



        {/* LEADERBOARD */}

        <div className="balance-card">

          <div className="balance-card-icon">
            ♛
          </div>


          <span>
            LEADERBOARD
          </span>


          <strong>
            #08
          </strong>


          <small>
            Top 10% this week
          </small>

        </div>

      </section>



      {/* =========================================
          INTERNSHIP APPLICATION STATUS
      ========================================= */}

      <section className="transaction-section">


        <div className="section-title">

          <div>

            <span>
              INTERNSHIP
            </span>


            <h2>

              Application

              <em>
                {" "}
                Status.
              </em>

            </h2>

          </div>


          <span className="section-note">

            {internshipApplications.length}

            {" "}

            application

            {internshipApplications.length !== 1
              ? "s"
              : ""}

          </span>

        </div>



        {/* =========================================
            LOADING
        ========================================= */}

        {internshipLoading && (

          <div className="empty-transactions">

            <div className="empty-transaction-icon">
              ◇
            </div>


            <h3>
              Loading application status...
            </h3>


            <p>

              Please wait while we check your
              internship application.

            </p>

          </div>

        )}



        {/* =========================================
            ERROR
        ========================================= */}

        {!internshipLoading &&
          internshipError && (

            <div className="empty-transactions">

              <div className="empty-transaction-icon">
                !
              </div>


              <h3>
                Unable to load status
              </h3>


              <p>
                {internshipError}
              </p>


              <button
                type="button"
                onClick={
                  loadInternshipApplications
                }
              >
                Try Again
              </button>

            </div>

          )}



        {/* =========================================
            NO APPLICATION
        ========================================= */}

        {!internshipLoading &&
          !internshipError &&
          internshipApplications.length === 0 && (

            <div className="empty-transactions">

              <div className="empty-transaction-icon">
                ◇
              </div>


              <h3>
                No internship application
              </h3>


              <p>

                You have not submitted an internship
                application yet.

              </p>

            </div>

          )}



        {/* =========================================
            APPLICATIONS
        ========================================= */}

        {!internshipLoading &&
          !internshipError &&
          internshipApplications.length > 0 && (

            <div className="transaction-list">

              {internshipApplications.map(
                (application) => (

                  <div
                    className="transaction-card"
                    key={application._id}
                  >


                    {/* ICON */}

                    <div className="transaction-icon">
                      ◆
                    </div>



                    {/* DETAILS */}

                    <div className="transaction-details">

                      <strong>

                        {application.domain ||
                          "Internship Application"}

                      </strong>


                      <span>

                        {application.duration}

                      </span>


                      <span>

                        Applied on{" "}

                        {formatDate(
                          application.createdAt
                        )}

                      </span>

                    </div>



                    {/* STATUS */}

                    <div
                      className={
                        `transaction-status ${getStatusClass(
                          application.status
                        )}`
                      }
                    >

                      {application.status ||
                        "Pending"}

                    </div>


                  </div>

                )
              )}

            </div>

          )}

      </section>



      {/* =========================================
          TRANSACTION HISTORY
      ========================================= */}

    



      {/* =========================================
          REWARD SECTION
      ========================================= */}

      <section className="reward-section">


        <div className="section-title">

          <div>

            <span>
              EXPLORE REWARDS
            </span>


            <h2>

              Earn more.

              <em>
                {" "}
                Do more.
              </em>

            </h2>

          </div>


          <span className="section-note">
            5 active opportunities
          </span>

        </div>



        {/* 01 - LEADERBOARD */}

        <LeaderboardBanner />



        {/* 02 - WATCH ADS */}

        <WatchAdBanner />



        {/* 03 - CONTACT SUPPORT */}

        <ContactBanner />



        {/* 04 - FOLLOW & EARN */}

        <FollowEarnBanner />



        {/* 05 - DAILY BONUS */}

        <DailyBonusBanner />

      </section>


    </div>

  );

}