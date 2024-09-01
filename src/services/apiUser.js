import { BASE_URL } from "../constants/constants";

const token = localStorage.getItem("token");

export async function getUser() {
  try {
    const res = await fetch(`${BASE_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUser(newData) {
  try {
    const res = await fetch(`${BASE_URL}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function delteUser() {
  try {
    const res = await fetch(`${BASE_URL}/user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
