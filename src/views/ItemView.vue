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
    // selecionarImagem(event) {
    //   this.item.imagem = event.target.files[0];
    // },
    // async inserirImagem() {
    //   const formData = new FormData();
    //   formData.append("imagem", this.item.imagem);
    //   try {
    //     const response = await axios.post(
    //       "http://joaosttirlley.pythonanywhere.com/",
    //       formData,
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       }
    //     );
    //     this.item.imagemUrl = response.data.url;
    //     this.item.imagem = {};
    //   } catch (error) {
    //     console.error("Erro ao inserir imagem:", error);
    //   }
    // },

    verificar(cor) {
      return cor.id === this.item.cor.id;
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
    <select v-model="item.categoria">
      <option
        v-for="categoria in categorias"
        :key="categoria.id"
        :value="categoria.id"
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
      <option v-for="marca in marcas" :key="marca.id" :value="marca" :selected="marca.id === item.marca.id ? true : false">
        {{ marca.nome_marca }}
      </option>
    </select>
    <select v-model="item.tamanho">
      <option v-for="tamanho in tamanhos" :key="tamanho.id" :value="tamanho.id">
        {{ tamanho.especificacao }}
      </option>
    </select>
    <!-- <input type="file" @change="selecionarImagem" />
    <button @click="inserirImagem">Inserir Imagem</button> -->
    <button @click="salvar">Salvar</button>
  </div>
  <hr />
  <ul>
    <li v-for="item in itens" :key="item.id">
      <span @click="editar(item)">
        ({{ item.id }}) - {{ item.nome }} - Cor: {{ item.cor.nome_cor }} -
        Categoria: {{ item.categoria.descricao }} - Marca:
        {{ item.marca.nome_marca }} - Tamanho:
        {{ item.tamanho.especificacao }} - Estoque: {{ item.quantidade }} -
        Preço: {{ item.preco }} <img v-if="item.capa" :src="item.capa.file" />
      </span>
      <button @click="excluir(item)">X</button>
    </li>
  </ul>
</template>

<style></style>
