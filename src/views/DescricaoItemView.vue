<script setup>
import { onMounted, ref } from "vue";
import ItensApi from "@/api/itens.js";
import CategoriasApi from "@/api/categorias.js";
import MarcasApi from "@/api/marcas.js";
import TamanhosApi from "@/api/tamanhos.js";
import CoresApi from "@/api/cores.js";

const itensApi = new ItensApi();
const categoriasApi = new CategoriasApi();
const marcasApi = new MarcasApi();
const tamanhosApi = new TamanhosApi();
const coresApi = new CoresApi();

const props = defineProps({
  id: {
    required: true,
  },
});

const item = ref({
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
const itens = ref([]);
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

  item.value = await itensApi.buscarItemPorId(props.id);
  cor.value = await coresApi.buscarCorPorId(item.value.cor);
  categoria.value = await categoriasApi.buscarCategoriaPorId(
    item.value.categoria
  );
  marca.value = await marcasApi.buscarMarcaPorId(item.value.marca);
  tamanho.value = await tamanhosApi.buscarTamanhoPorId(item.value.tamanho);
});
</script>

<template>
  <div class="desc-do-item">
    <div class="imagem-item-desc">
      <img v-if="item.capa" :src="item.capa.url" alt="" class="imagem-item" />
      <p v-else class="imagem-item sem-imagem">Produto Sem Imagem</p>
    </div>
    <div class="item-desc">
      <div class="desc-nome">
        <h1 class="item-nome centralizado">{{ item.nome }}</h1>
      </div>
      <div class="desc-partes">
        <h3 class="item-info">Preço Unitário: {{ item.preco }}</h3>
        <h3 class="item-info">Categoria: {{ categoria.descricao }}</h3>
        <h3 class="item-info">Marca: {{ marca.nome_marca }}</h3>
        <h3 class="item-info">Cor: {{ cor.nome_cor }}</h3>
      </div>
      <div class="desc-select">
        <div class="item-quantidade">
          <label for="Quantidade">Quantidade: </label>
          <input id="Quantidade" type="text" />
        </div>
        <div class="item-tamanho">
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
        <button class="botao-comprar">Adicionar ao Carrinho</button>
      </div>
    </div>
  </div>
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
.desc-do-item {
  margin: 2% 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.desc-nome {
  margin-top: 2%;
}
.imagem-item-desc {
  width: 45%;
  margin-right: 1%;
}
.imagem-item {
  border: 1px solid rgb(206, 206, 206);
  width: 100%;
  height: 780px;
}
.item-info {
  color: rgb(0, 0, 0);
  padding: 0 2%;
  display: inline-block;
}
.item-nome {
  color: rgb(0, 0, 0);
  padding: 0 2%;
  word-wrap: break-word;
}
.item-desc {
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
