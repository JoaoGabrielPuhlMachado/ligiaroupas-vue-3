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
      <label for="cor">Cores: </label>
      <input id="cor" type="text" v-model="cor.nome_cor" />
    </div>
    <div class="header-botao">
      <button class="salvar" @click="salvar">Salvar</button>
    </div>
  </div>
  <div class="card-container">
    <div class="card" v-for="cor in cores" :key="cor.id">
      <div class="card-content">
        ID: ({{ cor.id }}) - {{ cor.nome_cor }}
        <div class="botoes">
          <button class="edit" @click="editar(cor)">Editar</button>
          <button class="del" @click="excluir(cor)">X</button>
        </div>
      </div>
    </div>
  </div>
</template>
