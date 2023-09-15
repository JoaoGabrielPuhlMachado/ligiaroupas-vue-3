import { defineStore } from "pinia";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    isLogged: false,
    userId: "",
  }),
  actions: {
    setToken(token) {
      this.token = token;
      const splittedToken = parseJwt(token);
      this.isLogged = true;
      this.userId = splittedToken["user_id"];
      localStorage.setItem("token", token);
    },
    LogOut() {
      this.isLogged = false;
      this.token = "";
      this.userId = "";
      localStorage.removeItem("token");
    },
    checkAuth() {
      if (this.token) {
        this.isLogged = true;
        const splittedToken = parseJwt(this.token);
        this.userId = splittedToken["user_id"];
      } else {
        this.isLogged = false;
        this.userId = "";
      }
    },
  },
});
