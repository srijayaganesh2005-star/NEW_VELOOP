import React from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, Gem, Coins } from "lucide-react";

import styles from "./ConversionSuccess.module.css";

function ConversionSuccess({ conversion, onClose }) {
  if (!conversion) {
    return null;
  }

  return createPortal(
    <div className={styles.overlay}>
      <div
        className={styles.successBox}
        role="dialog"
        aria-modal="true"
      >
        <CheckCircle2
          size={70}
          className={styles.successIcon}
        />

        <h1>Conversion Complete!</h1>

        <p>
          Your reward conversion was successful.
        </p>

        <div className={styles.result}>

          <div>
            <Gem size={28} />

            <strong>
              {conversion.requiredGems.toLocaleString()} Gems
            </strong>
          </div>

          <span>→</span>

          <div>
            <Coins size={28} />

            <strong>
              {conversion.receiveVEs.toLocaleString()} VEs
            </strong>
          </div>

        </div>

        <div className={styles.updatedBalances}>

          <p>
            <span>Remaining Gems:</span>

            <strong>
              {conversion.gemsAfter.toLocaleString()}
            </strong>
          </p>

          <p>
            <span>VE Balance:</span>

            <strong>
              {conversion.vesAfter.toLocaleString()}
            </strong>
          </p>

        </div>

        <button
          type="button"
          onClick={onClose}
        >
          Continue
        </button>

      </div>
    </div>,

    document.body
  );
}

export default ConversionSuccess;