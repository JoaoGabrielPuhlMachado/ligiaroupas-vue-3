<script setup>
import { onMounted, ref, defineProps } from "vue";
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

onMounted(async () => {
  item.value = await itensApi.buscarItemPorId(props.id);
  marca.value = await marcasApi.buscarMarcaPorId(props.id);
  cor.value = await coresApi.buscarCorPorId(props.id);
  tamanho.value = await tamanhosApi.buscarTamanhoPorId(props.id);
  categoria.value = await categoriasApi.buscarCategoriaPorId(props.id);
});
</script>

<template>
  <div class="item-card-container">
    <div class="item-card">
      <div class="item-card-content">
        <img v-if="item.capa" :src="item.capa.file" />
        <div v-else class="sem-imagem">Produto Sem Imagem</div>
        <br />
        Cor: {{ cor.nome_cor }}
        <br />
        Categoria: {{ categoria.descricao }}
        <br />
        Marca: {{ marca.nome_marca }}
        <br />
        Tamanho: {{ tamanho.especificacao }}
        <br />
        Estoque: {{ item.quantidade }}
        <br />
        Preço: {{ item.preco }}
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
