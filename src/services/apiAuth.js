import { BASE_URL } from "../constants/constants";

export async function protectedRoute() {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function register(userData) {
  try {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      body: userData,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function activateEmail(activationCode, token) {
  try {
    const res = await fetch(`${BASE_URL}/auth/activateAccount/${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activationCode),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function login(userData) {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function resendActivationCode(token) {
  try {
    const res = await fetch(`${BASE_URL}/auth/resendActivationCode/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function forgetpassword(email) {
  try {
    const res = await fetch(`${BASE_URL}/auth/forgetpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function passwordResetVerification(
  verificationCode,
  passwordResetVerificationToken,
) {
  try {
    const res = await fetch(
      `${BASE_URL}/auth/passwordResetVerification/${passwordResetVerificationToken}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(verificationCode),
      },
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function resetPassword(newData, passwordResetToken) {
  try {
    const res = await fetch(
      `${BASE_URL}/auth/resetPassword/${passwordResetToken}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      },
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  try {
    const res = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
