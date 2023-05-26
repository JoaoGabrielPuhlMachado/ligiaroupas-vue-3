<script>
import ItensApi from "@/api/itens";
const itensApi = new ItensApi();
import CategoriasApi from "@/api/categorias";
const categoriasApi = new CategoriasApi();
import MarcasApi from "@/api/marcas";
const marcasApi = new MarcasApi();
import TamanhosApi from "@/api/tamanhos";
const tamanhosApi = new TamanhosApi();
import CoresApi from "@/api/cores";
const coresApi = new CoresApi();
export default {
  data() {
    return {
      itens: [],
      item: {},
      marcas: [],
      cores: [],
      tamanhos: [],
      categorias: [],
      preco: {},
      quantidade: {},
    };
  },
  async created() {
    this.itens = await itensApi.buscarTodosOsItens();
    this.marcas = await marcasApi.buscarTodasAsMarcas();
    this.cores = await coresApi.buscarTodasAsCores();
    this.tamanhos = await tamanhosApi.buscarTodosOsTamanhos();
    this.categorias = await categoriasApi.buscarTodasAsCategorias();
  },
  methods: {
    async salvar() {
      if (this.item.id) {
        await itensApi.atualizarItem(this.item);
      } else {
        await itensApi.adicionarItem(this.item);
      }
      this.item = {};
      this.itens = await itensApi.buscarTodosOsItens();
    },
    editar(item) {
      Object.assign(this.item, item);
    },
    async excluir(item) {
      await itensApi.excluirItem(item.id);
      this.itens = await itensApi.buscarTodosOsItens();
    },
  },
};
</script>

<template>
  <h1>Item</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="item.nome" placeholder="Descrição" />
    <input type="text" v-model="item.quantidade" placeholder="Quantidade" />
    <input type="text" v-model="item.preco" placeholder="Preço" />
    <select v-model="item.categoriaId">
      <option
        v-for="categoria in categorias"
        :key="categoria.id"
        :value="categoria.id"
      >
        {{ categoria.descricao }}
      </option>
    </select>
    <select v-model="item.corId">
      <option v-for="cor in cores" :key="cor.id" :value="cor.id">
        {{ cor.descricao }}
      </option>
    </select>
    <select v-model="item.marcaId">
      <option v-for="marca in marcas" :key="marca.id" :value="marca.id">
        {{ marca.descricao }}
      </option>
    </select>
    <select v-model="item.tamanhoId">
      <option v-for="tamanho in tamanhos" :key="tamanho.id" :value="tamanho.id">
        {{ tamanho.descricao }}
      </option>
    </select>
    <button @click="salvar">Salvar</button>
  </div>
  <hr />
  <ul>
    <li v-for="item in itens" :key="item.id">
      <span @click="editar(item)">
        ({{ item.id }}) - {{ item.nome }} - {{ item.cor }} -
        {{ item.categoria }} {{ item.marca }} - {{ item.tamanho }} -
        {{ item.quantidade }} -
        {{ item.preco }}
      </span>
      <button @click="excluir(item)">X</button>
    </li>
  </ul>
</template>

<style></style>
