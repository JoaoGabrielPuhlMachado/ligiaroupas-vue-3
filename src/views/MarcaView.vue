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
  methods: {
    async salvar() {
      if (this.marca.id) {
        await marcasApi.atualizarMarca(this.marca);
      } else {
        await marcasApi.adicionarMarca(this.marca);
      }
      this.marca = {};
      this.marcas = await marcasApi.buscarTodasAsMarcas();
    },
    editar(marca) {
      Object.assign(this.marca, marca);
    },
    async excluir(marca) {
      await marcasApi.excluirCategoria(marca.id);
      this.marcas = await marcasApi.buscarTodasAsMarcas();
    },
  },
};
</script>

<template>
  <h1>Marca</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="marca.nome_marca" placeholder="Descrição" />
    <button @click="salvar">Salvar</button>
  </div>
  <hr />
  <ul>
    <li v-for="marca in marcas" :key="marca.id">
      <span @click="editar(marca)">
        ({{ marca.id }}) - {{ marca.nome_marca }} -
      </span>
      <button @click="excluir(marca)">X</button>
    </li>
  </ul>
</template>

<style></style>
