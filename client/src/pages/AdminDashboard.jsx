import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  getInternshipApplications,
  updateApplicationStatus,
  isAdminLoggedIn,
  adminLogout
} from "../services/adminService";

import "./AdminDashboard.css";


export default function AdminDashboard() {

  const navigate =
    useNavigate();


  const [
    applications,
    setApplications
  ] = useState([]);


  const [
    loading,
    setLoading
  ] = useState(true);


  const [
    error,
    setError
  ] = useState("");


  useEffect(() => {

    if (!isAdminLoggedIn()) {

      navigate("/admin/login");

      return;

    }

    loadApplications();

  }, []);


  async function loadApplications() {

    try {

      setLoading(true);

      setError("");

      const data =
        await getInternshipApplications();

      setApplications(data);

    } catch (error) {

      console.error(
        error
      );

      setError(
        error.message
      );

    } finally {

      setLoading(false);

    }

  }


  async function changeStatus(
    id,
    status
  ) {

    try {

      await updateApplicationStatus(
        id,
        status
      );

      await loadApplications();

    } catch (error) {

      alert(
        error.message
      );

    }

  }


  function handleLogout() {

    adminLogout();

    navigate(
      "/admin/login"
    );

  }


  const pending =
    applications.filter(
      (app) =>
        app.status === "Pending"
    ).length;


  const accepted =
    applications.filter(
      (app) =>
        app.status === "Accepted"
    ).length;


  const rejected =
    applications.filter(
      (app) =>
        app.status === "Rejected"
    ).length;


  return (

    <div className="admin-dashboard">

      {/* HEADER */}

      <header className="admin-dashboard-header">

        <div>

          <span>
            VELOOP REWARDS
          </span>

          <h1>
            Admin Dashboard
          </h1>

        </div>


        <button
          onClick={handleLogout}
        >
          Logout
        </button>

      </header>


      {/* STATS */}

      <section className="admin-stats">

        <div className="admin-stat-card">

          <span>
            TOTAL
          </span>

          <strong>
            {applications.length}
          </strong>

        </div>


        <div className="admin-stat-card">

          <span>
            PENDING
          </span>

          <strong>
            {pending}
          </strong>

        </div>


        <div className="admin-stat-card">

          <span>
            ACCEPTED
          </span>

          <strong>
            {accepted}
          </strong>

        </div>


        <div className="admin-stat-card">

          <span>
            REJECTED
          </span>

          <strong>
            {rejected}
          </strong>

        </div>

      </section>


      {/* APPLICATIONS */}

      <section className="admin-applications">

        <div className="admin-section-header">

          <div>

            <span>
              INTERNSHIP
            </span>

            <h2>
              Applications
            </h2>

          </div>


          <button
            onClick={
              loadApplications
            }
          >
            Refresh
          </button>

        </div>


        {loading && (

          <div className="admin-message">
            Loading applications...
          </div>

        )}


        {error && (

          <div className="admin-message error">
            {error}
          </div>

        )}


        {!loading &&
          !error &&
          applications.length === 0 && (

            <div className="admin-message">
              No internship applications found.
            </div>

          )}


        {!loading &&
          applications.length > 0 && (

            <div className="application-table-wrapper">

              <table>

                <thead>

                  <tr>

                    <th>
                      Applicant
                    </th>

                    <th>
                      College
                    </th>

                    <th>
                      Domain
                    </th>

                    <th>
                      Duration
                    </th>

                    <th>
                      Contact
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {applications.map(
                    (application) => (

                      <tr
                        key={
                          application._id
                        }
                      >

                        <td>

                          <strong>
                            {
                              application.fullName
                            }
                          </strong>

                          <small>
                            {
                              application.email
                            }
                          </small>

                        </td>


                        <td>
                          {
                            application.college
                          }
                        </td>


                        <td>
                          {
                            application.domain
                          }
                        </td>


                        <td>
                          {
                            application.duration
                          }
                        </td>


                        <td>
                          {
                            application.phone
                          }
                        </td>


                        <td>

                          <span
                            className={
                              `status-badge ${application.status
                                .toLowerCase()
                                .replace(
                                  " ",
                                  "-"
                                )}`
                            }
                          >
                            {
                              application.status
                            }
                          </span>

                        </td>


                        <td>

                          <div className="status-actions">

                            <button
                              onClick={() =>
                                changeStatus(
                                  application._id,
                                  "Under Review"
                                )
                              }
                            >
                              Review
                            </button>


                            <button
                              onClick={() =>
                                changeStatus(
                                  application._id,
                                  "Accepted"
                                )
                            }
                            >
                              Accept
                            </button>


                            <button
                              onClick={() =>
                                changeStatus(
                                  application._id,
                                  "Rejected"
                                )
                              }
                            >
                              Reject
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

      </section>

    </div>

  );

}