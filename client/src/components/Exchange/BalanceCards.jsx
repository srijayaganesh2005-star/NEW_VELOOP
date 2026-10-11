import React from "react";
import { Gem, Coins } from "lucide-react";

import styles from "./BalanceCards.module.css";

function BalanceCards({ balance }) {
  return (
    <section className={styles.balanceGrid}>

      <div className={styles.balanceCard}>

        <div
          className={`${styles.iconBox} ${styles.gemBox}`}
        >
          <Gem size={28} />
        </div>

        <div>
          <p>Available Gems</p>

          <h2>
            {balance.gems.toLocaleString()}
          </h2>

          <span>GEMS</span>
        </div>

      </div>


      <div className={styles.balanceCard}>

        <div
          className={`${styles.iconBox} ${styles.veBox}`}
        >
          <Coins size={28} />
        </div>

        <div>
          <p>Your VE Balance</p>

          <h2>
            {balance.ves.toLocaleString()}
          </h2>

          <span>VES</span>
        </div>

      </div>

    </section>
  );
}

export default BalanceCards;