<script setup>
import { onMounted, ref } from "vue";
import ProdutosApi from "/src/services/produtos.js";
import CategoriasApi from "@/services/categorias";
import MarcasApi from "@/services/marcas";
import TamanhosApi from "@/services/tamanhos";
import CoresApi from "@/services/cores";
import imageService from "@/services/images.js";

const produtosApi = new ProdutosApi();
const categoriasApi = new CategoriasApi();
const marcasApi = new MarcasApi();
const tamanhosApi = new TamanhosApi();
const coresApi = new CoresApi();

const produtos = ref([]);
const file = ref(null);
const coverUrl = ref("");
const produto = ref({
  nome: "",
  preco: "",
  quantidade: "",
  cor: {},
  categoria: {
    descricao: "",
    capa_categoria: null,
  },
  marca: {
    nome_marca: "",
    logo_marca: null,
  },
  tamanhos: [],
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

function onFileChange(e) {
  file.value = e.target.files[0];
  coverUrl.value = URL.createObjectURL(file.value);
}

async function salvar() {
  if (file.value) {
    const image = await imageService.adicionarImagem(file.value);
    produto.value.capa_attachment_key = image.attachment_key;
  }
  produto.value.cor = produto.value.cor.id;
  produto.value.marca = produto.value.marca.id;
  produto.value.categoria = produto.value.categoria.id;

  let tamanhosSelecionados = [];
  if (produto.value.tamanhos && produto.value.tamanhos.length > 0) {
    tamanhosSelecionados = produto.value.tamanhos.map((tamanhoId) => {
      return { id: tamanhoId };
    });
  }

  produto.value.tamanhos = tamanhosSelecionados;

  if (produto.value.id) {
    await produtosApi.atualizarProduto(produto.value);
  } else {
    await produtosApi.adicionarProduto(produto.value);
  }
  produto.value = {
    cor: "",
    marca: "",
    categoria: "",
    tamanhos: [],
    capa: null,
  };
  produtos.value = await produtosApi.buscarTodosOsProdutos();
  coverUrl.value = null;
  file.value = null;
}

function editar(editproduto) {
  produto.value = { ...editproduto };
  produto.value.tamanhos = editproduto.tamanhos.map((tamanho) => tamanho.id);
  if (tamanhos.value) {
    tamanhos.value.forEach((tamanho) => {
      tamanho.isChecked = produto.value.tamanhos.includes(tamanho.id);
    });
  }
}

async function limpar() {
  produto.value = {
    nome: "",
    preco: "",
    quantidade: "",
    cor: {},
    categoria: {
      descricao: "",
      capa_categoria: null,
    },
    marca: {
      nome_marca: "",
      logo_marca: null,
    },
    tamanhos: [], // Limpar a lista de tamanhos
    capa: null,
  };
  coverUrl.value = null;
  file.value = null;
}

async function excluir(produto) {
  await produtosApi.excluirProduto(produto.id);
  produtos.value = await produtosApi.buscarTodosOsProdutos();
}

function handleTamanhoChange(tamanhoId) {
  if (!produto.value.tamanhos) {
    produto.value.tamanhos = [];
  }

  const index = produto.value.tamanhos.findIndex((id) => id === tamanhoId);
  if (index > -1) {
    produto.value.tamanhos.splice(index, 1);
  } else {
    produto.value.tamanhos.push(tamanhoId);
  }
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
          return-object
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
          return-object
        >
          {{ marca.nome_marca }}
        </option>
      </select>
    </div>
    <div class="tamanho">
      <label>Tamanhos:</label>
      <div class="checkbox-grid">
        <div
          v-for="tamanho in tamanhos"
          :key="tamanho.id"
          class="checkbox-item"
        >
          <input
            class="checkbox"
            type="checkbox"
            :id="`tamanho_${tamanho.id}`"
            :value="tamanho.id"
            :checked="tamanho.isChecked"
            @change="handleTamanhoChange(tamanho.id)"
          />
          <label class="checkbox-label" :for="`tamanho_${tamanho.id}`">{{
            tamanho.especificacao
          }}</label>
        </div>
      </div>
    </div>
    <div class="capa">
      <div class="cover">
        <div class="capa_label">
          <label for="Capa">Capa do produto:</label>
          <label class="label_img" for="Capa">Selecionar Imagem</label>
        </div>
        <img v-if="coverUrl" class="capa_previa" :src="coverUrl" />
      </div>
      <input id="Capa" type="file" accept="image/*" @change="onFileChange" />
    </div>
    <button class="salvar" @click="salvar">Salvar</button>
    <button class="limpar" @click="limpar">Limpar</button>
  </div>
  <div class="produto-card-container">
    <div class="produto-card" v-for="produto in produtos" :key="produto.id">
      <div class="produto-card-content">
        <img class="img" v-if="produto.capa" :src="produto.capa.file" />
        <div v-else class="sem-imagem">Produto Sem Imagem</div>
        <br />
        ID: ({{ produto.id }})
        <br />
        Descrição: {{ produto.nome }}
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
  font-size: 17px;
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
  width: 176px;
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
.tamanho {
  width: 170px;
}
.checkbox-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
}

.checkbox-item {
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 30px;
  margin-bottom: 5px;
  align-items: center;
}
.checkbox {
  width: 15px;
  height: 15px;
}
.checkbox-label {
  margin-top: 2px;
}
.checkbox-label:hover {
  color: #0f75ff;
  font-weight: bold;
}

.descricao,
.estoque,
.preco,
.categoria,
.cor,
.marca,
.tamanho,
.capa_label {
  display: flex;
  flex-direction: column;
  margin: 0 7px;
}
.capa_previa {
  height: 40px;
  width: 40px;
  margin-top: 25px;
  border-radius: 10px;
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
.salvar,
.limpar {
  background-color: rgba(255, 255, 255, 0.8);
  margin-top: 26px;
  height: 40px;
}
input[type="file"] {
  display: none;
}
.label_img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 170px;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  transition: 0.6s;
}

.label_img:hover {
  background-color: #f1ebf7;
}
.capa_label {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cover {
  display: flex;
  flex-direction: row;
}
</style>
