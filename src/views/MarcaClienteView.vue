<script>
import MarcasApi from "@/api/marcas";
const marcasApi = new MarcasApi();
export default {
  data() {
    return {
      marcas: [],
      marca: {},
    };
  },
  async created() {
    this.marcas = await marcasApi.buscarTodasAsMarcas();
  },
};
</script>

<template>
  <div class="cliente-card-container">
    <div class="cliente-card" v-for="marca in marcas" :key="marca.id">
      <div class="cliente-card-content">
        {{ marca.nome_marca }}
      </div>
    </div>
  </div>
</template>
<style></style>
