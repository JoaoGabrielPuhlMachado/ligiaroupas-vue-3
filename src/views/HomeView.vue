<script setup>
import { onMounted, ref } from "vue";
import router from "../router";

import ProdutosApi from "/src/api/produtos.js";
const produtosApi = new ProdutosApi();
const produtos = ref([]);

onMounted(async () => {
  produtos.value = await produtosApi.buscarTodosOsProdutos();
});

function abrir(id) {
  router.push(`produtos/${id}`);
}
</script>
<template>
  <div class="imagem-background">
    <img class="imagem-ligia" src="@/imagens/loja-de-roupas-online2.jpg" />
  </div>
  <div class="produto-card-container">
    <div class="produto-card" v-for="produto in produtos" :key="produto.id">
      <div class="produto-card-content" @click="abrir(produto.id)">
        <img v-if="produto.capa" :src="produto.capa.file" />
        <div v-else class="sem-imagem">Produto Sem Imagem</div>
        <div class="produto-card-text">
          {{ produto.nome }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.imagem-ligia {
  width: 95%;
  height: 500px;
}
.imagem-background {
  margin: 20px 0;
}
.produto-card-text {
  display: flex;
  justify-content: center;
  font-size: 19px;
  height: 60px;
  align-items: center;
  margin: 15px;
}
.produto-card-container {
  display: flex;
  flex-wrap: wrap;
}
.produto-card {
  width: 18%;
  height: 430px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-weight: bold;
  background-color: #f5f5f5;
}
.produto-card-content {
  cursor: pointer;
}
img {
  width: 100%;
  height: 350px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-left: auto;
  margin-right: auto;
}
</style>
