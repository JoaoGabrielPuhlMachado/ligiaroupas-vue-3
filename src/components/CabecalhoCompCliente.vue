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

function abrir(id) {
  router.push(`usuarios/${id}`);
}
</script>
<template>
  <header>
    <div class="menu">
      <div class="links">
        <span><RouterLink to="/">Home</RouterLink></span>
        <span><RouterLink to="/categorias">Categorias</RouterLink></span>
        <span><RouterLink to="/marcas">Marcas</RouterLink></span>
      </div>
      <div class="nome-site">
        <span class="ligia">Lígia Roupas</span>
      </div>
      <div class="login-cliente">
        <div v-if="authStore.isLogged == false">
          <span><RouterLink to="/login">Login</RouterLink></span>
        </div>
        <div v-if="authStore.isLogged == true">
          <button class="logout" @click="abrir(authStore.userId)">
            Perfil
          </button>
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
.logout {
  border: 1px solid black;
  background-color: transparent;
  cursor: pointer;
  border-radius: 4px;
}
.nome-site,
.links,
.login-cliente {
  width: 300px;
  display: flex;
  align-items: center;
}
.login-cliente {
  margin-right: 0zpx;
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
