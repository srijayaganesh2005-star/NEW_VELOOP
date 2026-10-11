// ========================================
// leaderboardService.js
// ========================================

const API_URL =
  "http://localhost:5000/api/leaderboard";


// ========================================
// GET LEADERBOARD
// ========================================

export async function getLeaderboard() {
  try {

    const token =
      localStorage.getItem("veloopToken");

    const response = await fetch(
      API_URL,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",

          ...(token
            ? {
                Authorization:
                  `Bearer ${token}`,
              }
            : {}),
        },
      }
    );


    const data =
      await response.json();


    if (!response.ok) {
      throw new Error(
        data.message ||
        "Failed to load leaderboard"
      );
    }


    if (
      data &&
      Array.isArray(data.leaderboard)
    ) {
      return data.leaderboard;
    }


    return [];

  } catch (error) {

    console.error(
      "Leaderboard service error:",
      error
    );

    throw error;
  }
}