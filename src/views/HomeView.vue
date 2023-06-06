<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["isAdmin"]),
  },
  methods: {
    ...mapMutations(["toggleAdmin"]),
  },
};
</script>
<template>
  <div>
    <h1>Bem-Vindo</h1>
    <p>Status do Admin: {{ isAdmin }}</p>
    <button @click="toggleAdmin">Alterar Status</button>
  </div>
</template>
