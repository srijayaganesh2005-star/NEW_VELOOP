import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import SpinWheel from "./components/SpinWheel";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import ExchangeCenter from "./pages/ExchangeCenter";
import TransactionHistory from "./pages/TransactionHistory";
import Leaderboard from "./pages/Leaderboard";

import TechnicalQuiz from "./pages/TechnicalQuiz";
<Route
  path="/spin-wheel"
  element={<SpinWheel />}
/>


function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <main>

        <Routes>

          {/* =========================
              PUBLIC
          ========================= */}

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />


          {/* =========================
              HOME
          ========================= */}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
  path="/admin/login"
  element={<AdminLogin />}
/>

<Route
  path="/admin/dashboard"
  element={<AdminDashboard />}
/>


          {/* =========================
              ABOUT
          ========================= */}

          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />


          {/* =========================
              DASHBOARD
          ========================= */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />


          {/* =========================
              EXCHANGE CENTER
          ========================= */}

          <Route
            path="/exchange-center"
            element={
              <ProtectedRoute>
                <ExchangeCenter />
              </ProtectedRoute>
            }
          />


          {/* =========================
              TRANSACTION HISTORY
          ========================= */}

          <Route
            path="/transaction-history"
            element={
              <ProtectedRoute>
                <TransactionHistory />
              </ProtectedRoute>
            }
          />


          {/* =========================
              LEADERBOARD
          ========================= */}

          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />


          {/* =========================
              TECHNICAL QUIZ
          ========================= */}

          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <TechnicalQuiz />
              </ProtectedRoute>
            }
          />

        </Routes>

      </main>

      <Footer />

    </BrowserRouter>
  );
}

export default App;