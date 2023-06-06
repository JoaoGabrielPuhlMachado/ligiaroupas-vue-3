<script>
import { ref } from "vue";

export default {
  name: "cadastroPage",
  setup() {
    const usuario = ref("");
    const senha = ref("");
    const confirmarsenha = ref("");
    const email = ref("");
    const telefone = ref("");

    const cadastro = () => {
      // Aqui você pode adicionar a lógica de registro
      // Por exemplo, enviar os dados para o servidor para criar uma nova conta

      if (
        usuario.value &&
        senha.value &&
        confirmarsenha.value &&
        email.value &&
        telefone.value
      ) {
        if (senha.value !== confirmarsenha.value) {
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
      usuario,
      senha,
      confirmarsenha,
      email,
      telefone,
      cadastro,
    };
  },
};
</script>
<template>
  <div class="cadastro-container">
    <div class="cadastro-content">
      <h1>Cadastro Admin</h1>
      <form @submit.prevent="cadastro">
        <label for="usuario">Usuario:</label>
        <input type="text" id="usuario" v-model="usuario" required />

        <label for="senha">Senha:</label>
        <input type="senha" id="senha" v-model="senha" required />

        <label for="confirmarsenha">Confirmarar senha:</label>
        <input
          type="senha"
          id="confirmarsenha"
          v-model="confirmarsenha"
          required
        />

        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />

        <label for="telefone">Telefone:</label>
        <input type="tel" id="telefone" v-model="telefone" required />

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
