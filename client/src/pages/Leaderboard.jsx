import React, {
  useEffect,
  useState
} from "react";

import {
  getCurrentUser
} from "../services/authService";

import {
  getLeaderboard
} from "../services/leaderboardService";

import "./Leaderboard.css";


export default function Leaderboard() {

  const [
    leaderboard,
    setLeaderboard
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

    loadLeaderboard();

  }, []);


  async function loadLeaderboard() {

    try {

      setLoading(true);

      setError("");

      const data =
        await getLeaderboard();

      const currentUser =
        getCurrentUser();


      const updatedData =
        data.map((user) => ({

          ...user,

          isCurrentUser:
            currentUser &&
            (
              (
                currentUser.id &&
                user.id === currentUser.id
              ) ||
              (
                currentUser.email &&
                user.email === currentUser.email
              )
            ),

        }));


      setLeaderboard(
        updatedData
      );

    } catch (error) {

      console.error(
        "Leaderboard error:",
        error
      );

      setError(
        error.message ||
        "Unable to load leaderboard"
      );

    } finally {

      setLoading(false);

    }

  }


  return (

    <main className="leaderboard-page">

      <div className="leaderboard-container">

        <section className="leaderboard-header">

          <span className="leaderboard-label">
            VELOOP REWARDS
          </span>

          <h1>
            Conversion{" "}
            <em>Leaderboard.</em>
          </h1>

          <p>
            See who has converted the most
            VEs through reward exchanges.
          </p>

        </section>


        <section className="leaderboard-card">

          <div className="leaderboard-title">

            <div>

              <span>
                TOP CONVERTERS
              </span>

              <h2>
                Rewards Rankings
              </h2>

            </div>

            <div className="ranking-info">
              Highest VE conversion
            </div>

          </div>


          <div className="leaderboard-table-header">

            <span>RANK</span>

            <span>USER</span>

            <span>CONVERSIONS</span>

            <span>TOTAL VEs</span>

          </div>


          {loading ? (

            <div className="leaderboard-empty">

              <h2>
                Loading leaderboard...
              </h2>

            </div>

          ) : error ? (

            <div className="leaderboard-empty">

              <h2>
                Unable to load leaderboard
              </h2>

              <p>
                {error}
              </p>

            </div>

          ) : leaderboard.length === 0 ? (

            <div className="leaderboard-empty">

              <h2>
                No users found
              </h2>

              <p>
                Registered users will appear here.
              </p>

            </div>

          ) : (

            <div className="leaderboard-list">

              {leaderboard.map(
                (user, index) => (

                  <div
                    key={user.id}
                    className={
                      `leaderboard-row ${
                        index === 0
                          ? "top-one"
                          : ""
                      } ${
                        user.isCurrentUser
                          ? "current-user"
                          : ""
                      }`
                    }
                  >

                    <div className="leaderboard-rank">

                      {index === 0
                        ? "🥇"
                        : index === 1
                        ? "🥈"
                        : index === 2
                        ? "🥉"
                        : `#${index + 1}`
                      }

                    </div>


                    <div className="leaderboard-user">

                      <div className="leaderboard-avatar">

                        {(
                          user.name ||
                          "U"
                        )
                          .charAt(0)
                          .toUpperCase()}

                      </div>


                      <div className="leaderboard-user-info">

                        <strong>

                          {user.name}

                          {user.isCurrentUser && (

                            <small className="you-badge">
                              YOU
                            </small>

                          )}

                        </strong>

                        <small>
                          {user.email}
                        </small>

                      </div>

                    </div>


                    <div className="leaderboard-conversions">

                      {user.conversionCount}

                      <span>
                        Conversions
                      </span>

                    </div>


                    <div className="leaderboard-ves">

                      +
                      {Number(
                        user.totalVEs || 0
                      ).toLocaleString()}

                      <span>
                        VEs
                      </span>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </section>

      </div>

    </main>

  );

}