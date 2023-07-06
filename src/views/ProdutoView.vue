<script setup>
import { onMounted, ref } from "vue";

import ProdutosApi from "/src/api/produtos.js";
import CategoriasApi from "@/api/categorias";
import MarcasApi from "@/api/marcas";
import TamanhosApi from "@/api/tamanhos";
import CoresApi from "@/api/cores";
import router from "../router";

const produtosApi = new ProdutosApi();
const categoriasApi = new CategoriasApi();
const marcasApi = new MarcasApi();
const tamanhosApi = new TamanhosApi();
const coresApi = new CoresApi();

const produtos = ref([]);
const produto = ref({
  nome: "",
  preco: "",
  quantidade: "",
  cor: {},
  marca: {},
  categoria: {},
  tamanho: {},
});
const marcas = ref([]);
const cores = ref([]);
const tamanhos = ref([]);
const categorias = ref([]);

onMounted(async () => {
  produtos.value = await produtosApi.buscarTodosOsProdutos();
  marcas.value = await marcasApi.buscarTodasAsMarcas();
  cores.value = await coresApi.buscarTodasAsCores();
  tamanhos.value = await tamanhosApi.buscarTodosOsTamanhos();
  categorias.value = await categoriasApi.buscarTodasAsCategorias();
});

async function salvar() {
  produto.value.cor = produto.value.cor.id;
  produto.value.marca = produto.value.marca.id;
  produto.value.categoria = produto.value.categoria.id;
  produto.value.tamanho = produto.value.tamanho.id;
  if (produto.value.id) {
    await produtosApi.atualizarProduto(produto.value);
  } else {
    await produtosApi.adicionarProduto(produto.value);
  }
  produto.value = {
    cor: "",
    marca: "",
    categoria: "",
    tamanho: "",
  };
  produtos.value = await produtosApi.buscarTodosOsProdutos();
}

function editar(editproduto) {
  produto.value = { ...editproduto };
}

async function excluir(produto) {
  await produtosApi.excluirProduto(produto.id);
  produtos.value = await produtosApi.buscarTodosOsProdutos();
}

function abrir(id) {
  router.push(`produtos/${id}`);
}
</script>

<template>
  <div class="form">
    <div class="descricao">
      <label for="Descricao">Descrição: </label>
      <input id="Descricao" type="text" v-model="produto.nome" />
    </div>
    <div class="estoque">
      <label for="Estoque">Estoque: </label>
      <input id="Estoque" type="text" v-model="produto.quantidade" />
    </div>
    <div class="preco">
      <label for="Preco">Preço: </label>
      <input id="Preco" type="text" v-model="produto.preco" />
    </div>
    <div class="categoria">
      <label for="Categoria">Categorias: </label>
      <select id="Categoria" v-model="produto.categoria">
        <option
          v-for="categoria in categorias"
          :key="categoria.id"
          :value="categoria"
          :selected="categoria.id === produto.categoria.id ? true : false"
        >
          {{ categoria.descricao }}
        </option>
      </select>
    </div>
    <div class="cor">
      <label for="Cor">Cores: </label>
      <select id="Cor" v-model="produto.cor">
        <option
          v-for="cor in cores"
          :key="cor.id"
          :value="cor"
          :selected="cor.id === produto.cor.id ? true : false"
        >
          {{ cor.nome_cor }}
        </option>
      </select>
    </div>
    <div class="marca">
      <label for="Marca">Marcas: </label>
      <select id="Marca" v-model="produto.marca">
        <option
          v-for="marca in marcas"
          :key="marca.id"
          :value="marca"
          :selected="marca.id === produto.marca.id ? true : false"
        >
          {{ marca.nome_marca }}
        </option>
      </select>
    </div>
    <div class="tamanho">
      <label for="Tamanho">Tamanhos: </label>
      <select id="Tamanho" v-model="produto.tamanho">
        <option
          v-for="tamanho in tamanhos"
          :key="tamanho.id"
          :value="tamanho"
          :selected="tamanho.id === produto.tamanho.id ? true : false"
        >
          {{ tamanho.especificacao }}
        </option>
      </select>
    </div>
    <div class="header-botao">
      <button class="botao" @click="salvar">Salvar</button>
    </div>
  </div>
  <div class="produto-card-container">
    <div class="produto-card" v-for="produto in produtos" :key="produto.id">
      <div class="produto-card-content" @click="abrir(produto.id)">
        <img v-if="produto.capa" :src="produto.capa.file" />
        <div v-else class="sem-imagem">Produto Sem Imagem</div>
        <br />
        ID: ({{ produto.id }})
        <br />
        Cor: {{ produto.cor.nome_cor }}
        <br />
        Categoria: {{ produto.categoria.descricao }}
        <br />
        Marca: {{ produto.marca.nome_marca }}
        <br />
        Tamanho: {{ produto.tamanho.especificacao }}
        <br />
        Estoque: {{ produto.quantidade }}
        <br />
        Preço: {{ produto.preco }}
      </div>
      <div class="botao-espaco">
        <button @click="editar(produto)">Editar</button>
        <button class="produto-card-button" @click="excluir(produto)">X</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.produto-card-content {
  cursor: pointer;
}
.produto-card-container {
  display: flex;
  flex-wrap: wrap;
}
.produto-card {
  width: 20%;
  max-height: 530px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-weight: bold;
  background-color: #f5f5f5;
}
.produto-card-text {
  cursor: pointer;
}
.produto-card-button {
  font-weight: bold;
  background-color: black;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 7px 10px;
  cursor: pointer;
}
.botao-espaco {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
</style>
