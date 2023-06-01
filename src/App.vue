<script setup>
import CabecalhoComp from "./components/CabecalhoComp.vue";
</script>

<template>
  <CabecalhoComp />
  <main>
    <RouterView />
  </main>
</template>
<style>
#app {
  height: 100vh;
}
</style>
