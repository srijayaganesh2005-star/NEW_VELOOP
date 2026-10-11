import { getCurrentUser } from "./authService";

const LEADERBOARD_KEY = "veloop_leaderboard";


// ========================================
// GET ALL LEADERBOARD USERS
// ========================================

export function getLeaderboard() {
  try {

    const stored =
      localStorage.getItem(LEADERBOARD_KEY);

    if (!stored) {
      return [];
    }

    const users = JSON.parse(stored);

    return Array.isArray(users)
      ? users
      : [];

  } catch (error) {

    console.error(
      "Error loading leaderboard:",
      error
    );

    return [];
  }
}


// ========================================
// UPDATE CURRENT USER LEADERBOARD
// ========================================

export function updateLeaderboard(vesEarned) {

  try {

    const user = getCurrentUser();

    if (!user) {
      return null;
    }


    const userId =
      user.email ||
      user.id ||
      user.username ||
      user.name;


    if (!userId) {
      return null;
    }


    const leaderboard =
      getLeaderboard();


    const existingUser =
      leaderboard.find(
        (item) =>
          item.userId === userId
      );


    if (existingUser) {

      // Add newly earned VEs

      existingUser.totalVEs =
        Number(existingUser.totalVEs || 0) +
        Number(vesEarned || 0);


      existingUser.conversions =
        Number(existingUser.conversions || 0) +
        1;

    } else {

      leaderboard.push({

        userId: userId,

        name:
          user.name ||
          user.username ||
          "User",

        email:
          user.email || "",

        totalVEs:
          Number(vesEarned || 0),

        conversions: 1,

      });

    }


    // ====================================
    // SORT HIGH → LOW
    // ====================================

    leaderboard.sort(
      (a, b) =>
        b.totalVEs - a.totalVEs
    );


    localStorage.setItem(
      LEADERBOARD_KEY,
      JSON.stringify(leaderboard)
    );


    return leaderboard;

  } catch (error) {

    console.error(
      "Error updating leaderboard:",
      error
    );

    return null;
  }
}