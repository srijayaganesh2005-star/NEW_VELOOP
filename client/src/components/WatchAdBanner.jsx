import React, { useRef, useState } from "react";

import {
  Play,
  ArrowRight,
  ShieldCheck,
  Coins,
} from "lucide-react";
import newImage from "../ad.png";

import styles from "./WatchAdBanner.module.css";


function WatchAdBanner() {

  const videoRef = useRef(null);

  const [watching, setWatching] = useState(false);
  const [earned, setEarned] = useState(false);
  const [loading, setLoading] = useState(false);


  // =========================================
  // START VIDEO
  // =========================================

  const handleWatchAd = () => {

    if (watching || earned) {
      return;
    }

    setWatching(true);

    if (videoRef.current) {

      videoRef.current.currentTime = 0;

      videoRef.current.play();

    }

  };


  // =========================================
  // VIDEO FINISHED
  // =========================================

  const handleVideoEnded = async () => {

    setLoading(true);

    try {

      const token =
        localStorage.getItem("veloopToken");


      const response = await fetch(
        "http://localhost:5000/api/auth/watch-ad",
        {
          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,

          },
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Failed to claim reward"
        );

      }


      // =====================================
      // SUCCESS
      // =====================================

      setWatching(false);

      setEarned(true);


      // Save updated user
      const currentUser =
        JSON.parse(
          localStorage.getItem(
            "veloopUser"
          ) || "null"
        );


      if (currentUser && data.user) {

        const updatedUser = {

          ...currentUser,

          gems: data.user.gems,

          ves: data.user.ves,

        };


        localStorage.setItem(
          "veloopUser",
          JSON.stringify(updatedUser)
        );

      }


      alert(
        "Congratulations! You earned +10 Gems."
      );


    } catch (error) {

      console.error(
        "Watch ad error:",
        error
      );

      setWatching(false);

      alert(error.message);

    } finally {

      setLoading(false);

    }

  };


  return (

    <section className={styles.banner}>

      {/* VIDEO */}

      <video
        ref={videoRef}
        src="/linkedin-video.mp4"
        className={styles.adVideo}
        onEnded={handleVideoEnded}
        controls={watching}
        style={{
          display: watching
            ? "block"
            : "none",
          width: "100%",
          maxWidth: "500px",
          borderRadius: "16px",
        }}
      />


      {/* LEFT CONTENT */}

      <div className={styles.left}>

        <div className={styles.badge}>

          <div className={styles.badgeIcon}>
            VE
          </div>

          <span>
            REWARDS YOU CAN USE
          </span>

        </div>


        <h2 className={styles.heading}>

          Watch Ads.

          <span>
            {" "}Earn Gems.
          </span>

        </h2>


        <p className={styles.description}>

          Watch the complete ad and earn

          <br />

          10 Gems.

        </p>


        <button
          className={`${styles.watchButton}
            ${watching ? styles.watching : ""}
            ${earned ? styles.earned : ""}
          `}
          onClick={handleWatchAd}
          disabled={
            watching ||
            earned ||
            loading
          }
        >

          {watching ? (

            <>
              <Play size={20} />
              <span>
                Watching Ad...
              </span>
            </>

          ) : earned ? (

            <>
              <Coins size={20} />
              <span>
                +10 Gems Earned
              </span>
            </>

          ) : (

            <>
              <Play size={20} />

              <span>
                Watch & Earn
              </span>

              <ArrowRight size={20} />

            </>

          )}

        </button>

      </div>


      {/* IMAGE */}

      <div className={styles.visual}>

        {!watching && (

          
          <img
  src={newImage}
  alt="Watch Ads and Earn"
  className={styles.watchImage}
/>

        )}

      </div>


      {/* FEATURES */}

      <div className={styles.features}>

        <div className={styles.feature}>

          <div className={styles.featureIcon}>
            <Play size={22} />
          </div>

          <div className={styles.featureContent}>

            <h3>
              Simple
            </h3>

            <p>
              Watch the complete video.
            </p>

          </div>

        </div>


        <div className={styles.feature}>

          <div className={styles.featureIcon}>
            <Coins size={22} />
          </div>

          <div className={styles.featureContent}>

            <h3>
              Rewarding
            </h3>

            <p>
              Earn 10 Gems.
            </p>

          </div>

        </div>


        <div className={styles.feature}>

          <div className={styles.featureIcon}>
            <ShieldCheck size={22} />
          </div>

          <div className={styles.featureContent}>

            <h3>
              Secure
            </h3>

            <p>
              Rewards are stored safely.
            </p>

          </div>

        </div>

      </div>

    </section>

  );
}

export default WatchAdBanner;