import router from "./router";
export function checkTokenExpiration() {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();

    if (currentTime >= expirationTime) {
      logoutUser();
    }
  }
}
export function logoutUser() {
  localStorage.removeItem("token");
  router.push("/admin/login");
}
