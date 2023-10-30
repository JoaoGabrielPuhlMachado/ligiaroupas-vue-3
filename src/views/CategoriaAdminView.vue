<script>
import CategoriasApi from "@/services/categorias";
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
  <div class="form">
    <div class="categoria">
      <label for="categoria">Categorias: </label>
      <input id="categoria" type="text" v-model="categoria.descricao" />
    </div>
    <div class="header-botao">
      <button class="salvar" @click="salvar">Salvar</button>
    </div>
  </div>
  <div class="card-container">
    <div class="card" v-for="categoria in categorias" :key="categoria.id">
      <div class="card-content">
        ID: ({{ categoria.id }}) - {{ categoria.descricao }}
        <div class="botoes">
          <button class="edit" @click="editar(categoria)">Editar</button>
          <button class="del" @click="excluir(categoria)">X</button>
        </div>
      </div>
    </div>
  </div>
</template>
