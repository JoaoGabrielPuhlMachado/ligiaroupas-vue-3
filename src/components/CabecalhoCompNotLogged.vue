<script setup>
import { onMounted, ref } from "vue";

import UsuariosApi from "/src/api/usuarios.js";
const usuariosApi = new UsuariosApi();
const usuarios = ref([]);
onMounted(async () => {
  usuarios.value = await usuariosApi.buscarTodosOsUsuarios();
});
</script>
<template>
  <header>
    <div class="menu">
      <div class="links">
        <span><RouterLink to="/">Home</RouterLink></span>
      </div>
      <div class="nome-site">
        <span class="ligia">Lígia Roupas</span>
      </div>
      <div class="login">
        <span><RouterLink to="/admin/login">Login</RouterLink></span>
      </div>
    </div>
  </header>
</template>
<style setup>
.menu {
  display: flex;
  width: 100%;
}
.perfil {
  border: 1px solid black;
  background-color: transparent;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 10px;
}
.nome-site,
.links,
.login {
  width: 100%;
  display: flex;
  align-items: center;
}
.login {
  margin-right: 0px;
  justify-content: flex-end;
}
.ligia {
  font-weight: bold;
  font-size: 40px;
}
.router-link-active {
  color: black;
  font-weight: bold;
}
</style>
