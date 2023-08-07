<script setup>
import { onMounted, ref } from "vue";
import ComprasApi from "@/api/compras";
const comprasApi = new ComprasApi();

const compra = ref({
  id: "",
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
  },
});
onMounted(async () => {
  compras.value = await comprasApi.buscarCompraPorId(props.id);
});
async function salvar() {
  if (compra.value.id) {
    await comprasApi.atualizarCompra(compra.value);
  } else {
    await comprasApi.adicionarCompra(compra.value);
  }
  compra.value = {
    status: "",
    usuario: "",
    itens: {},
    total: "",
  };
  compras.value = await comprasApi.buscarCompraPorId(props.id);
}
function editar(editcompra) {
  compra.value = { ...editcompra };
}
async function excluir(compra) {
  await comprasApi.excluirCompra(compra.id);
  compras.value = await comprasApi.buscarCompraPorId(props.id);
}
</script>
<template>
  <div class="form">
    <div class="header-botao">
      <button class="botao" @click="salvar">Salvar</button>
    </div>
  </div>
  <div class="compra-card-container">
    <div class="compra-card" v-for="compra in compras" :key="compra.id">
      <div class="compra-card-content">
        ID: ({{ compra.id }}) Status: {{ compra.status }}
      </div>
      <div class="botao-espaco">
        <button class="compra-card-button cor-edit" @click="editar(compra)">
          Editar
        </button>
        <button class="compra-card-button cor-del" @click="excluir(compra)">
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

.compra-card-container {
  display: flex;
  flex-wrap: wrap;
}

.compra-card {
  width: 20%;
  max-height: 530px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-weight: bold;
  background-color: #f5f5f5;
}

.compra-card-text {
  cursor: pointer;
}

.compra-card-button {
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
