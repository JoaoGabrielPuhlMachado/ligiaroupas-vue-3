import { createApp } from "vue";
import { createStore } from "vuex";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./plugins/axios";

import "./assets/main.css";
const store = createStore({
  state() {
    return {
      isAdmin: false,
    };
  },
  mutations: {
    toggleAdmin(state) {
      state.isAdmin = !state.isAdmin;
    },
  },
});
const app = createApp(App);
("");
app.use(createPinia());
app.use(router);
app.use(store);
app.mount("#app");
