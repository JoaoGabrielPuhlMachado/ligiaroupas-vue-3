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
  <h1>Tamanho</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="tamanho.descricao" placeholder="Descrição" />
    <button @click="salvar">Salvar</button>
  </div>
  <hr />
  <ul>
    <li v-for="tamanho in tamanhos" :key="tamanho.id">
      <span @click="editar(tamanho)">
        ({{ tamanho.id }}) - {{ tamanho.descricao }} -
      </span>
      <button @click="excluir(tamanho)">X</button>
    </li>
  </ul>
</template>

<style></style>
