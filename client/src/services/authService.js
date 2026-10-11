const API_URL = "http://localhost:5000/api/auth";

// =====================================================
// DEFAULT VALUES
// =====================================================

const WELCOME_GEMS = 12450;
const WELCOME_VES = 1280;

// =====================================================
// READ RESPONSE
// =====================================================

async function readResponse(response) {

  const text = await response.text();

  let data;

  try {

    data = JSON.parse(text);

  } catch (error) {

    console.error(
      "Invalid backend response:",
      text
    );

    throw new Error(
      "Backend returned an invalid response."
    );
  }

  return data;
}

// =====================================================
// SAVE LOGIN DATA
// =====================================================

function saveAuthData(data) {

  if (!data || !data.token) {

    console.error(
      "No token received from backend:",
      data
    );

    throw new Error(
      "Login successful but authentication token was not received."
    );
  }

  const user = {

    ...data.user,

    gems:
      Number(data.user?.gems ?? WELCOME_GEMS),

    ves:
      Number(data.user?.ves ?? WELCOME_VES),
  };

  // -----------------------------------------------
  // SAVE TOKEN
  // -----------------------------------------------

  localStorage.setItem(
    "veloopToken",
    data.token
  );

  // -----------------------------------------------
  // SAVE USER
  // -----------------------------------------------

  localStorage.setItem(
    "veloopUser",
    JSON.stringify(user)
  );

  console.log("=================================");
  console.log("AUTH DATA SAVED");
  console.log(
    "Token exists:",
    Boolean(localStorage.getItem("veloopToken"))
  );
  console.log(
    "User:",
    user
  );
  console.log("=================================");

  return user;
}

// =====================================================
// REGISTER
// =====================================================

export async function registerUser(
  name,
  email,
  password
) {

  const response = await fetch(
    `${API_URL}/register`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }
  );

  const data =
    await readResponse(response);

  if (!response.ok) {

    throw new Error(
      data.message ||
      "Registration failed"
    );
  }

  const user = saveAuthData(data);

  return {
    ...data,
    user,
  };
}

// =====================================================
// LOGIN
// =====================================================

export async function loginUser(
  email,
  password
) {

  try {

    console.log(
      "Attempting login:",
      email
    );

    const response = await fetch(
      `${API_URL}/login`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data =
      await readResponse(response);

    console.log(
      "Login response:",
      data
    );

    if (!response.ok) {

      throw new Error(
        data.message ||
        "Login failed"
      );
    }

    const user =
      saveAuthData(data);

    return {
      ...data,
      user,
    };

  } catch (error) {

    console.error(
      "Login error:",
      error
    );

    throw error;
  }
}

// =====================================================
// LOGOUT
// =====================================================

export function logoutUser() {

  localStorage.removeItem(
    "veloopToken"
  );

  localStorage.removeItem(
    "veloopUser"
  );

  console.log(
    "User logged out"
  );
}

// =====================================================
// GET TOKEN
// =====================================================

export function getToken() {

  return localStorage.getItem(
    "veloopToken"
  );
}

// =====================================================
// CHECK LOGIN
// =====================================================

export function isLoggedIn() {

  return Boolean(
    getToken()
  );
}

// =====================================================
// GET CURRENT USER
// =====================================================

export function getCurrentUser() {

  const storedUser =
    localStorage.getItem(
      "veloopUser"
    );

  if (!storedUser) {
    return null;
  }

  try {

    return JSON.parse(
      storedUser
    );

  } catch (error) {

    console.error(
      "Error reading user:",
      error
    );

    return null;
  }
}

// =====================================================
// UPDATE CURRENT USER
// =====================================================

export function updateCurrentUser(
  updatedUser
) {

  if (!updatedUser) {
    return;
  }

  localStorage.setItem(
    "veloopUser",
    JSON.stringify(updatedUser)
  );
}