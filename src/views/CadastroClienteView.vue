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
    await axios.post("http://localhost:8000/api/usuarios/", {
      email: email.value,
      password: password.value,
      first_name: first_name.value,
      last_name: last_name.value,
      telefone: telefone.value,
      cpf: cpf.value,
      data_nascimento: data_nascimento.value,
      groups: [2],
    });
    const response = await axios.post("http://localhost:8000/api/token/", {
      email: email.value,
      password: password.value,
    });
    const token = response.data.access;
    authStore.setToken(token);

    router.push("/");
  } catch (error) {
    console.log(error);
    errorMessage.value = "Erro ao fazer login";
  }
};
</script>
<template>
  <div class="cadastro-container">
    <div class="cadastro-content">
      <form @submit.prevent="cadastro">
        <h1>Cadastro</h1>
        <label for="primeironome">Primeiro Nome:</label>
        <input type="text" id="primeironome" v-model="first_name" required />

        <label for="ultimonome">Último Nome:</label>
        <input type="text" id="ultimonome" v-model="last_name" required />

        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />

        <label for="telefone">Telefone:</label>
        <input type="tel" id="telefone" v-model="telefone" required />

        <label for="cpf">CPF:</label>
        <input type="text" id="cpf" v-model="cpf" required />

        <label for="datanascimento">Data de Nascimento:</label>
        <input
          type="date"
          id="datanascimento"
          v-model="data_nascimento"
          required
        />

        <label for="senha">Senha:</label>
        <input type="password" id="senha" v-model="password" required />

        <div class="div-cadastro">
          <button class="botao-cadastro" type="submit">Registrar</button>
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
  height: 600px;
  margin: 100px 0;
}

.cadastro-content {
  width: 350px;
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
input[type="senha"],
input[type="email"],
input[type="tel"] {
  padding: 5px;
  margin-bottom: 10px;
}

.div-cadastro {
  display: flex;
  justify-content: center;
}

.botao-cadastro {
  width: 90px;
  height: 35px;
}
</style>
