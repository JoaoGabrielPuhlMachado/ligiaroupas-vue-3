import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAdmin: false,
    token: "",
  }),
  actions: {
    toggleAdmin() {
      this.isAdmin = !this.isAdmin;
    },
    setToken(token) {
      this.token = token;
    },
    LogOut() {
      this.isAdmin = false;
      this.token = "";
    },
  },
});
