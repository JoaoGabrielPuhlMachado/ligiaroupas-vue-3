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
  <div class="form">
    <div class="cor">
      <label for="Cor">Cores: </label>
      <input type="text" v-model="cor.nome_cor" />
    </div>
    <div class="header-botao">
      <button class="botao" @click="salvar">Salvar</button>
    </div>
  </div>
  <div class="card-container">
    <div class="card" v-for="cor in cores" :key="cor.id">
      <div class="card-content">
        ID: ({{ cor.id }}) - {{ cor.nome_cor }}
        <button @click="editar(cor)">Editar</button>
        <button class="card-button" @click="excluir(cor)">X</button>
      </div>
    </div>
  </div>
</template>
<style></style>
