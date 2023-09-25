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
    await axios.post("http://191.52.55.226:19003/api/usuarios/", {
      email: email.value,
      password: password.value,
      first_name: first_name.value,
      last_name: last_name.value,
      telefone: telefone.value,
      cpf: cpf.value,
      data_nascimento: data_nascimento.value,
      groups: [1],
    });
    const response = await axios.post("http://191.52.55.226:19003/api/token/", {
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
    <div class="cadastro-content">
      <form @submit.prevent="cadastro">
        <h1>Cadastro Admin</h1>
        <div class="email">
          <label for="email">Email: </label>
          <input class="input" id="email" type="email" v-model="email" />
        </div>
        <div class="first_name">
          <label for="first_name">Primeiro Nome: </label>
          <input id="first_name" type="text" v-model="first_name" />
        </div>
        <div class="last_name">
          <label for="last_name">Último Nome: </label>
          <input id="last_name" type="text" v-model="last_name" />
        </div>
        <div class="telefone">
          <label for="telefone">Telefone: </label>
          <input id="telefone" type="tel" v-model="telefone" />
        </div>
        <div class="cpf">
          <label for="cpf">CPF: </label>
          <input id="cpf" type="text" v-model="cpf" />
        </div>
        <div class="data_nascimento">
          <label for="data_nascimento">Data de Nascimento: </label>
          <input
            type="date"
            id="data_nascimento"
            v-model="data_nascimento"
            required
          />
        </div>
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
  margin-top: 30px;
}
.cadastro-content {
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
.div-cadastro {
  padding: 5px;
  margin: 10px 0 0 0;
  width: 290px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #f1ebf7;
  justify-content: center;
  display: flex;
}
.botao-cadastro {
  border: none;
  background-color: transparent;
}
.botao-cadastro:hover {
  cursor: pointer;
}
.div-cadastro:hover {
  cursor: pointer;
  background-color: white;
  border: none;
}
.erro-cadastro {
  margin-top: 10px;
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
