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

<script>
import CabecalhoCompAdmin from "./components/CabecalhoCompAdmin.vue";
import CabecalhoCompCliente from "./components/CabecalhoCompCliente.vue";
import { mapState } from "vuex";

export default {
  components: {
    CabecalhoCompAdmin,
    CabecalhoCompCliente,
  },
  computed: {
    ...mapState(["isAdmin"]),
  },
};
</script>

<style>
#app {
  height: 100vh;
}
</style>
