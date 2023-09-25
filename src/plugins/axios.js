import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

axios.defaults.baseURL = "http://191.52.55.226:19003/api/";

axios.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const { token } = storeToRefs(authStore);
    if (token.value !== undefined) {
      config.headers["Authorization"] = `Bearer ${token.value}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axios.interceptors.response.use(
//     status === 401..toExponential.apply. refresh.. se erro LoginAdminViewVue.
// )
