<script setup>
import { onMounted, ref } from "vue";
import router from "../router";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

import UsuariosApi from "/src/api/usuarios.js";
const usuariosApi = new UsuariosApi();
const usuarios = ref([]);
onMounted(async () => {
  usuarios.value = await usuariosApi.buscarTodosOsUsuarios();
});

function abrir() {
  router.push(`/admin/usuarios/${authStore.userId}`);
}
</script>
<template>
  <header>
    <div class="menu">
      <div class="links">
        <span><RouterLink to="/">Home</RouterLink></span>
        <span><RouterLink to="/admin/produtos">Produtos</RouterLink></span>
        <span><RouterLink to="/admin/categorias">Categorias</RouterLink></span>
        <span><RouterLink to="/admin/marcas">Marcas</RouterLink></span>
        <span><RouterLink to="/admin/tamanhos">Tamanhos</RouterLink></span>
        <span><RouterLink to="/admin/cores">Cores</RouterLink></span>
      </div>
      <div class="nome-site">
        <span class="ligia">Lígia Roupas</span>
      </div>
      <div class="login">
        <div v-if="authStore.isLogged == false">
          <span><RouterLink to="/admin/login">Login</RouterLink></span>
        </div>
        <div v-if="authStore.isLogged == true">
          <button class="perfil" @click="abrir()">Perfil Admin</button>
        </div>
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
.login-cliente {
  width: 100%;
  display: flex;
  align-items: center;
}
.login-cliente {
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
