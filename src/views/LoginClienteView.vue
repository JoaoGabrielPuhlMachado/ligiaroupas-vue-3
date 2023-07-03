<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const email = ref("");
const password = ref("");
const errorMessage = ref("");

const authStore = useAuthStore();

const login = async () => {
  try {
    const response = await axios.post("http://localhost:8000/api/token/", {
      email: email.value,
      password: password.value,
    });
    const token = response.data.access;
    authStore.setToken(token);

    router.push("/produtos");
  } catch (error) {
    errorMessage.value = "Erro ao fazer login";
  }
};
</script>
<template>
  <div class="login-container">
    <div class="login-content">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <label for="email">Email</label>
        <input type="text" id="email" v-model="username" required />

        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="password" required />
        <div class="div-login">
          <button class="botao-login" type="submit">Login</button>
        </div>
        <br />
        <p>
          Não tem conta?
          <RouterLink to="/cadastro"><span> Cadastre-se</span></RouterLink>
        </p>
        <p>
          Admin?
          <RouterLink to="/admin/login"><span>Login</span></RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}
.login-content {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-bottom: 5px;
}
input[type="text"],
input[type="password"] {
  padding: 5px;
  margin-bottom: 10px;
}
.div-login {
  display: flex;
  justify-content: center;
}
.botao-login {
  width: 90px;
  height: 35px;
}
span {
  color: blue;
}
</style>
