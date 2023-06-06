<script>
import CategoriasApi from "@/api/categorias";
const categoriasApi = new CategoriasApi();
export default {
  data() {
    return {
      categorias: [],
      categoria: {},
    };
  },
  async created() {
    this.categorias = await categoriasApi.buscarTodasAsCategorias();
  },
};
</script>
<template>
  <div class="cliente-card-container">
    <div
      class="cliente-card"
      v-for="categoria in categorias"
      :key="categoria.id"
    >
      <div class="cliente-card-content">
        {{ categoria.descricao }}
      </div>
    </div>
  </div>
</template>
