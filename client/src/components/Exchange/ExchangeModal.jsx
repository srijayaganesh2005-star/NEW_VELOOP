import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Gem,
  Coins,
  ArrowRight,
} from "lucide-react";

import styles from "./ExchangeModal.module.css";

function ExchangeModal({
  conversion,
  balance,
  onCancel,
  onConfirm,
}) {
  const gemsAfter =
    balance.gems - conversion.requiredGems;

  const vesAfter =
    balance.ves + conversion.receiveVEs;

  // ========================================
  // PREVENT PAGE SCROLL WHILE MODAL IS OPEN
  // ========================================

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // ========================================
  // MODAL
  // ========================================

  return createPortal(
    <div className={styles.overlay}>

      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exchange-modal-title"
      >

        {/* ==================================
            CLOSE BUTTON
        ================================== */}

        <button
          type="button"
          className={styles.closeButton}
          onClick={onCancel}
          aria-label="Close conversion confirmation"
        >
          <X size={26} />
        </button>


        {/* ==================================
            TITLE
        ================================== */}

        <h2 id="exchange-modal-title">
          Confirm Conversion
        </h2>


        <p className={styles.subtitle}>
          Review your reward conversion before confirming.
        </p>


        {/* ==================================
            CONVERSION PREVIEW
        ================================== */}

        <div className={styles.conversionPreview}>

          {/* GEMS */}

          <div className={styles.previewBox}>

            <Gem
              size={42}
              color="#b69cff"
            />

            <span>
              You Send
            </span>

            <strong>
              {conversion.requiredGems.toLocaleString()} Gems
            </strong>

          </div>


          {/* ARROW */}

          <ArrowRight
            className={styles.arrow}
            size={32}
          />


          {/* VES */}

          <div className={styles.previewBox}>

            <Coins
              size={42}
              color="#ffd16d"
            />

            <span>
              You Receive
            </span>

            <strong>
              {conversion.receiveVEs.toLocaleString()} VEs
            </strong>

          </div>

        </div>


        {/* ==================================
            BALANCE PREVIEW
        ================================== */}

        <div className={styles.balancePreview}>

          <p>
            <span>
              Gems after conversion:
            </span>

            <strong>
              {gemsAfter.toLocaleString()}
            </strong>
          </p>


          <p>
            <span>
              VE balance after conversion:
            </span>

            <strong>
              {vesAfter.toLocaleString()}
            </strong>
          </p>

        </div>


        {/* ==================================
            ACTION BUTTONS
        ================================== */}

        <div className={styles.actions}>

          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Cancel
          </button>


          <button
            type="button"
            className={styles.confirmButton}
            onClick={onConfirm}
          >
            Confirm Conversion
          </button>

        </div>

      </div>

    </div>,

    document.body
  );
}

export default ExchangeModal;