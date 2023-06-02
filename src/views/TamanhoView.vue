<script>
import TamanhosApi from "@/api/tamanhos";
const tamanhosApi = new TamanhosApi();
export default {
  data() {
    return {
      tamanhos: [],
      tamanho: {},
    };
  },
  async created() {
    this.tamanhos = await tamanhosApi.buscarTodosOsTamanhos();
  },
  methods: {
    async salvar() {
      if (this.tamanho.id) {
        await tamanhosApi.atualizarTamanho(this.tamanho);
      } else {
        await tamanhosApi.adicionarTamanho(this.tamanho);
      }
      this.tamanho = {};
      this.tamanhos = await tamanhosApi.buscarTodosOsTamanhos();
    },
    editar(tamanho) {
      Object.assign(this.tamanho, tamanho);
    },
    async excluir(tamanho) {
      await tamanhosApi.excluirTamanho(tamanho.id);
      this.tamanhos = await tamanhosApi.buscarTodosOsTamanhos();
    },
  },
};
</script>

<template>
  <div class="form">
    <div class="tamanho">
      <label for="Tamanho">Tamanhos: </label>
      <input type="text" v-model="tamanho.especificacao" />
    </div>
    <div class="header-botao">
      <button class="botao" @click="salvar">Salvar</button>
    </div>
  </div>
  <div class="card-container">
    <div class="card" v-for="tamanho in tamanhos" :key="tamanho.id">
      <div class="card-content">
        ID: ({{ tamanho.id }}) - {{ tamanho.especificacao }}
        <button @click="editar(tamanho)">Editar</button>
        <button class="card-button" @click="excluir(tamanho)">X</button>
      </div>
    </div>
  </div>
</template>
<style></style>
