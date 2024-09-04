import { BASE_URL } from "../constants/constants";

const token = localStorage.getItem("token");

export async function getAllChatsOfUser() {
  try {
    const res = await fetch(`${BASE_URL}/chat`, {
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
