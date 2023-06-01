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
  methods: {
    async salvar() {
      if (this.categoria.id) {
        await categoriasApi.atualizarCategoria(this.categoria);
      } else {
        await categoriasApi.adicionarCategoria(this.categoria);
      }
      this.categoria = {};
      this.categorias = await categoriasApi.buscarTodasAsCategorias();
    },
    editar(categoria) {
      Object.assign(this.categoria, categoria);
    },
    async excluir(categoria) {
      await categoriasApi.excluirCategoria(categoria.id);
      this.categorias = await categoriasApi.buscarTodasAsCategorias();
    },
  },
};
</script>
<template>
  <h1>Categoria</h1>
  <div class="form">
    <input type="text" v-model="categoria.descricao" placeholder="Descrição" />
    <button @click="salvar">Salvar</button>
  </div>
  <div class="card" v-for="categoria in categorias" :key="categoria.id">
    <div class="card-content">
      <div class="card-text" @click="editar(categoria)">
        ID: ({{ categoria.id }}) - {{ categoria.descricao }}
      </div>
      <button class="card-button" @click="excluir(categoria)">X</button>
    </div>
  </div>
</template>
<style></style>
