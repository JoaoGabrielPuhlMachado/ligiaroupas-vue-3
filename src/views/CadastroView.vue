<script>
import { ref } from "vue";

export default {
  name: "cadastroPage",
  setup() {
    const username = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const email = ref("");
    const phone = ref("");

    const cadastro = () => {
      // Aqui você pode adicionar a lógica de registro
      // Por exemplo, enviar os dados para o servidor para criar uma nova conta

      if (
        username.value &&
        password.value &&
        confirmPassword.value &&
        email.value &&
        phone.value
      ) {
        if (password.value !== confirmPassword.value) {
          console.log("As senhas não coincidem!");
          return;
        }

        console.log("Nova conta criada com sucesso!");
        // Redirecionar para a página de login ou para outra página de sua escolha
      } else {
        console.log("Por favor, preencha todos os campos!");
      }
    };

    return {
      username,
      password,
      confirmPassword,
      email,
      phone,
      cadastro,
    };
  },
};
</script>
<template>
  <div class="cadastro-container">
    <div class="cadastro-content">
      <h1>Registro</h1>
      <form @submit.prevent="cadastro">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />

        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />

        <label for="confirmPassword">Confirmar senha:</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          required
        />

        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />

        <label for="phone">Telefone:</label>
        <input type="tel" id="phone" v-model="phone" required />

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
input[type="password"],
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
