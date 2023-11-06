<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const authStore = useAuthStore();
import api from "../plugins/api";

const router = useRouter();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const first_name = ref("");
const last_name = ref("");
const telefone = ref("");
const cpf = ref("");
const data_nascimento = ref("");
const errorMessage = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleShowConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const cadastro = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "As senhas não coincidem.";
    return;
  }
  try {
    await api.post("/usuarios/", {
      email: email.value,
      password: password.value,
      first_name: first_name.value,
      last_name: last_name.value,
      telefone: telefone.value,
      cpf: cpf.value,
      data_nascimento: data_nascimento.value,
      groups: [1],
    });
    const response = await api.post("/token/", {
      email: email.value,
      password: password.value,
    });
    const token = response.data.access;
    authStore.setToken(token);
    router.push("/");
  } catch (error) {
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
        <div class="password">
          <label class="label-user-login-cadastro" for="senha">Senha: </label>
          <input
            class="input-user-login-cadastro"
            id="senha"
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
          />
          <font-awesome-icon
            :icon="showPassword ? faEye : faEyeSlash"
            @click="toggleShowPassword"
            class="eye-icon"
          />
        </div>
        <div class="confirm_password">
          <label class="label-user-login-cadastro" for="confirmarsenha"
            >Confirmar Senha:
          </label>
          <input
            class="input-user-login-cadastro"
            id="confirmarsenha"
            :type="showConfirmPassword ? 'text' : 'password'"
            v-model="confirmPassword"
          />
          <font-awesome-icon
            :icon="showConfirmPassword ? faEye : faEyeSlash"
            @click="toggleShowConfirmPassword"
            class="eye-icon"
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
.confirm_password,
.first_name,
.last_name,
.telefone,
.cpf,
.data_nascimento {
  display: flex;
  flex-direction: column;
}
.eye-icon {
  position: absolute;
  margin-top: 45px;
  margin-left: 275px;
  cursor: pointer;
}
</style>
