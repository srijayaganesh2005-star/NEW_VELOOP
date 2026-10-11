import React from "react";
import { ShieldCheck } from "lucide-react";

import styles from "./ExchangeRules.module.css";

function ExchangeRules() {
  return (
    <section className={styles.rules}>

      <div className={styles.icon}>
        <ShieldCheck size={32} />
      </div>

      <div>

        <span className={styles.eyebrow}>
          IMPORTANT INFORMATION
        </span>

        <h2>Exchange Rules</h2>

        <ul>

          <li>
            Only eligible Gems can be exchanged.
          </li>

          <li>
            Exchange values are predefined by VELOOP Rewards.
          </li>

          <li>
            Available conversion opportunities may vary.
          </li>

          <li>
            Balances update after a successful conversion.
          </li>

          <li>
            Please review your conversion before confirming.
          </li>

          <li>
            Successful conversions cannot be duplicated.
          </li>

        </ul>

      </div>

    </section>
  );
}

export default ExchangeRules;