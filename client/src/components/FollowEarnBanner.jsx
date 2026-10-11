import React from "react";

import {
  Gift,
  ShieldCheck,
  Star,
  UserPlus,
  ArrowRight,
} from "lucide-react";

import styles from "./FollowEarnBanner.module.css";

function FollowEarnBanner() {
  const socialLinks = {
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
    facebook: "https://www.facebook.com/",
    twitter: "https://x.com/",
    linkedin: "https://www.linkedin.com/company/veloop-opportunities/",
    telegram: "https://telegram.org/",
  };

  // Open social media
  const openSocial = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className={styles.banner}>

      {/* =========================================
          BACKGROUND GLOW
      ========================================= */}

      <div className={styles.goldGlow}></div>
      <div className={styles.purpleGlow}></div>


      {/* =========================================
          LEFT CONTENT
      ========================================= */}

      <div className={styles.left}>

        {/* BADGE */}

        <div className={styles.badge}>

          <div className={styles.badgeIcon}>
            <Gift size={18} />
          </div>

          <span>
            FOLLOW. ENGAGE. EARN.
          </span>

        </div>


        {/* HEADING */}

        <h1 className={styles.heading}>
          Follow & <span>Earn</span>
        </h1>


        {/* DESCRIPTION */}

        <p className={styles.description}>
          Follow us on social media and stay updated
          <br />
          with the latest news, offers and exclusive
          <br />
          rewards. Every follow earns you more!
        </p>


        {/* =========================================
            FEATURES
        ========================================= */}

        <div className={styles.features}>

          {/* EASY REWARDS */}

          <div className={styles.feature}>

            <div className={styles.featureIcon}>
              <Gift size={22} />
            </div>

            <div>

              <h3>
                Easy Rewards
              </h3>

              <p>
                Simple actions,
                <br />
                exciting rewards
              </p>

            </div>

          </div>


          {/* TRUSTED & SECURE */}

          <div className={styles.feature}>

            <div className={styles.featureIcon}>
              <ShieldCheck size={22} />
            </div>

            <div>

              <h3>
                Trusted & Secure
              </h3>

              <p>
                Your rewards,
                <br />
                always safe
              </p>

            </div>

          </div>


          {/* EXCLUSIVE PERKS */}

          <div className={styles.feature}>

            <div className={styles.featureIcon}>
              <Star size={22} />
            </div>

            <div>

              <h3>
                Exclusive Perks
              </h3>

              <p>
                Unlock offers made
                <br />
                just for you
              </p>

            </div>

          </div>

        </div>


        {/* =========================================
            FOLLOW BUTTON
        ========================================= */}

        <button
          className={styles.followButton}
          onClick={() => openSocial(socialLinks.instagram)}
        >

          <UserPlus size={22} />

          <span>
            Follow Us
          </span>

          <ArrowRight size={22} />

        </button>

      </div>


      {/* =========================================
          RIGHT SIDE
          IMAGE + SOCIAL BUTTONS
      ========================================= */}

      <div className={styles.visual}>

        {/* MAIN IMAGE */}

        <img
          src="/follow.png"
          alt="Follow and Earn"
          className={styles.followImage}
        />


        {/* INSTAGRAM */}

        <button
          className={`${styles.socialButton} ${styles.instagram}`}
          onClick={() => openSocial(socialLinks.instagram)}
          aria-label="Instagram"
        >
          📸
        </button>


        {/* FACEBOOK */}

        <button
          className={`${styles.socialButton} ${styles.facebook}`}
          onClick={() => openSocial(socialLinks.facebook)}
          aria-label="Facebook"
        >
          f
        </button>


        {/* YOUTUBE */}

        <button
          className={`${styles.socialButton} ${styles.youtube}`}
          onClick={() => openSocial(socialLinks.youtube)}
          aria-label="YouTube"
        >
          ▶
        </button>


        {/* X */}

        <button
          className={`${styles.socialButton} ${styles.x}`}
          onClick={() => openSocial(socialLinks.twitter)}
          aria-label="X"
        >
          𝕏
        </button>


        {/* LINKEDIN */}

        <button
          className={`${styles.socialButton} ${styles.linkedin}`}
          onClick={() => openSocial(socialLinks.linkedin)}
          aria-label="LinkedIn"
        >
          in
        </button>


        {/* TELEGRAM */}

        <button
          className={`${styles.socialButton} ${styles.telegram}`}
          onClick={() => openSocial(socialLinks.telegram)}
          aria-label="Telegram"
        >
          ➤
        </button>

      </div>

    </section>
  );
}

export default FollowEarnBanner;