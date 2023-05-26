<script>
import CoresApi from "@/api/cores";
const coresApi = new CoresApi();
export default {
  data() {
    return {
      cores: [],
      cor: {},
    };
  },
  async created() {
    this.cores = await coresApi.buscarTodasAsCores();
  },
  methods: {
    async salvar() {
      if (this.cor.id) {
        await coresApi.atualizarCor(this.cor);
      } else {
        await coresApi.adicionarCor(this.cor);
      }
      this.cor = {};
      this.cores = await coresApi.buscarTodasAsCores();
    },
    editar(cor) {
      Object.assign(this.cor, cor);
    },
    async excluir(cor) {
      await coresApi.excluirCor(cor.id);
      this.cores = await coresApi.buscarTodasAsCores();
    },
  },
};
</script>

<template>
  <h1>Cor</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="cor.descricao" placeholder="Descrição" />
    <button @click="salvar">Salvar</button>
  </div>
  <hr />
  <ul>
    <li v-for="cor in cores" :key="cor.id">
      <span @click="editar(cor)"> ({{ cor.id }}) - {{ cor.descricao }} - </span>
      <button @click="excluir(cor)">X</button>
    </li>
  </ul>
</template>

<style></style>
