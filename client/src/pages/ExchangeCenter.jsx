import React, { useEffect, useState } from "react";

import { getCurrentUser } from "../services/authService";

import {
  getTransactions,
  addTransaction,
} from "../services/transactionService";

import BalanceCards from "../components/Exchange/BalanceCards";
import ExchangeCard from "../components/Exchange/ExchangeCard";
import ExchangeModal from "../components/Exchange/ExchangeModal";
import ExchangeLoader from "../components/Exchange/ExchangeLoader";
import ConversionSuccess from "../components/Exchange/ConversionSuccess";
import ExchangeHistory from "../components/Exchange/ExchangeHistory";
import ExchangeRules from "../components/Exchange/ExchangeRules";
import HowExchangeWorks from "../components/Exchange/HowExchangeWorks";

import "./ExchangeCenter.css";


// ========================================
// API
// ========================================

const API_URL = "http://localhost:5000/api/auth";


// ========================================
// AVAILABLE CONVERSIONS
// ========================================

const conversions = [

  {
    id: 1,

    title: "Starter Conversion",

    description:
      "A simple way to turn your earned Gems into VEs.",

    requiredGems: 1000,

    receiveVEs: 100,
  },

  {
    id: 2,

    title: "Reward Boost",

    description:
      "Convert more Gems and receive a larger VE reward.",

    requiredGems: 2500,

    receiveVEs: 300,
  },

  {
    id: 3,

    title: "Premium Conversion",

    description:
      "Use a larger Gem balance for a premium VE reward.",

    requiredGems: 5000,

    receiveVEs: 700,
  },

];


// ========================================
// EXCHANGE CENTER
// ========================================

function ExchangeCenter() {

  const [user, setUser] =
    useState(getCurrentUser());


  // ======================================
  // BALANCE
  // ======================================

  const [balance, setBalance] = useState({

    gems: user?.gems ?? 0,

    ves: user?.ves ?? 0,

  });


  // ======================================
  // SELECTED CONVERSION
  // ======================================

  const [
    selectedConversion,
    setSelectedConversion
  ] = useState(null);


  // ======================================
  // MODAL
  // ======================================

  const [
    isModalOpen,
    setIsModalOpen
  ] = useState(false);


  // ======================================
  // LOADING
  // ======================================

  const [
    isConverting,
    setIsConverting
  ] = useState(false);


  // ======================================
  // SUCCESS
  // ======================================

  const [
    successfulConversion,
    setSuccessfulConversion
  ] = useState(null);


  // ======================================
  // HISTORY
  // ======================================

  const [history, setHistory] =
    useState([]);


  // ======================================
  // ERROR
  // ======================================

  const [hasError, setHasError] =
    useState(false);


  // ======================================
  // LOAD TRANSACTIONS
  // ======================================

  useEffect(() => {

    const savedTransactions =
      getTransactions();

    setHistory(savedTransactions);

  }, []);


  // ======================================
  // SELECT CONVERSION
  // ======================================

  const handleSelectConversion =
    (conversion) => {

      if (isConverting) {
        return;
      }


      if (
        balance.gems <
        conversion.requiredGems
      ) {

        alert(
          "You don't have enough Gems for this conversion."
        );

        return;

      }


      setSelectedConversion(
        conversion
      );

      setIsModalOpen(true);

    };


  // ======================================
  // CLOSE MODAL
  // ======================================

  const handleCloseModal = () => {

    if (isConverting) {
      return;
    }

    setIsModalOpen(false);

    setSelectedConversion(null);

  };


  // ======================================
  // CONFIRM CONVERSION
  // ======================================

  const handleConfirmConversion =
    async () => {

      if (!selectedConversion) {
        return;
      }


      const requiredGems =
        selectedConversion.requiredGems;

      const receiveVEs =
        selectedConversion.receiveVEs;


      // ==================================
      // CHECK BALANCE
      // ==================================

      if (
        balance.gems <
        requiredGems
      ) {

        setIsModalOpen(false);

        setSelectedConversion(null);

        alert(
          "Insufficient Gems."
        );

        return;

      }


      // ==================================
      // CLOSE MODAL
      // ==================================

      setIsModalOpen(false);


      // ==================================
      // START LOADING
      // ==================================

      setIsConverting(true);


      try {

        // ==================================
        // GET JWT
        // ==================================

        const token =
          localStorage.getItem(
            "veloopToken"
          );


        if (!token) {

          throw new Error(
            "Please login again."
          );

        }


        // ==================================
        // SEND CONVERSION TO BACKEND
        // ==================================

        const response =
          await fetch(
            `${API_URL}/convert`,
            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,

              },

              body: JSON.stringify({

                requiredGems,

                receiveVEs,

              }),

            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.message ||
            "Conversion failed"
          );

        }


        // ==================================
        // UPDATED USER FROM MONGODB
        // ==================================

        const updatedUser =
          data.user;


        setUser(updatedUser);


        // ==================================
        // UPDATE BALANCE
        // ==================================

        const newBalance = {

          gems:
            updatedUser.gems,

          ves:
            updatedUser.ves,

        };


        setBalance(
          newBalance
        );


        // ==================================
        // UPDATE LOCAL USER
        // ==================================

        localStorage.setItem(

          "veloopUser",

          JSON.stringify(
            updatedUser
          )

        );


        // ==================================
        // SAVE TRANSACTION
        // ==================================

        const savedTransaction =
          addTransaction({

            title:
              selectedConversion.title,

            gems:
              requiredGems,

            ves:
              receiveVEs,

          });


        // ==================================
        // UPDATE HISTORY
        // ==================================

        if (savedTransaction) {

          setHistory(
            previousHistory => [

              savedTransaction,

              ...previousHistory,

            ]
          );

        }


        // ==================================
        // SUCCESS
        // ==================================

        setSuccessfulConversion({

          ...selectedConversion,

          gemsAfter:
            newBalance.gems,

          vesAfter:
            newBalance.ves,

        });


        setSelectedConversion(
          null
        );


      } catch (error) {

        console.error(
          "Conversion error:",
          error
        );

        alert(
          error.message ||
          "Conversion failed. Please try again."
        );

        setHasError(true);

      } finally {

        setIsConverting(false);

      }

    };


  // ======================================
  // CLOSE SUCCESS
  // ======================================

  const handleCloseSuccess = () => {

    setSuccessfulConversion(
      null
    );

  };


  // ======================================
  // RETRY
  // ======================================

  const handleRetry = () => {

    setHasError(false);

  };


  // ======================================
  // RENDER
  // ======================================

  return (

    <main className="exchange-center">

      <div className="exchange-container">


        {/* =================================
            PAGE HEADER
        ================================= */}

        <section className="exchange-header">

          <h1>
            Exchange <em>Center</em>
          </h1>

          <p>
            Turn your earned Gems into VEs and
            continue your reward journey.
          </p>

        </section>


        {/* =================================
            BALANCE CARDS
        ================================= */}

        <BalanceCards
          balance={balance}
        />


        {/* =================================
            AVAILABLE CONVERSIONS
        ================================= */}

        <section className="conversions-section">

          <div className="conversions-heading">

            <div>

              <span className="section-eyebrow">
                REWARD EXCHANGE
              </span>

              <h2>
                Available Conversions
              </h2>

              <p>
                Choose an available reward conversion
                and review it before confirming.
              </p>

            </div>


            <div className="conversion-count">
              {conversions.length} Active
            </div>

          </div>


          {/* ERROR */}

          {hasError ? (

            <div className="exchange-error">

              <h3>
                Unable to complete conversion
              </h3>

              <p>
                Please try again.
              </p>

              <button
                type="button"
                onClick={handleRetry}
              >
                Retry
              </button>

            </div>

          ) : conversions.length === 0 ? (

            <div className="exchange-empty">

              <h3>
                No conversions available right now
              </h3>

              <p>
                New reward conversion opportunities
                will appear here when available.
              </p>

            </div>

          ) : (

            <div className="conversion-grid">

              {conversions.map(
                (conversion) => (

                  <ExchangeCard
                    key={conversion.id}
                    conversion={conversion}
                    availableGems={balance.gems}
                    onConvert={
                      handleSelectConversion
                    }
                  />

                )
              )}

            </div>

          )}

        </section>


        {/* =================================
            EXCHANGE HISTORY
        ================================= */}

        <ExchangeHistory
          history={history}
        />


        {/* =================================
            HOW EXCHANGE WORKS
        ================================= */}

        <HowExchangeWorks />


        {/* =================================
            RULES
        ================================= */}

        <ExchangeRules />


      </div>


      {/* ===================================
          CONFIRMATION MODAL
      =================================== */}

      {isModalOpen &&
        selectedConversion && (

          <ExchangeModal
            conversion={
              selectedConversion
            }

            balance={balance}

            onCancel={
              handleCloseModal
            }

            onConfirm={
              handleConfirmConversion
            }

          />

        )}


      {/* ===================================
          LOADER
      =================================== */}

      {isConverting && (
        <ExchangeLoader />
      )}


      {/* ===================================
          SUCCESS POPUP
      =================================== */}

      {successfulConversion && (

        <ConversionSuccess
          conversion={
            successfulConversion
          }

          onClose={
            handleCloseSuccess
          }

        />

      )}

    </main>

  );

}


export default ExchangeCenter;