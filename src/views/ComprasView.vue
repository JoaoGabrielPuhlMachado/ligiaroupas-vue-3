<script setup>
import { onMounted, ref } from "vue";
import ProdutosApi from "@/api/produtos.js";
import CategoriasApi from "@/api/categorias.js";
import MarcasApi from "@/api/marcas.js";
import TamanhosApi from "@/api/tamanhos.js";
import CoresApi from "@/api/cores.js";

const produtosApi = new ProdutosApi();
const categoriasApi = new CategoriasApi();
const marcasApi = new MarcasApi();
const tamanhosApi = new TamanhosApi();
const coresApi = new CoresApi();

const props = defineProps({
  id: {
    required: true,
  },
});

const produto = ref({
  nome: "",
  preco: "",
  quantidade: "",
});
const marca = ref({
  nome_marca: "",
});
const cor = ref({
  nome_cor: "",
});
const tamanho = ref({
  especificacao: "",
});
const categoria = ref({
  descricao: "",
});
const produtos = ref([]);
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

  produto.value = await produtosApi.buscarProdutoPorId(props.id);
  cor.value = await coresApi.buscarCorPorId(produto.value.cor);
  categoria.value = await categoriasApi.buscarCategoriaPorId(
    produto.value.categoria
  );
  marca.value = await marcasApi.buscarMarcaPorId(produto.value.marca);
  tamanho.value = await tamanhosApi.buscarTamanhoPorId(produto.value.tamanho);
});
</script>

<template>
  <!-- 
  <div class="desc-do-produto">
    <div class="imagem-produto-desc">
      <img
        v-if="produto.capa"
        :src="produto.capa.url"
        alt=""
        class="imagem-produto"
      />
      <p v-else class="imagem-produto sem-imagem">Produto Sem Imagem</p>
    </div>
    <div class="produto-desc">
      <div class="desc-nome">
        <h1 class="produto-nome centralizado">{{ produto.nome }}</h1>
      </div>
      <div class="desc-partes">
        <h3 class="produto-info">Preço Unitário: {{ produto.preco }}</h3>
        <h3 class="produto-info">Categoria: {{ categoria.descricao }}</h3>
        <h3 class="produto-info">Marca: {{ marca.nome_marca }}</h3>
        <h3 class="produto-info">Cor: {{ cor.nome_cor }}</h3>
      </div>
      <div class="desc-select">
        <div class="produto-quantidade">
          <label for="Quantidade">Quantidade: </label>
          <input id="Quantidade" type="text" />
        </div>
        <div class="produto-tamanho">
          <label for="Tamanho">Tamanhos: </label>
          <select id="Tamanho" v-model="produto.tamanho">
            <option
              v-for="tamanho in tamanhos"
              :key="tamanho.id"
              :value="tamanho"
              :selected="tamanho.id === produto.tamanho ? true : false"
            >
              {{ tamanho.especificacao }}
            </option>s
          </select>
        </div>
        <button class="botao-comprar">Adicionar ao Carrinho</button>
      </div>
    </div>
  </div> -->
  <h1>BEM VINDO AO CARRINHO</h1>
</template>

<style scoped>
input,
select,
label {
  margin: 0 30px;
  display: flex;
  width: 100px;
}
.botao-comprar {
  width: 150px;
  margin: 0 30px;
}
.desc-select {
  height: 100%;
  align-items: flex-end;
  display: flex;
  justify-content: center;
}
.desc-do-produto {
  margin: 2% 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.desc-nome {
  margin-top: 2%;
}
.imagem-produto-desc {
  width: 45%;
  margin-right: 1%;
}
.imagem-produto {
  border: 1px solid rgb(206, 206, 206);
  width: 100%;
  height: 780px;
}
.produto-info {
  color: rgb(0, 0, 0);
  padding: 0 2%;
  display: inline-block;
}
.produto-nome {
  color: rgb(0, 0, 0);
  padding: 0 2%;
  word-wrap: break-word;
}
.produto-desc {
  background-color: rgb(213, 228, 255);
  width: 40%;
  height: 660px;
  margin-left: 1%;
  border: 1px solid rgb(206, 206, 206);
  display: flex;
  flex-direction: column;
}
.centralizado {
  text-align: center;
}
</style>
