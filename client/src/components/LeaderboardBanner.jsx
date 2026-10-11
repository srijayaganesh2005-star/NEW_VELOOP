import React, { useEffect, useState } from "react";

import {
  Trophy,
  ArrowRight,
  Loader2,
} from "lucide-react";

import styles from "./LeaderboardBanner.module.css";
import newImage from "../new.png";

import { getLeaderboard } from "../services/leaderboardService";


function LeaderboardBanner() {

  const [showLeaderboard, setShowLeaderboard] =
    useState(false);

  const [players, setPlayers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // ========================================
  // LOAD LEADERBOARD
  // ========================================

  const handleLeaderboard = async () => {

    setShowLeaderboard(true);

    setLoading(true);

    setError("");

    try {

      const data = await getLeaderboard();

      // Sort HIGH → LOW based on VEs
      const sortedData = [...data].sort(
        (a, b) =>
          Number(b.totalVEs || b.ves || 0) -
          Number(a.totalVEs || a.ves || 0)
      );

      setPlayers(sortedData);

    } catch (error) {

      console.error(
        "Leaderboard error:",
        error
      );

      setError(
        "Unable to load leaderboard."
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <section className={styles.banner}>

      <div className={styles.goldGlow}></div>

      <div className={styles.blueGlow}></div>


      {/* ========================================
          LEFT SIDE
      ======================================== */}

      <div className={styles.left}>

        <div className={styles.badge}>

          <div className={styles.badgeIcon}>

            <Trophy size={17} />

          </div>

          <span>
            VE REWARDS
          </span>

        </div>


        <h1 className={styles.heading}>

          Climb the

          <br />

          <span>
            Leaderboard
          </span>

        </h1>


        <p className={styles.description}>

          Compete, climb, and earn VE coins.

          <br />

          The higher you rank, the greater the rewards.

        </p>


        <button
          type="button"
          className={styles.leaderboardButton}
          onClick={handleLeaderboard}
        >

          <Trophy size={21} />

          <span>
            View Leaderboard
          </span>

          <ArrowRight size={21} />

        </button>

      </div>


      {/* ========================================
          RIGHT SIDE IMAGE
      ======================================== */}

      <div className={styles.visual}>

        <img
          src={newImage}
          alt="Leaderboard rewards"
          className={styles.leaderboardImage}
        />

      </div>


      {/* ========================================
          LEADERBOARD POPUP
      ======================================== */}

      {showLeaderboard && (

        <div className={styles.overlay}>

          <div className={styles.modal}>


            {/* CLOSE */}

            <button
              type="button"
              className={styles.closeButton}
              onClick={() =>
                setShowLeaderboard(false)
              }
            >
              ×
            </button>


            <Trophy
              size={42}
              className={styles.modalTrophy}
            />


            <h2>
              Leaderboard
            </h2>


            <p>
              Current VE conversion rankings
            </p>


            {/* ========================================
                LOADING
            ======================================== */}

            {loading && (

              <div className={styles.loading}>

                <Loader2
                  size={28}
                  className={styles.spinner}
                />

                <span>
                  Loading leaderboard...
                </span>

              </div>

            )}


            {/* ========================================
                ERROR
            ======================================== */}

            {!loading && error && (

              <div className={styles.error}>

                {error}

              </div>

            )}


            {/* ========================================
                NO USERS
            ======================================== */}

            {!loading &&
              !error &&
              players.length === 0 && (

                <div className={styles.empty}>

                  No conversion data yet.

                </div>

              )}


            {/* ========================================
                PLAYERS
            ======================================== */}

            {!loading &&
              !error &&
              players.length > 0 && (

                <div className={styles.modalList}>

                  {players.map(
                    (player, index) => {

                      const rank =
                        index + 1;

                      const totalVEs =
                        Number(
                          player.totalVEs ??
                          player.ves ??
                          0
                        );

                      return (

                        <div
                          className={
                            styles.modalPlayer
                          }
                          key={
                            player.id ||
                            player.email ||
                            index
                          }
                        >

                          {/* RANK */}

                          <strong>

                            {rank === 1
                              ? "🥇"
                              : rank === 2
                              ? "🥈"
                              : rank === 3
                              ? "🥉"
                              : `#${rank}`}

                          </strong>


                          {/* USER */}

                          <span>

                            {player.name ||
                              player.username ||
                              "User"}

                          </span>


                          {/* VE */}

                          <b>

                            {totalVEs.toLocaleString()}
                            {" "}VE

                          </b>

                        </div>

                      );

                    }
                  )}

                </div>

            )}

          </div>

        </div>

      )}

    </section>
  );
}

export default LeaderboardBanner;