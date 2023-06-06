<script setup>
import { onMounted, ref } from "vue";

import ItensApi from "/src/api/itens.js";
import CategoriasApi from "@/api/categorias";
import MarcasApi from "@/api/marcas";
import TamanhosApi from "@/api/tamanhos";
import CoresApi from "@/api/cores";

const itensApi = new ItensApi();
const categoriasApi = new CategoriasApi();
const marcasApi = new MarcasApi();
const tamanhosApi = new TamanhosApi();
const coresApi = new CoresApi();

const itens = ref([]);
const item = ref({
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
  itens.value = await itensApi.buscarTodosOsItens();
  marcas.value = await marcasApi.buscarTodasAsMarcas();
  cores.value = await coresApi.buscarTodasAsCores();
  tamanhos.value = await tamanhosApi.buscarTodosOsTamanhos();
  categorias.value = await categoriasApi.buscarTodasAsCategorias();
});

async function salvar() {
  item.value.cor = item.value.cor.id;
  item.value.marca = item.value.marca.id;
  item.value.categoria = item.value.categoria.id;
  item.value.tamanho = item.value.tamanho.id;
  if (item.value.id) {
    await itensApi.atualizarItem(item.value);
  } else {
    await itensApi.adicionarItem(item.value);
  }
  item.value = {
    cor: "",
    marca: "",
    categoria: "",
    tamanho: "",
  };
  itens.value = await itensApi.buscarTodosOsItens();
}

function editar(editItem) {
  item.value = { ...editItem };
}

async function excluir(item) {
  await itensApi.excluirItem(item.id);
  itens.value = await itensApi.buscarTodosOsItens();
}
</script>

<template>
  <div class="form">
    <div class="descricao">
      <label for="Descricao">Descrição: </label>
      <input id="Descricao" type="text" v-model="item.nome" />
    </div>
    <div class="estoque">
      <label for="Estoque">Estoque: </label>
      <input id="Estoque" type="text" v-model="item.quantidade" />
    </div>
    <div class="preco">
      <label for="Preco">Preço: </label>
      <input id="Preco" type="text" v-model="item.preco" />
    </div>
    <div class="categoria">
      <label for="Categoria">Categorias: </label>
      <select id="Categoria" v-model="item.categoria">
        <option
          v-for="categoria in categorias"
          :key="categoria.id"
          :value="categoria"
          :selected="categoria.id === item.categoria.id ? true : false"
        >
          {{ categoria.descricao }}
        </option>
      </select>
    </div>
    <div class="cor">
      <label for="Cor">Cores: </label>
      <select id="Cor" v-model="item.cor">
        <option
          v-for="cor in cores"
          :key="cor.id"
          :value="cor"
          :selected="cor.id === item.cor.id ? true : false"
        >
          {{ cor.nome_cor }}
        </option>
      </select>
    </div>
    <div class="marca">
      <label for="Marca">Marcas: </label>
      <select id="Marca" v-model="item.marca">
        <option
          v-for="marca in marcas"
          :key="marca.id"
          :value="marca"
          :selected="marca.id === item.marca.id ? true : false"
        >
          {{ marca.nome_marca }}
        </option>
      </select>
    </div>
    <div class="tamanho">
      <label for="Tamanho">Tamanhos: </label>
      <select id="Tamanho" v-model="item.tamanho">
        <option
          v-for="tamanho in tamanhos"
          :key="tamanho.id"
          :value="tamanho"
          :selected="tamanho.id === item.tamanho.id ? true : false"
        >
          {{ tamanho.especificacao }}
        </option>
      </select>
    </div>
    <div class="header-botao">
      <button class="botao" @click="salvar">Salvar</button>
    </div>
  </div>
  <div class="item-card-container">
    <div class="item-card" v-for="item in itens" :key="item.id">
      <div class="item-card-content">
        <img v-if="item.capa" :src="item.capa.file" />
        <div v-else class="sem-imagem">Produto Sem Imagem</div>
        <br />
        ID: ({{ item.id }})
        <br />
        Cor: {{ item.cor.nome_cor }}
        <br />
        Categoria: {{ item.categoria.descricao }}
        <br />
        Marca: {{ item.marca.nome_marca }}
        <br />
        Tamanho: {{ item.tamanho.especificacao }}
        <br />
        Estoque: {{ item.quantidade }}
        <br />
        Preço: {{ item.preco }}
      </div>
      <div class="botao-espaco">
        <button @click="editar(item)">Editar</button>
        <button class="item-card-button" @click="excluir(item)">X</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.item-card-container {
  display: flex;
  flex-wrap: wrap;
}
.item-card {
  width: 20%;
  max-height: 530px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-weight: bold;
  background-color: #f5f5f5;
}
.item-card-text {
  cursor: pointer;
}
.item-card-button {
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
