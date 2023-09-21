<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
const authStore = useAuthStore();
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const email = ref("");
const password = ref("");
const errorMessage = ref("");

const Logout = () => {
  authStore.LogOut();
  window.alert("Usuário não é admin, permissão negada!");
  router.push("/");
};
const login = async () => {
  try {
    const response = await axios.post("http://localhost:8000/api/token/", {
      email: email.value,
      password: password.value,
    });
    const token = response.data.access;
    authStore.setToken(token);
    if (authStore.isAdmin === false) {
      Logout();
    }
    router.push("/");
  } catch (error) {
    errorMessage.value = "Erro ao fazer login";
  }
};
</script>
<template>
  <div class="login-container">
    <div class="login-content">
      <h1>Login Admin</h1>
      <form @submit.prevent="login">
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="email" required />

        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="password" required />
        <div class="div-botao-login">
          <button class="botao-login" type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}
.login-content {
  width: 300px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
form {
  display: flex;
  flex-direction: column;
}
label {
  font-size: 18px;
  cursor: pointer;
  text-align: center;
  margin-bottom: 5px;
}
input {
  padding: 5px;
  margin-bottom: 10px;
  width: 290px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.8);
}
.div-botao-login {
  padding: 5px;
  margin: 10px 0 0 0;
  width: 290px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.8);
  justify-content: center;
  display: flex;
}
.botao-login {
  border: none;
  background-color: transparent;
}
.botao-login:hover {
  cursor: pointer;
}
.div-botao-login:hover {
  cursor: pointer;
  background-color: #f1ebf7;
  border: none;
}
</style>
