import React from "react";
import "./SpinWheel.css";

export default function SpinWheel() {

  // ==========================================
  // AVAILABLE WHEEL REWARDS
  // ==========================================

  const rewards = [10, 25, 50, 75, 100, 150];


  // ==========================================
  // STATES
  // ==========================================

  const [rotation, setRotation] =
    React.useState(0);

  const [isSpinning, setIsSpinning] =
    React.useState(false);

  const [reward, setReward] =
    React.useState(null);

  const [error, setError] =
    React.useState("");

  const [currentUser, setCurrentUser] =
    React.useState(null);


  // ==========================================
  // LOAD CURRENT USER
  // ==========================================

  React.useEffect(() => {

    try {

      const storedUser =
        localStorage.getItem("veloopUser");

      if (storedUser) {

        const user =
          JSON.parse(storedUser);

        setCurrentUser(user);

      }

    } catch (error) {

      console.error(
        "Unable to load current user:",
        error
      );

    }

  }, []);


  // ==========================================
  // GET AUTH TOKEN
  // ==========================================

  const getToken = () => {

    return (
      localStorage.getItem("veloopToken") ||
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("accessToken")
    );

  };


  // ==========================================
  // SPIN WHEEL
  // ==========================================

  const handleSpin = async () => {

    if (isSpinning) {
      return;
    }


    // ========================================
    // CLEAR OLD DATA
    // ========================================

    setError("");
    setReward(null);


    // ========================================
    // GET TOKEN
    // ========================================

    const token =
      getToken();

    if (!token) {

      setError(
        "Please login before spinning the wheel."
      );

      return;

    }


    // ========================================
    // START SPINNING
    // ========================================

    setIsSpinning(true);


    try {

      // ======================================
      // CALL BACKEND
      // ======================================

      const response =
        await fetch(
          "http://localhost:5000/api/game/spin-wheel/reward",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },
          }
        );


      // ======================================
      // READ RESPONSE
      // ======================================

      const data =
        await response.json();


      console.log(
        "Spin API Response:",
        data
      );


      // ======================================
      // HANDLE BACKEND ERROR
      // ======================================

      if (!response.ok) {

        throw new Error(
          data.message ||
          "Unable to spin the wheel"
        );

      }


      // ======================================
      // GET SERVER REWARD
      // ======================================

      const selectedReward =
        Number(data.reward);


      // ======================================
      // CHECK VALID REWARD
      // ======================================

      if (!Number.isFinite(selectedReward)) {

        throw new Error(
          "Invalid reward received from server"
        );

      }


      // ======================================
      // FIND REWARD POSITION
      // ======================================

      const rewardIndex =
        rewards.indexOf(
          selectedReward
        );


      // ======================================
      // FALLBACK
      // ======================================

      const selectedIndex =
        rewardIndex >= 0
          ? rewardIndex
          : 0;


      // ======================================
      // SEGMENT ANGLE
      // ======================================

      const segmentAngle = 60;


      // ======================================
      // CALCULATE ROTATION
      // ======================================

      const extraRotation =
        360 * 5 +
        selectedIndex *
          segmentAngle;


      // ======================================
      // ROTATE WHEEL
      // ======================================

      setRotation(
        (previousRotation) =>
          previousRotation +
          extraRotation
      );


      // ======================================
      // UPDATE GEM BALANCE
      // ======================================
      //
      // IMPORTANT:
      //
      // authService.js stores the user as:
      //
      // "veloopUser"
      //
      // So we MUST update the same key.
      //
      // ======================================

      if (
        data.gems !== undefined &&
        data.gems !== null
      ) {

        try {

          const storedUser =
            localStorage.getItem(
              "veloopUser"
            );


          if (storedUser) {

            const user =
              JSON.parse(
                storedUser
              );


            // --------------------------------
            // UPDATE GEM BALANCE
            // --------------------------------

            user.gems =
              Number(data.gems);


            // --------------------------------
            // SAVE UPDATED USER
            // --------------------------------

            localStorage.setItem(
              "veloopUser",
              JSON.stringify(user)
            );


            // --------------------------------
            // UPDATE REACT STATE
            // --------------------------------

            setCurrentUser(
              user
            );


            console.log(
              "================================="
            );

            console.log(
              "GEM BALANCE UPDATED"
            );

            console.log(
              "New Gems:",
              user.gems
            );

            console.log(
              "================================="
            );

          }

        } catch (storageError) {

          console.error(
            "Unable to update local user:",
            storageError
          );

        }

      }


      // ======================================
      // WAIT FOR WHEEL ANIMATION
      // ======================================

      setTimeout(
        () => {

          setReward(
            selectedReward
          );

          setIsSpinning(
            false
          );

        },
        4000
      );


    } catch (error) {

      // ======================================
      // ERROR HANDLING
      // ======================================

      console.error(
        "Spin Wheel Error:",
        error
      );


      setError(
        error.message ||
        "Something went wrong"
      );


      setIsSpinning(
        false
      );

    }

  };


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="spin-page">

      <div className="spin-container">


        {/* ==================================
            LEFT SIDE - SPIN WHEEL
        ================================== */}

        <div className="spin-wheel-section">

          <div className="wheel-wrapper">

            <div className="wheel-pointer">
              ▼
            </div>


            <div
              className={`wheel ${
                isSpinning
                  ? "spinning"
                  : ""
              }`}
              style={{
                transform:
                  `rotate(${rotation}deg)`,
              }}
            >

              {rewards.map(
                (value, index) => (

                  <div
                    key={index}
                    className="wheel-segment"
                    style={{
                      transform:
                        `rotate(${index * 60}deg)`,
                    }}
                  >

                    <span
                      style={{
                        transform:
                          "rotate(30deg)",
                      }}
                    >
                      {value}
                    </span>

                  </div>

                )
              )}


              <div className="wheel-center">
                ✦
              </div>

            </div>

          </div>


          {/* ==================================
              SPIN BUTTON
          ================================== */}

          <button
            className="spin-button"
            onClick={handleSpin}
            disabled={isSpinning}
          >

            {isSpinning
              ? "SPINNING..."
              : "SPIN NOW"}

          </button>


          {/* ==================================
              DAILY TEXT
          ================================== */}

          <div className="daily-text">

            ✦ One spin available every day

          </div>

        </div>


        {/* ==================================
            RIGHT SIDE - CONTENT
        ================================== */}

        <div className="spin-content">


          {/* ==================================
              EYEBROW
          ================================== */}

          <div className="spin-eyebrow">

            DAILY REWARD

          </div>


          {/* ==================================
              TITLE
          ================================== */}

          <h1>

            Spin <span>&</span> Win.

          </h1>


          {/* ==================================
              INTRO
          ================================== */}

          <p className="spin-intro">

            Take your daily chance to win Gems
            and grow your VEloop Rewards balance.
            Spin the wheel and see what reward
            you receive.

          </p>


          {/* ==================================
              REWARD RESULT
          ================================== */}

          <div className="reward-result">

            <div className="reward-result-icon">

              ✦

            </div>


            <div className="reward-result-content">

              <span>

                {reward
                  ? "YOU WON"
                  : "TODAY'S REWARD"}

              </span>


              <strong>

                {reward
                  ? `${reward} Gems`
                  : "Spin to Win"}

              </strong>

            </div>

          </div>


          {/* ==================================
              ERROR MESSAGE
          ================================== */}

          {error && (

            <div
              className="spin-error"
            >

              {error}

            </div>

          )}


        


          {/* ==================================
              OPTIONAL CURRENT BALANCE
          ================================== */}

          {currentUser && (

            <div className="current-gem-balance">

              <span>
                Current Gems
              </span>

              <strong>
                ✦ {Number(
                  currentUser.gems || 0
                ).toLocaleString()}
              </strong>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}