import React from "react";

import {
  Mail,
  Headphones,
  ShieldCheck,
  Clock3,
  Users,
  ArrowRight,
} from "lucide-react";

import styles from "./ContactBanner.module.css";

function ContactBanner() {
  const supportEmail = "velooprewardsofficial@gmail.com";

  return (
    <section className={styles.banner}>

      {/* =========================================
          BACKGROUND GLOW
      ========================================= */}

      <div className={styles.blueGlow}></div>
      <div className={styles.lightGlow}></div>


      {/* =========================================
          LEFT CONTENT
      ========================================= */}

      <div className={styles.left}>

        {/* BRAND */}

        <div className={styles.brand}>

          <div className={styles.brandLogo}>
            V
          </div>

          <span className={styles.brandBlue}>
            VELOOP
          </span>

          <span className={styles.brandText}>
            REWARDS
          </span>

        </div>


        {/* HEADING */}

        <h1 className={styles.heading}>

          Need Help?

          <br />

          <span>
            We're Here.
          </span>

        </h1>


        {/* DESCRIPTION */}

        <p className={styles.description}>

          Our support team is ready to assist you with

          <br />

          any questions or concerns. We typically

          <br />

          reply within <strong>24 hours.</strong>

        </p>


        {/* EMAIL */}

        <a
          href={`mailto:${supportEmail}`}
          className={styles.emailBox}
        >

          <div className={styles.emailIcon}>
            <Mail size={23} />
          </div>

          <span>
            {supportEmail}
          </span>

        </a>


        {/* CONTACT SUPPORT */}

        <a
          href={`mailto:${supportEmail}`}
          className={styles.contactButton}
        >

          <Headphones size={25} />

          <span>
            Contact Support
          </span>

          <ArrowRight size={23} />

        </a>


        {/* =========================================
            FEATURES
        ========================================= */}

        <div className={styles.features}>

          {/* SECURE */}

          <div className={styles.feature}>

            <ShieldCheck size={25} />

            <div>

              <strong>
                Secure &
              </strong>

              <span>
                Private
              </span>

            </div>

          </div>


          {/* FAST RESPONSE */}

          <div className={styles.feature}>

            <Clock3 size={25} />

            <div>

              <strong>
                Fast
              </strong>

              <span>
                Response
              </span>

            </div>

          </div>


          {/* EXPERT SUPPORT */}

          <div className={styles.feature}>

            <Users size={25} />

            <div>

              <strong>
                Expert
              </strong>

              <span>
                Support
              </span>

            </div>

          </div>

        </div>

      </div>


      {/* =========================================
          RIGHT SIDE IMAGE
      ========================================= */}

      <div className={styles.visual}>

        <img
          src="/help.png"
          alt="Customer Support"
          className={styles.supportImage}
        />

      </div>

    </section>
  );
}

export default ContactBanner;