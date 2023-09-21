<script setup>
import CabecalhoCompAdmin from "./components/CabecalhoCompAdmin.vue";
import CabecalhoCompNotLogged from "./components/CabecalhoCompNotLogged.vue";

import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
import { checkTokenExpiration } from "./tokenExpiration";

setInterval(checkTokenExpiration, 60000);
</script>

<template>
  <div>
    <div v-if="authStore.isLogged === true">
      <CabecalhoCompAdmin />
    </div>
    <div v-else>
      <CabecalhoCompNotLogged />
    </div>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
#app {
  height: 100vh;
  background-color: #f1ebf7;
}
</style>
