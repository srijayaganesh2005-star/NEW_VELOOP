import React from "react";
import {
  Gem,
  ArrowDown,
  Coins,
  AlertCircle,
} from "lucide-react";

import styles from "./ExchangeCard.module.css";

function ExchangeCard({
  conversion,
  availableGems,
  onConvert,
}) {
  const canConvert =
    availableGems >= conversion.requiredGems;

  const gemsNeeded =
    conversion.requiredGems - availableGems;

  const handleButtonClick = () => {
    console.log("CONVERT BUTTON CLICKED");
    console.log("Conversion:", conversion);
    console.log("Available Gems:", availableGems);
    console.log("Can Convert:", canConvert);

    if (!canConvert) {
      alert(
        `You need ${gemsNeeded} more Gems to perform this conversion.`
      );
      return;
    }

    if (typeof onConvert === "function") {
      onConvert(conversion);
    } else {
      console.error(
        "onConvert function is missing!"
      );
    }
  };

  return (
    <div className={styles.card}>

      {/* ================================
          HEADER
      ================================= */}

      <div className={styles.header}>

        <div>
          <h3 className={styles.title}>
            {conversion.title}
          </h3>

          <p className={styles.description}>
            {conversion.description}
          </p>
        </div>

        <div
          className={`${styles.status} ${
            canConvert
              ? styles.available
              : styles.locked
          }`}
        >
          {canConvert
            ? "Available"
            : "Need More Gems"}
        </div>

      </div>

      {/* ================================
          CONVERSION AREA
      ================================= */}

      <div className={styles.conversionArea}>

        {/* GEMS */}

        <div className={styles.rewardBox}>

          <div
            className={`${styles.iconBox} ${styles.gemIcon}`}
          >
            <Gem size={32} />
          </div>

          <p className={styles.rewardLabel}>
            Required Gems
          </p>

          <h2 className={styles.rewardAmount}>
            {conversion.requiredGems.toLocaleString()}
          </h2>

          <span className={styles.unit}>
            GEMS
          </span>

        </div>

        {/* ARROW */}

        <div className={styles.arrow}>
          <ArrowDown size={34} />
        </div>

        {/* VES */}

        <div className={styles.rewardBox}>

          <div
            className={`${styles.iconBox} ${styles.veIcon}`}
          >
            <Coins size={32} />
          </div>

          <p className={styles.rewardLabel}>
            You Receive
          </p>

          <h2
            className={`${styles.rewardAmount} ${styles.veAmount}`}
          >
            {conversion.receiveVEs.toLocaleString()}
          </h2>

          <span className={styles.unit}>
            VEs
          </span>

        </div>

      </div>

      {/* ================================
          INSUFFICIENT BALANCE
      ================================= */}

      {!canConvert && (
        <div className={styles.insufficient}>

          <AlertCircle size={18} />

          <div>

            <strong>
              Insufficient Gems
            </strong>

            <p>
              Available:{" "}
              {availableGems.toLocaleString()} Gems
              {" | "}
              Required:{" "}
              {conversion.requiredGems.toLocaleString()} Gems
            </p>

            <p>
              You need{" "}
              {gemsNeeded.toLocaleString()} more Gems.
            </p>

          </div>

        </div>
      )}

      {/* ================================
          CONVERT BUTTON
      ================================= */}

      <button
        type="button"
        className={`${styles.convertButton} ${
          !canConvert
            ? styles.disabledButton
            : ""
        }`}
        onClick={handleButtonClick}
      >
        {canConvert
          ? `Convert ${conversion.requiredGems.toLocaleString()} Gems → ${conversion.receiveVEs.toLocaleString()} VEs`
          : `Earn ${gemsNeeded.toLocaleString()} More Gems`}
      </button>

    </div>
  );
}

export default ExchangeCard;