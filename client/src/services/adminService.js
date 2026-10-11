const API_URL =
  "http://localhost:5000";


// =====================================================
// ADMIN LOGIN
// =====================================================

export async function adminLogin(
  email,
  password
) {

  const response =
    await fetch(
      `${API_URL}/api/admin/login`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );


  const data =
    await response.json();


  if (!response.ok) {

    throw new Error(
      data.message ||
      "Admin login failed."
    );

  }


  // Save admin token

  localStorage.setItem(
    "veloop_admin_token",
    data.token
  );


  localStorage.setItem(
    "veloop_admin",
    JSON.stringify(
      data.admin
    )
  );


  return data;

}


// =====================================================
// GET ADMIN TOKEN
// =====================================================

export function getAdminToken() {

  return localStorage.getItem(
    "veloop_admin_token"
  );

}


// =====================================================
// CHECK ADMIN LOGIN
// =====================================================

export function isAdminLoggedIn() {

  return !!getAdminToken();

}


// =====================================================
// ADMIN LOGOUT
// =====================================================

export function adminLogout() {

  localStorage.removeItem(
    "veloop_admin_token"
  );

  localStorage.removeItem(
    "veloop_admin"
  );

}


// =====================================================
// GET INTERNSHIP APPLICATIONS
// =====================================================

export async function getInternshipApplications() {

  const token =
    getAdminToken();


  if (!token) {

    throw new Error(
      "Admin login required."
    );

  }


  const response =
    await fetch(
      `${API_URL}/api/internships`,
      {
        method: "GET",

        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );


  const data =
    await response.json();


  if (!response.ok) {

    throw new Error(
      data.message ||
      "Unable to load applications."
    );

  }


  return data.applications || [];

}


// =====================================================
// UPDATE APPLICATION STATUS
// =====================================================

export async function updateApplicationStatus(
  applicationId,
  status
) {

  const token =
    getAdminToken();


  const response =
    await fetch(
      `${API_URL}/api/internships/${applicationId}/status`,
      {
        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify({
          status,
        }),
      }
    );


  const data =
    await response.json();


  if (!response.ok) {

    throw new Error(
      data.message ||
      "Unable to update status."
    );

  }


  return data;

}