import React from "react";
import styles from "./ExchangeLoader.module.css";

function ExchangeLoader() {
  return (
    <div className={styles.overlay}>
      <div className={styles.loaderBox}>

        <div className={styles.spinner}></div>

        <h2>Converting Rewards...</h2>

        <p>
          Please wait while your conversion is processed.
        </p>

      </div>
    </div>
  );
}

export default ExchangeLoader;