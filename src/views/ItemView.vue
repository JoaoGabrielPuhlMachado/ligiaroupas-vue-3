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
      item: {
        cor: "",
        marca: "",
        categoria: "",
        tamanho: "",
      },
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
        this.item.cor = this.item.cor.id;
        this.item.marca = this.item.marca.id;
        this.item.categoria = this.item.categoria.id;
        this.item.tamanho = this.item.tamanho.id;
        await itensApi.atualizarItem(this.item);
      } else {
        await itensApi.adicionarItem(this.item);
      }
      this.itens = await itensApi.buscarTodosOsItens();
    },
    editar(item) {
      this.item = { ...item, cor: { ...item.cor } };
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
  <div class="form">
    <input type="text" v-model="item.nome" placeholder="Descrição" />
    <input type="text" v-model="item.quantidade" placeholder="Quantidade" />
    <input type="text" v-model="item.preco" placeholder="Preço" />
    <select v-model="item.categoria">
      <option
        v-for="categoria in categorias"
        :key="categoria.id"
        :value="categoria"
        :selected="categoria.id === item.categoria.id ? true : false"
      >
        {{ categoria.descricao }}
      </option>
    </select>
    <select v-model="item.cor">
      <option
        v-for="cor in cores"
        :key="cor.id"
        :value="cor"
        :selected="cor.id === item.cor.id ? true : false"
      >
        {{ cor.nome_cor }}
      </option>
    </select>
    <select v-model="item.marca">
      <option
        v-for="marca in marcas"
        :key="marca.id"
        :value="marca"
        :selected="marca.id === item.marca.id ? true : false"
      >
        {{ marca.nome_marca }}
      </option>
    </select>
    <select v-model="item.tamanho">
      <option
        v-for="tamanho in tamanhos"
        :key="tamanho.id"
        :value="tamanho"
        :selected="tamanho.id === item.tamanho.id ? true : false"
      >
        {{ tamanho.especificacao }}
      </option>
    </select>
    <button @click="salvar">Salvar</button>
  </div>
  <div class="item-card-container">
    <div class="item-card" v-for="item in itens" :key="item.id">
      <div class="item-card-content">
        <div class="item-card-text" @click="editar(item)">
          <img v-if="item.capa" :src="item.capa.file" alt="Imagem" />
          <span v-else>Sem Imagem</span>
        </div>
        <div class="item-card-text" @click="editar(item)">
          ID: ({{ item.id }}) - {{ item.nome }} - Cor: {{ item.cor.nome_cor }} -
          Categoria: {{ item.categoria.descricao }} - Marca:
          {{ item.marca.nome_marca }} - Tamanho:
          {{ item.tamanho.especificacao }} - Estoque: {{ item.quantidade }} -
          Preço: {{ item.preco }}
        </div>
      </div>
      <button class="item-card-button" @click="excluir(item)">X</button>
    </div>
  </div>
</template>
<style scoped>
.item-card-container {
  display: flex;
  flex-wrap: wrap;
}
.item-card {
  width: 17%;
  height: 350px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-weight: bold;
  background-color: #f5f5f5;
}
/* .item-card-content {
  justify-content: space-between;
} */
.item-card-text {
  cursor: pointer;
}
.item-card-button {
  font-weight: bold;
  background-color: black;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
