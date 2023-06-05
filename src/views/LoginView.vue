<script>
import { ref } from "vue";

export default {
  name: "LoginPage",
  setup() {
    const username = ref("");
    const password = ref("");

    const login = () => {
      // Aqui você pode adicionar a lógica de autenticação
      // Por exemplo, enviar uma solicitação para o servidor para verificar as credenciais

      if (username.value && password.value) {
        console.log("Usuário autenticado com sucesso!");
        // Redirecionar para a página de dashboard, por exemplo
      } else {
        console.log("Credenciais inválidas!");
      }
    };

    return {
      username,
      password,
      login,
    };
  },
};
</script>
<template>
  <div class="login-container">
    <div class="login-content">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <label for="username">Usuário</label>
        <input type="text" id="username" v-model="username" required />

        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="password" required />
        <div class="div-login">
          <button class="botao-login" type="submit">Login</button>
        </div>
        <br />
        <p>Não tem conta?</p>
        <RouterLink to="/cadastro"
          ><span>Clique aqui para se cadastrar</span></RouterLink
        >
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
