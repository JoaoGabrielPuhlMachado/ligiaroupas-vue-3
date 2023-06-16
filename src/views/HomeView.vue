<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";
import router from "../router";
const authStore = useAuthStore();
const { isAdmin } = storeToRefs(authStore);

import ItensApi from "/src/api/itens.js";
const itensApi = new ItensApi();
const itens = ref([]);

onMounted(async () => {
  itens.value = await itensApi.buscarTodosOsItens();
});

function abrir(id) {
  router.push(`itens/${id}`);
}
</script>
<template>
  <p>Status do Admin: {{ isAdmin }}</p>
  <button @click="authStore.toggleAdmin">Alterar Status</button>
  <div class="imagem-background">
    <img class="imagem-ligia" src="@/imagens/loja-de-roupas-online2.jpg" />
  </div>
  <div class="item-card-container">
    <div class="item-card" v-for="item in itens" :key="item.id">
      <div class="item-card-content" @click="abrir(item.id)">
        <img v-if="item.capa" :src="item.capa.file" />
        <div v-else class="sem-imagem">Produto Sem Imagem</div>
        <div class="item-card-text">
          {{ item.nome }}
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
.item-card-text {
  display: flex;
  justify-content: center;
  font-size: 19px;
  height: 60px;
  align-items: center;
  margin: 15px;
}
.item-card-container {
  display: flex;
  flex-wrap: wrap;
}
.item-card {
  width: 18%;
  height: 430px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-weight: bold;
  background-color: #f5f5f5;
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
