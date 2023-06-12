<script setup>
import CabecalhoCompAdmin from "./components/CabecalhoCompAdmin.vue";
import CabecalhoCompCliente from "./components/CabecalhoCompCliente.vue";
import { storeToRefs } from 'pinia'

import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore()
const { isAdmin } = storeToRefs(authStore)

</script>

<template>
  <div>
    <div v-if="isAdmin">
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
