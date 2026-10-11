import React, { useState } from "react";

import "./TechnicalQuiz.css";

const API_URL = "http://localhost:5000/api/auth";

const questions = [
  {
    question:
      "Which language is mainly used for Android development?",
    options: [
      "Python",
      "Java",
      "PHP",
      "SQL",
    ],
    answer: "B",
  },

  {
    question:
      "Which data structure follows FIFO?",
    options: [
      "Queue",
      "Stack",
      "Tree",
      "Graph",
    ],
    answer: "A",
  },

  {
    question:
      "Which keyword is used to inherit a class in Java?",
    options: [
      "implements",
      "extends",
      "inherits",
      "super",
    ],
    answer: "B",
  },

  {
    question:
      "Which database is a NoSQL database?",
    options: [
      "MySQL",
      "MongoDB",
      "Oracle",
      "PostgreSQL",
    ],
    answer: "B",
  },

  {
    question:
      "What does API stand for?",
    options: [
      "Application Programming Internet",
      "Advanced Programming Interface",
      "Application Process Integration",
      "Application Programming Interface",
    ],
    answer: "D",
  },
];

export default function TechnicalQuiz() {
  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] = useState([]);

  const [selectedAnswer, setSelectedAnswer] =
    useState(null);

  const [submitted, setSubmitted] =
    useState(false);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // =====================================
  // SELECT ANSWER
  // =====================================

  const handleAnswer = (index) => {
    setSelectedAnswer(index);

    setAnswers((previousAnswers) => {
      const updatedAnswers = [...previousAnswers];

      updatedAnswers[currentQuestion] =
        String.fromCharCode(65 + index);

      return updatedAnswers;
    });
  };

  // =====================================
  // NEXT QUESTION
  // =====================================

  const handleNext = () => {
    if (selectedAnswer === null) {
      return;
    }

    if (
      currentQuestion <
      questions.length - 1
    ) {
      const nextQuestion =
        currentQuestion + 1;

      setCurrentQuestion(nextQuestion);

      setSelectedAnswer(
        answers[nextQuestion]
          ? answers[nextQuestion].charCodeAt(0) - 65
          : null
      );
    }
  };

  // =====================================
  // PREVIOUS QUESTION
  // =====================================

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const previousQuestion =
        currentQuestion - 1;

      setCurrentQuestion(previousQuestion);

      setSelectedAnswer(
        answers[previousQuestion]
          ? answers[previousQuestion].charCodeAt(0) - 65
          : null
      );
    }
  };

  // =====================================
  // SUBMIT QUIZ
  // =====================================

  const handleSubmit = async () => {
    if (selectedAnswer === null) {
      return;
    }

    // Make sure every question is answered
    if (answers.length < questions.length) {
      setError(
        "Please answer all questions before submitting."
      );

      return;
    }

    setLoading(true);
    setError("");

    try {
      const token =
        localStorage.getItem("veloopToken");

      if (!token) {
        throw new Error(
          "Please login again."
        );
      }

      console.log(
        "Submitting quiz answers:",
        answers
      );

      // =====================================
      // IMPORTANT
      // Correct quiz API URL
      // =====================================

      const response = await fetch(
        `${API_URL}/quiz/submit`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            answers,
          }),
        }
      );

      // Read response safely
      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "Server returned an invalid response."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Quiz submission failed"
        );
      }

      // =====================================
      // SAVE UPDATED USER
      // =====================================

      if (data.user) {
        localStorage.setItem(
          "veloopUser",
          JSON.stringify(data.user)
        );
      }

      setResult(data);

      setSubmitted(true);

    } catch (error) {
      console.error(
        "Quiz submission error:",
        error
      );

      setError(
        error.message ||
        "Unable to submit quiz."
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // RESTART QUIZ
  // =====================================

  const restartQuiz = () => {
    setCurrentQuestion(0);

    setAnswers([]);

    setSelectedAnswer(null);

    setSubmitted(false);

    setResult(null);

    setError("");
  };

  // =====================================
  // RESULT PAGE
  // =====================================

  if (submitted && result) {
    return (
      <div className="quiz-page">

        <div className="quiz-card result-card">

          <div className="result-icon">
            🎉
          </div>

          <h1>
            Quiz Completed!
          </h1>

          <p>
            Great job! Here is your result.
          </p>

          <div className="score-box">
            <span>
              Your Score
            </span>

            <strong>
              {result.score}
              {" / "}
              {result.totalQuestions}
            </strong>
          </div>

          <div className="reward-box">
            <span>
              Gems Earned
            </span>

            <strong>
              +{result.reward} 💎
            </strong>
          </div>

          <p className="result-message">
            {result.message}
          </p>

          <button
            className="quiz-button"
            onClick={restartQuiz}
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }

  const question =
    questions[currentQuestion];

  return (
    <div className="quiz-page">

      <div className="quiz-card">

        {/* ================= HEADER ================= */}

        <div className="quiz-header">

          <span className="quiz-label">
            VELOOP REWARDS
          </span>

          <h1>
            Technical Quiz
          </h1>

          <p>
            Answer correctly and earn Gems!
          </p>

        </div>

        {/* ================= PROGRESS ================= */}

        <div className="quiz-progress">

          <div>
            Question{" "}
            {currentQuestion + 1}
            {" / "}
            {questions.length}
          </div>

          <div className="progress-bar">

            <div
              style={{
                width:
                  `${((currentQuestion + 1) /
                    questions.length) *
                    100}%`,
              }}
            />

          </div>

        </div>

        {/* ================= QUESTION ================= */}

        <div className="question-box">

          <h2>
            {question.question}
          </h2>

          <div className="options">

            {question.options.map(
              (option, index) => (

                <button
                  key={index}
                  type="button"
                  className={
                    selectedAnswer === index
                      ? "option selected"
                      : "option"
                  }
                  onClick={() =>
                    handleAnswer(index)
                  }
                >

                  <span className="option-letter">
                    {String.fromCharCode(
                      65 + index
                    )}
                  </span>

                  <span>
                    {option}
                  </span>

                </button>

              )
            )}

          </div>

        </div>

        {/* ================= ERROR ================= */}

        {error && (
          <div className="quiz-error">
            {error}
          </div>
        )}

        {/* ================= ACTIONS ================= */}

        <div className="quiz-actions">

          <button
            type="button"
            className="secondary-button"
            onClick={handlePrevious}
            disabled={
              currentQuestion === 0
            }
          >
            ← Previous
          </button>

          {currentQuestion <
          questions.length - 1 ? (

            <button
              type="button"
              className="quiz-button"
              onClick={handleNext}
              disabled={
                selectedAnswer === null
              }
            >
              Next →
            </button>

          ) : (

            <button
              type="button"
              className="quiz-button"
              onClick={handleSubmit}
              disabled={
                selectedAnswer === null ||
                loading
              }
            >
              {loading
                ? "Submitting..."
                : "Submit Quiz"}
            </button>

          )}

        </div>

        {/* ================= REWARD ================= */}

        <div className="reward-info">

          💎 Each correct answer =
          <strong> 10 Gems</strong>

        </div>

      </div>

    </div>
  );
}