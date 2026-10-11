// transactionService.js

import { getCurrentUser } from "./authService";

// ========================================
// GET CURRENT USER TRANSACTION KEY
// ========================================

function getUserTransactionKey() {
  const user = getCurrentUser();

  if (!user) {
    return "veloop_transactions_guest";
  }

  const userId =
    user.email ||
    user.id ||
    user.username ||
    user.name ||
    "user";

  return `veloop_transactions_${String(userId).toLowerCase()}`;
}

// ========================================
// GET CURRENT USER TRANSACTIONS
// ========================================

export function getTransactions() {
  try {
    const key = getUserTransactionKey();

    const stored = localStorage.getItem(key);

    if (!stored) {
      return [];
    }

    const transactions = JSON.parse(stored);

    if (!Array.isArray(transactions)) {
      return [];
    }

    return transactions;

  } catch (error) {
    console.error(
      "Error loading transactions:",
      error
    );

    return [];
  }
}

// ========================================
// ADD TRANSACTION
// ========================================

export function addTransaction(transaction) {
  try {
    if (!transaction) {
      console.error("Transaction data is missing");
      return null;
    }

    const key = getUserTransactionKey();

    const existingTransactions = getTransactions();

    const gems = Number(transaction.gems || 0);
    const ves = Number(transaction.ves || 0);

    const newTransaction = {
      id: Date.now(),

      title:
        transaction.title ||
        "Gem to VE Conversion",

      gems,

      ves,

      status: "Completed",

      date: new Date().toLocaleString(),

      timestamp: new Date().toISOString(),
    };

    const updatedTransactions = [
      newTransaction,
      ...existingTransactions,
    ];

    localStorage.setItem(
      key,
      JSON.stringify(updatedTransactions)
    );

    console.log(
      "TRANSACTION SAVED:",
      newTransaction
    );

    console.log(
      "TRANSACTION STORAGE KEY:",
      key
    );

    return newTransaction;

  } catch (error) {
    console.error(
      "Error saving transaction:",
      error
    );

    return null;
  }
}

// ========================================
// CLEAR CURRENT USER TRANSACTIONS
// ========================================

export function clearTransactions() {
  try {
    const key = getUserTransactionKey();

    localStorage.removeItem(key);

    console.log(
      "Transactions cleared for:",
      key
    );

    return true;

  } catch (error) {
    console.error(
      "Error clearing transactions:",
      error
    );

    return false;
  }
}