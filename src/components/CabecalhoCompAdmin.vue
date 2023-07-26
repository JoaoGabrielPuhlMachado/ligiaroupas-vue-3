<script setup>
import { onMounted, ref } from "vue";
import router from "../router";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

import UsuariosApi from "/src/api/usuarios.js";
const usuariosApi = new UsuariosApi();
const usuarios = ref([]);
const LogOut = () => {
  authStore.LogOut();
  router.push("/login");
};
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
        <span><RouterLink to="/produtos">Produtos</RouterLink></span>
        <span><RouterLink to="/admin/categorias">Categorias</RouterLink></span>
        <span><RouterLink to="/admin/marcas">Marcas</RouterLink></span>
        <span><RouterLink to="/tamanhos">Tamanhos</RouterLink></span>
        <span><RouterLink to="/cores">Cores</RouterLink></span>
      </div>
      <div class="nome-site">
        <span class="ligia">Lígia Roupas</span>
      </div>
      <div class="login-admin">
        <div v-if="authStore.isLogged == false">
          <span><RouterLink to="/login">Login</RouterLink></span>
        </div>
        <div v-if="authStore.isLogged == true">
          <button class="perfil" @click="abrir(authStore.userId)">
            Perfil
          </button>
          <button class="perfil" @click="LogOut">LogOut</button>
        </div>
      </div>
    </div>
  </header>
</template>
<style setup>
.menu {
  display: flex;
  justify-content: space-between;
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
.login-admin {
  width: 150px;
  display: flex;
  align-items: center;
}
.ligia {
  font-weight: bold;
  font-size: 40px;
}
.login-admin {
  margin-right: 30px;
  justify-content: flex-end;
}
.router-link-active {
  color: black;
  font-weight: bold;
}
</style>
