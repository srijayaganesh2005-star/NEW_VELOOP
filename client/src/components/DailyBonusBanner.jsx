import React, { useState } from "react";

import {
  Gift,
  Flame,
  Lock,
  Check,
  Sparkles,
} from "lucide-react";

import styles from "./DailyBonusBanner.module.css";

function DailyBonusBanner() {

  // =========================================
  // STARTING DAY
  // =========================================

  const [currentDay, setCurrentDay] = useState(4);


  // =========================================
  // CLAIM BONUS
  // =========================================

  const handleClaimBonus = () => {

    if (currentDay < 7) {
      setCurrentDay((previousDay) => previousDay + 1);
    }

  };


  return (
    <section className={styles.banner}>

      {/* =========================================
          BACKGROUND GLOW
      ========================================= */}

      <div className={styles.goldGlow}></div>

      <div className={styles.blueGlow}></div>


      {/* =========================================
          LEFT SIDE CONTENT
      ========================================= */}

      <div className={styles.left}>

        {/* =========================================
            BADGE
        ========================================= */}

        <div className={styles.badge}>

          <div className={styles.badgeIcon}>
            <Gift size={17} />
          </div>

          <span>
            DAILY REWARDS
          </span>

        </div>


        {/* =========================================
            HEADING
        ========================================= */}

        <h1 className={styles.heading}>

          Your Daily Bonus

          <br />

          <span>
            Is Waiting
          </span>

          <Sparkles
            size={25}
            className={styles.sparkle}
          />

        </h1>


        {/* =========================================
            DESCRIPTION
        ========================================= */}

        <p className={styles.description}>

          Log in every day to build your streak and earn

          <br />

          bigger rewards. Consistency pays.

        </p>


        {/* =========================================
            TODAY'S BONUS CARD
        ========================================= */}

        <div className={styles.bonusCard}>

          {/* DIAMOND IMAGE */}

          <div className={styles.diamondContainer}>

            <img
              src="/diamond.png"
              alt="Diamond reward"
              className={styles.diamondImage}
            />

          </div>


          {/* BONUS INFORMATION */}

          <div className={styles.bonusInfo}>

            <div className={styles.bonusTitle}>
              TODAY'S BONUS
            </div>


            <div className={styles.bonusAmount}>

              <span className={styles.plus}>
                +25
              </span>

              <span className={styles.gems}>
                Gems
              </span>

            </div>


            <div className={styles.available}>

              <span
                className={styles.availableDot}
              ></span>

              Available Now

            </div>

          </div>


          {/* CLAIM BUTTON */}

          <button
            type="button"
            className={styles.claimButton}
            onClick={handleClaimBonus}
            disabled={currentDay === 7}
          >

            <Gift size={20} />

            <span>
              {currentDay === 7
                ? "Claimed"
                : "Claim Bonus"
              }
            </span>

          </button>

        </div>

      </div>


      {/* =========================================
          RIGHT SIDE DAILY REWARD IMAGE
      ========================================= */}

      <div className={styles.visual}>

        <img
          src="/newgi.png"
          alt="Daily reward gift box"
          className={styles.dailyImage}
        />

      </div>


      {/* =========================================
          7-DAY STREAK
      ========================================= */}

      <div className={styles.streakCard}>

        {/* =========================================
            STREAK HEADER
        ========================================= */}

        <div className={styles.streakHeader}>

          <div className={styles.streakTitle}>

            <Flame size={18} />

            <span>
              7-DAY STREAK
            </span>

          </div>


          <span className={styles.keepText}>
            Keep your streak alive!
          </span>

        </div>


        {/* DIVIDER */}

        <div className={styles.divider}></div>


        {/* =========================================
            DAYS
        ========================================= */}

        <div className={styles.days}>

          {[1, 2, 3, 4, 5, 6, 7].map((day) => {

            const completed = day < currentDay;

            const active = day === currentDay;

            const isLastDay = day === 7;


            return (
              <React.Fragment key={day}>

                {/* DAY ITEM */}

                <div
                  className={`
                    ${styles.dayItem}
                    ${completed ? styles.completed : ""}
                    ${active ? styles.active : ""}
                    ${isLastDay ? styles.daySeven : ""}
                  `}
                >

                  {/* DAY CIRCLE */}

                  <div className={styles.dayCircle}>

                    {/* COMPLETED DAY */}

                    {completed && (
                      <Check
                        size={22}
                        strokeWidth={2.5}
                      />
                    )}


                    {/* CURRENT DAY */}

                    {active && (
                      <Gift
                        size={24}
                        className={styles.giftIcon}
                      />
                    )}


                    {/* LOCKED DAY */}

                    {!completed &&
                      !active &&
                      !isLastDay && (
                        <Lock size={18} />
                      )
                    }


                    {/* DAY 7 */}

                    {!completed &&
                      !active &&
                      isLastDay && (

                        <div className={styles.smallDiamond}>
                          ◆
                        </div>

                      )
                    }

                  </div>


                  {/* DAY LABEL */}

                  <span className={styles.dayLabel}>
                    DAY {day}
                  </span>

                </div>


                {/* CONNECTOR */}

                {day < 7 && (

                  <div
                    className={`
                      ${styles.connector}
                      ${
                        day < currentDay
                          ? styles.connectorCompleted
                          : ""
                      }
                    `}
                  ></div>

                )}

              </React.Fragment>
            );

          })}

        </div>

      </div>

    </section>
  );
}

export default DailyBonusBanner;