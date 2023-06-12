<script setup>
import { storeToRefs } from 'pinia'

import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore()

const {isAdmin} = storeToRefs(authStore) 


</script>
<template>
  <div>
    <h1>Bem-Vindo</h1>
    <p>Status do Admin: {{ isAdmin }}</p>
    <button @click="authStore.toggleAdmin">Alterar Status</button>
  </div>
</template>
