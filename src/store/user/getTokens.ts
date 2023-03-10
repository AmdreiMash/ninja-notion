import { API_HOST } from "../../data/constants";

async function getTokens() {
  if (localStorage.getItem("refreshToken")) {
    try {
      await fetch(`${API_HOST}refresh`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        },
      }).then(async (response) => {
        const body = await response.json();
        if (response.ok) {
          sessionStorage.setItem("accessToken", body.accessToken);
          localStorage.setItem("refreshToken", body.refreshToken);
        } else {
          localStorage.removeItem("refreshToken");
          window.location.replace("/");
          return;
        }
      });
    } catch (e) {
      window.location.replace("/");
      throw new Error("Server error");
    }
  } else {
    window.location.replace("/");
    return;
  }
}

export default getTokens;
