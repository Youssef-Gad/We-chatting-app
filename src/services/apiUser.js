import { BASE_URL } from "../constants/constants";

export async function getUser() {
  try {
    const token = localStorage.getItem("token");
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
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: newData,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteUser() {
  try {
    const token = localStorage.getItem("token");
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

export async function getUserByName(name) {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/user/search?name=${name}`, {
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
