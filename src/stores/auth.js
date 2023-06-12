import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => {
    return {
      isAdmin: false,
    }
  },
  actions: {
    toggleAdmin() {
      this.isAdmin = !this.isAdmin;
    },
  },
});
