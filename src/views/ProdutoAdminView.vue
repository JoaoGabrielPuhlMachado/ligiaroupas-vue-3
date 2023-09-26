<script setup>
import { onMounted, ref } from "vue";
import ProdutosApi from "/src/api/produtos.js";
import CategoriasApi from "@/api/categorias";
import MarcasApi from "@/api/marcas";
import TamanhosApi from "@/api/tamanhos";
import CoresApi from "@/api/cores";
import ImagensApi from "../api/imagens";

const produtosApi = new ProdutosApi();
const categoriasApi = new CategoriasApi();
const marcasApi = new MarcasApi();
const tamanhosApi = new TamanhosApi();
const coresApi = new CoresApi();
const imagensApi = new ImagensApi();

const produtos = ref([]);
const produto = ref({
  nome: "",
  preco: "",
  quantidade: "",
  cor: {},
  marca: {},
  categoria: {},
  tamanho: {},
  capa: null,
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
  if (produto.value.capa) {
    const urlImagemNoServidor = await imagensApi.adicionarImagem(
      produto.value.capa
    );
    produto.value.capa = {
      file: urlImagemNoServidor,
    };
  }
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
    capa: null,
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
function selecionarCapa(event) {
  const file = event.target.files[0];
  if (file) {
    produto.value.capa = URL.createObjectURL(file);
  } else {
    produto.value.capa = null;
  }
}
</script>

<template>
  <div class="form">
    <div class="capa">
      <label for="Capa">Foto de Capa: </label>
      <input
        class="capa2"
        id="Capa"
        type="file"
        accept="image/*"
        @change="selecionarCapa"
      />
      <div v-if="produto.capa">
        <img class="capa3" :src="produto.capa" />
      </div>
    </div>
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
      <button class="salvar" @click="salvar">Salvar</button>
    </div>
  </div>
  <div class="produto-card-container">
    <div class="produto-card" v-for="produto in produtos" :key="produto.id">
      <div class="produto-card-content">
        <img class="img" v-if="produto.capa" :src="produto.capa.file" />
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
        <button class="produto-card-button edit" @click="editar(produto)">
          Editar
        </button>
        <button class="produto-card-button del" @click="excluir(produto)">
          Excluir Produto
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.form {
  display: flex;
  flex-wrap: wrap;
  margin: 25px 0;
  width: 100vw;
}
label {
  font-size: 18px;
  cursor: pointer;
  text-align: center;
  margin-bottom: 5px;
  width: 90%;
}
input {
  width: 170px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  margin: 0;
}
select {
  width: 170px;
  height: 42px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  margin: 0;
}
button {
  margin: 0 5px;
  width: 130px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #f1ebf7;
  font-weight: bolder;
  cursor: pointer;
}
.descricao,
.estoque,
.preco,
.categoria,
.cor,
.marca,
.tamanho,
.capa {
  display: flex;
  flex-direction: column;
  margin: 0 6px;
}
.capa2 {
  padding: 5px;
  height: 30px;
  width: 130px;
}
.capa3 {
  height: 50px;
  width: 50px;
}
.produto-card-container {
  display: flex;
  flex-wrap: wrap;
}
.produto-card {
  width: 310px;
  min-height: 550px;
  margin: 10px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  font-weight: bold;
}
.botao-espaco {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.salvar {
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 26px;
  height: 42px;
}
.salvar:hover {
  background-color: #f1ebf7;
}
</style>
