import React, {
  useEffect,
  useState
} from "react";

import {
  getTransactions
} from "../services/transactionService";

import "./TransactionHistory.css";


export default function TransactionHistory() {

  const [
    transactions,
    setTransactions
  ] = useState([]);


  // ========================================
  // LOAD CURRENT USER HISTORY
  // ========================================

  useEffect(() => {

    const loadTransactions = () => {

      const data =
        getTransactions();

      setTransactions(data);

    };

    loadTransactions();

  }, []);


  return (

    <div className="transaction-page">

      {/* HEADER */}

      <div className="transaction-header">

        <span>
          TRANSACTION HISTORY
        </span>

        <h1>
          Recent <em>Activity.</em>
        </h1>

        <p>
          View your completed Gem to VE
          conversions and reward activity.
        </p>

      </div>


      {/* CARD */}

      <div className="transaction-card">

        {transactions.length === 0 ? (

          <div className="transaction-empty">

            <div className="empty-icon">
              ◇
            </div>

            <h2>
              No transactions yet
            </h2>

            <p>
              Your completed Gem to VE
              conversions will appear here.
            </p>

          </div>

        ) : (

          <div className="transaction-list">

            {transactions.map(
              (transaction) => (

                <div
                  className="transaction-row"
                  key={transaction.id}
                >

                  <div className="transaction-icon">
                    ⇄
                  </div>


                  <div className="transaction-info">

                    <strong>
                      {transaction.title ||
                        "Gem to VE Conversion"}
                    </strong>

                    <small>
                      {transaction.date}
                    </small>

                  </div>


                  <div className="transaction-values">

                    <strong>
                      -
                      {Number(
                        transaction.gems
                      ).toLocaleString()}
                      {" "}Gems
                    </strong>

                    <span>
                      +
                      {Number(
                        transaction.ves
                      ).toLocaleString()}
                      {" "}VEs
                    </span>

                  </div>


                  <div className="transaction-status">
                    ✓ Completed
                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>

  );
}