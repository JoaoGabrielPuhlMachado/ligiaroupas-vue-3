<script setup>
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
import router from "../router";

const LogOut = () => {
  authStore.LogOut();
  router.push("/login");
};
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
        <span class="ligia">Lígia Roupas</span>
      </div>
      <div class="login">
        <span><RouterLink to="/login">Login</RouterLink></span>
        <div v-if="authStore.isLogged == true">
          <button class="logout" @click="LogOut">Sair</button>
        </div>
      </div>
    </div>
  </header>
</template>
<style>
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
.login {
  width: 150px;
  display: flex;
  align-items: center;
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
