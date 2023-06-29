import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAdmin: false,
    token: "",
    id: "",
  }),
  actions: {
    toggleAdmin() {
      this.isAdmin = !this.isAdmin;
    },
    setToken(token) {
      this.token = token;
    },
    setId(id) {
      this.id = id;
    },
  },
});
