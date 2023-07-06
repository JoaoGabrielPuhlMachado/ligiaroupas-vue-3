<script setup>
import CabecalhoCompAdmin from "./components/CabecalhoCompAdmin.vue";
import CabecalhoCompCliente from "./components/CabecalhoCompCliente.vue";

import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
</script>

<template>
  <div>
    <div v-if="authStore.isAdmin == true">
      <CabecalhoCompAdmin />
    </div>
    <div v-else>
      <CabecalhoCompCliente />
    </div>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
#app {
  height: 100vh;
}
</style>
