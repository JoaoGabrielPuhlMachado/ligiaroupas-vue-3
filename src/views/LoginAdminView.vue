<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
import { useAuthStore } from "@/stores/auth";
import api from "../plugins/api";

const router = useRouter();
const email = ref("");
const password = ref("");
const errorMessage = ref("");

const Logout = () => {
  authStore.LogOut();
  router.push("/admin/login");
};
const login = async () => {
  try {
    const response = await api.post("/token/custom/", {
      email: email.value,
      password: password.value,
    });
    const token = response.data.access;
    authStore.setToken(token);
    if (authStore.tipo_usuario === 2) {
      Logout();
      errorMessage.value = "Usuário não é admin, permissão negada!";
    }
    if (authStore.tipo_usuario === 1) {
      router.push("/");
    }
  } catch (error) {
    errorMessage.value = "Erro ao fazer login";
  }
};
</script>
<template>
  <div class="login-container">
    <div class="login-cadastro-content">
      <h1>Login Admin</h1>
      <form class="form-login-cadastro" @submit.prevent="login">
        <label class="label-user-login-cadastro" for="email">Email:</label>
        <input
          class="input-user-login-cadastro"
          type="text"
          id="email"
          v-model="email"
          required
        />

        <label class="label-user-login-cadastro" for="password">Senha:</label>
        <input
          class="input-user-login-cadastro"
          type="password"
          id="password"
          v-model="password"
          required
        />
        <div class="div-login-cadastro">
          <button class="botao-login-cadastro" type="submit">Login</button>
        </div>
        <p class="erro-login-cadastro">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
}
</style>
