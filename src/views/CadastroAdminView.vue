<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const router = useRouter();
const email = ref("");
const password = ref("");
const first_name = ref("");
const last_name = ref("");
const telefone = ref("");
const cpf = ref("");
const data_nascimento = ref("");
const errorMessage = ref("");

const cadastro = async () => {
  try {
    await axios.post("http://191.52.55.187:19003/api/usuarios/", {
      email: email.value,
      password: password.value,
      first_name: first_name.value,
      last_name: last_name.value,
      telefone: telefone.value,
      cpf: cpf.value,
      data_nascimento: data_nascimento.value,
      groups: [1],
    });
    const response = await axios.post("http://191.52.55.187:19003/api/token/", {
      email: email.value,
      password: password.value,
    });
    const token = response.data.access;
    authStore.setToken(token);
    router.push("/");
  } catch (error) {
    console.log(error);
    errorMessage.value = "Erro ao cadastrar-se";
  }
};
</script>
<template>
  <div class="cadastro-container">
    <div class="login-cadastro-content">
      <form @submit.prevent="cadastro">
        <h1>Cadastro Admin</h1>
        <div class="email">
          <label class="label-user-login-cadastro" for="email">Email: </label>
          <input
            class="input-user-login-cadastro"
            id="email"
            type="email"
            v-model="email"
          />
        </div>
        <div class="first_name">
          <label class="label-user-login-cadastro" for="first_name"
            >Primeiro Nome:
          </label>
          <input
            class="input-user-login-cadastro"
            id="first_name"
            type="text"
            v-model="first_name"
          />
        </div>
        <div class="last_name">
          <label class="label-user-login-cadastro" for="last_name"
            >Último Nome:
          </label>
          <input
            class="input-user-login-cadastro"
            id="last_name"
            type="text"
            v-model="last_name"
          />
        </div>
        <div class="telefone">
          <label class="label-user-login-cadastro" for="telefone"
            >Telefone:
          </label>
          <input
            class="input-user-login-cadastro"
            id="telefone"
            type="tel"
            v-model="telefone"
          />
        </div>
        <div class="cpf">
          <label class="label-user-login-cadastro" for="cpf">CPF: </label>
          <input
            class="input-user-login-cadastro"
            id="cpf"
            type="text"
            v-model="cpf"
          />
        </div>
        <div class="data_nascimento">
          <label class="label-user-login-cadastro" for="data_nascimento"
            >Data de Nascimento:
          </label>
          <input
            class="input-user-login-cadastro"
            type="date"
            id="data_nascimento"
            v-model="data_nascimento"
            required
          />
        </div>
        <div class="div-login-cadastro">
          <button class="botao-login-cadastro" type="submit">Registrar</button>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
.cadastro-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
.email,
.password,
.first_name,
.last_name,
.telefone,
.cpf,
.data_nascimento {
  display: flex;
  flex-direction: column;
}
</style>
