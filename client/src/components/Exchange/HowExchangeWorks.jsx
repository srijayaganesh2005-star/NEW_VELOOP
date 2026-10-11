import React from "react";
import { Gem, ArrowRight, Coins } from "lucide-react";

import styles from "./HowExchangeWorks.module.css";

function HowExchangeWorks() {
  return (
    <section className={styles.howExchangeWorks}>

      {/* HEADER */}

      <div className={styles.header}>
        <h2>How Exchange Works</h2>

        <p>
          Convert your earned Gems into valuable VE rewards.
        </p>
      </div>


      {/* STEPS */}

      <div className={styles.stepsContainer}>

        {/* STEP 1 */}

        <div className={styles.stepCard}>

          <div className={styles.stepNumber}>
            01
          </div>

          <Gem
            className={styles.gemIcon}
            size={34}
          />

          <h3>Choose Gems</h3>

          <p>
            Select an available conversion.
          </p>

        </div>


        {/* ARROW */}

        <div className={styles.arrow}>
          <ArrowRight size={32} />
        </div>


        {/* STEP 2 */}

        <div className={styles.stepCard}>

          <div className={styles.stepNumber}>
            02
          </div>

          <ArrowRight
            className={styles.stepIcon}
            size={32}
          />

          <h3>Confirm</h3>

          <p>
            Review and confirm your conversion.
          </p>

        </div>


        {/* ARROW */}

        <div className={styles.arrow}>
          <ArrowRight size={32} />
        </div>


        {/* STEP 3 */}

        <div className={styles.stepCard}>

          <div className={styles.stepNumber}>
            03
          </div>

          <Coins
            className={styles.coinIcon}
            size={34}
          />

          <h3>Receive VEs</h3>

          <p>
            Your VE balance updates successfully.
          </p>

        </div>

      </div>

    </section>
  );
}

export default HowExchangeWorks;