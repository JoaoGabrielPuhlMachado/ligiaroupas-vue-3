<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

import UsuariosApi from "/src/api/usuarios.js";
const usuariosApi = new UsuariosApi();
const usuario = ref({
  first_name: "",
});

onMounted(async () => {
  usuario.value = await usuariosApi.buscarUsuarioPorId(authStore.userId);
});
</script>
<template>
  <div class="imagem-background">
    <img class="imagem-ligia" src="@/imagens/loja-de-roupas-online2.jpg" />
  </div>
  <div class="boas_vindas">
    <div v-if="authStore.isLogged === false">
      <h1>Faça login para acessar à área do admin</h1>
    </div>
    <div v-else>
      <h1>Bem vindo a área do admin, {{ usuario.first_name }}!</h1>
    </div>
  </div>
</template>
<style scoped>
.imagem-ligia {
  width: 95%;
  height: 500px;
}
.imagem-background {
  margin: 20px 0;
}
.boas_vindas {
  text-align: center;
}
.produto-card-text {
  display: flex;
  justify-content: center;
  font-size: 19px;
  height: 60px;
  align-items: center;
  margin: 15px;
}
.produto-card-container {
  display: flex;
  flex-wrap: wrap;
}
.produto-card {
  width: 18%;
  height: 430px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-weight: bold;
  background-color: #f5f5f5;
}
.produto-card-content {
  cursor: pointer;
}
img {
  width: 100%;
  height: 350px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-left: auto;
  margin-right: auto;
}
</style>
