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
      await marcasApi.excluirMarca(marca.id);
      this.marcas = await marcasApi.buscarTodasAsMarcas();
    },
  },
};
</script>

<template>
  <div class="form">
    <div class="marca">
      <label for="Marca">Marcas: </label>
      <input type="text" v-model="marca.nome_marca" />
    </div>
    <div class="header-botao">
      <button class="botao" @click="salvar">Salvar</button>
    </div>
  </div>
  <div class="card-container">
    <div class="card" v-for="marca in marcas" :key="marca.id">
      <div class="card-content">
        ID: ({{ marca.id }}) - {{ marca.nome_marca }}
        <button @click="editar(marca)">Editar</button>
        <button class="card-button" @click="excluir(marca)">X</button>
      </div>
    </div>
  </div>
</template>
<style></style>
