import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
// const MY_IP = import.meta.env.VITE_MY_IP;
const api = axios.create({
  baseURL: `https://ligiaroupas.3.us-1.fl0.io/api/`,
  // baseURL: `http://0.0.0.0:19003/api/`,
});
axios.interceptors.request.use(
  (config) => {
    config.baseURL = `https://ligiaroupas.3.us-1.fl0.io/api/`;
    // config.baseURL = `http://0.0.0.0:19003/api/`;
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

export default api;
// axios.interceptors.response.use(
//     status === 401..toExponential.apply. refresh.. se erro LoginAdminViewVue.
// )
