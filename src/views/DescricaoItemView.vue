<script setup>
import { onMounted, ref } from "vue";

import ItensApi from "/src/api/itens.js";
import CategoriasApi from "@/api/categorias";
import MarcasApi from "@/api/marcas";
import TamanhosApi from "@/api/tamanhos";
import CoresApi from "@/api/cores";
import router from "../router";

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

const props = defineProps({
  id: Number,
});

onMounted(async () => {
  console.log(props.id);
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
  item.value = {
    cor: "",
    marca: "",
    categoria: "",
    tamanho: "",
  };
  itens.value = await itensApi.buscarTodosOsItens();
  item.value = await itensApi.buscarItemPorId();
}
function abrir(id) {
  router.push(`itens/${id}`);
}
</script>
<template>
  <div class="item-card-container">
    <div
      class="item-card"
      v-for="item in itens"
      :key="item.id"
      @click="abrir(item.id)"
    >
      <div class="item-card-content">
        <img v-if="item.capa" :src="item.capa.file" />
        <div v-else class="sem-imagem">Produto Sem Imagem</div>
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
    </div>
  </div>
</template>
<style scoped></style>
