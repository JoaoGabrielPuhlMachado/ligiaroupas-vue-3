<script setup>
import { onMounted, ref } from "vue";
import ComprasApi from "/src/api/compras.js";

const comprasApi = new ComprasApi();

const compras = ref([]);
const compra = ref({
  status: "",
  usuario: "",
  itens: {
    produto: "",
    quantidade: "",
    total: "",
  },
  total: "",
});
const props = defineProps({
  id: {
    required: true,
    type: Number,
  },
});
onMounted(async () => {
  compra.value = await comprasApi.buscarTodasAsCompras();
  compra.value = await comprasApi.buscarCompraPorId(props.id);
});
async function salvar() {
  if (compra.value.id) {
    await comprasApi.atualizarCompra(compra.value);
  } else {
    await comprasApi.adicionarCompra(compra.value);
  }
  compra.value = {};
  compra.value = await comprasApi.buscarTodasAsCompras();
}
function editar(editcompra) {
  compra.value = { ...editcompra };
}
async function excluir(compra) {
  await comprasApi.excluirCompra(compra.id);
  compras.value = await comprasApi.buscarTodasAsCompras();
}
</script>

<template>
  <div class="form">
    <div class="header-botao">
      <button class="botao" @click="salvar">Salvar</button>
    </div>
  </div>
  <div class="compras-card-container">
    <div class="compras-card" v-for="compra in compras" :key="compra.id">
      <div class="compras-card-content">
        <br />
        ID: ({{ compra.status }})
        <br />
      </div>
      <div class="botao-espaco">
        <button class="compras-card-button cor-edit" @click="editar(compra)">
          Editar
        </button>
        <button class="compras-card-button cor-del" @click="excluir(compra)">
          X
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.capa2 {
  height: 28px;
  width: 200px;
}
.capa3 {
  height: 200px;
  width: 200px;
}
.compras-card-container {
  display: flex;
  flex-wrap: wrap;
}
.compras-card {
  width: 20%;
  max-height: 530px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-weight: bold;
  background-color: #f5f5f5;
}
.compras-card-text {
  cursor: pointer;
}
.compras-card-button {
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 7px 10px;
  cursor: pointer;
  color: white;
}
.cor-edit {
  background-color: black;
}
.cor-del {
  background-color: red;
}
.botao-espaco {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
</style>
