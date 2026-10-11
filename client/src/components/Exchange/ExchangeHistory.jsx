import React from "react";
import {
  History,
  Gem,
  Coins,
  CheckCircle2,
} from "lucide-react";

import styles from "./ExchangeHistory.module.css";

function ExchangeHistory({ history }) {
  return (
    <section className={styles.historySection}>

      {/* HEADER */}

      <div className={styles.heading}>

        <div className={styles.titleArea}>

          <History
            size={26}
            className={styles.icon}
          />

          <div>
            <h2 className={styles.title}>
              Conversion History
            </h2>

            <p className={styles.subtitle}>
              Track your completed reward conversions.
            </p>
          </div>

        </div>

      </div>


      {/* EMPTY STATE */}

      {history.length === 0 ? (

        <div className={styles.emptyState}>

          <History
            size={40}
            className={styles.emptyIcon}
          />

          <h3 className={styles.emptyTitle}>
            No conversions yet
          </h3>

          <p className={styles.emptyText}>
            Your completed reward conversions
            will appear here.
          </p>

        </div>

      ) : (

        /* HISTORY LIST */

        <div className={styles.historyList}>

          {history.map((item) => (

            <div
              className={styles.historyItem}
              key={item.id}
            >

              <div className={styles.historyInfo}>

                <div className={styles.historyConversion}>

                  <div className={styles.gemValue}>

                    <Gem size={20} />

                    <span>
                      {item.requiredGems} Gems
                    </span>

                  </div>


                  <span className={styles.arrow}>
                    →
                  </span>


                  <div className={styles.veValue}>

                    <Coins size={20} />

                    <span>
                      {item.receiveVEs} VEs
                    </span>

                  </div>

                </div>


                <p className={styles.historyDate}>
                  {item.date}
                </p>

              </div>


              <div className={styles.status}>

                <CheckCircle2 size={18} />

                <span>
                  {item.status}
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default ExchangeHistory;