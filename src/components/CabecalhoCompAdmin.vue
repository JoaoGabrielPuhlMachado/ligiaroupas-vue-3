<script setup>
import { ref, reactive } from "vue";
import router from "../router";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const showLinks = ref(false);
const showMenu = ref(false);

const activeItem = reactive({
  profile: false,
});
function abrir() {
  router.push(`/admin/usuarios/${authStore.userId}`);
  activeItem.profile = true;
}
function mostrarLinks() {
  showLinks.value = true;
  showMenu.value = true;
  activeItem.profile = false;
}
function fecharMenu() {
  showLinks.value = false;
  showMenu.value = false;
  activeItem.profile = false;
}
</script>

<template>
  <header>
    <div class="menu">
      <div class="menu-left" @click="mostrarLinks">
        <span class="home-link">Menu</span>
      </div>
      <div class="nome-site">
        <span class="ligia">Lígia Roupas</span>
      </div>
      <div class="menu-right">
        <div class="login">
          <span
            @click="abrir()"
            :class="{ 'active-profile': activeItem.profile }"
            >Perfil</span
          >
        </div>
      </div>
    </div>
    <div v-if="showMenu" class="menu-overlay" @click="fecharMenu"></div>
    <div class="links" :class="{ 'show-menu': showMenu }">
      <span @click="fecharMenu"><RouterLink to="/">Home</RouterLink></span>
      <span @click="fecharMenu"
        ><RouterLink to="/admin/produtos">Produtos</RouterLink></span
      >
      <span @click="fecharMenu"
        ><RouterLink to="/admin/categorias">Categorias</RouterLink></span
      >
      <span @click="fecharMenu"
        ><RouterLink to="/admin/marcas">Marcas</RouterLink></span
      >
      <span @click="fecharMenu"
        ><RouterLink to="/admin/tamanhos">Tamanhos</RouterLink></span
      >
      <span @click="fecharMenu"
        ><RouterLink to="/admin/cores">Cores</RouterLink></span
      >
    </div>
  </header>
</template>
<style scoped>
.links span {
  margin-top: 20px;
}
.links span:hover {
  border-bottom: 1px solid black;
}
.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  background-color: white;
  color: black;
}
.menu-left,
.menu-right {
  cursor: pointer;
}
.nome-site {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.ligia {
  font-size: 40px;
}
.links {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  left: -30%;
  height: 100%;
  width: 20%;
  background-color: white;
  z-index: 2;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  transition: left 0.5s;
}
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 1;
  opacity: 0;
  transition: 0.5s;
}
.active-profile {
  font-weight: bold;
}
.show-menu {
  left: 0;
}
.router-link-active {
  color: black;
  font-weight: bold;
}
</style>
