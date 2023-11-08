<script setup>
import { onMounted, ref } from "vue";
import CoresApi from "@/services/cores";
const coresApi = new CoresApi();

const cores = ref([]);
const cor = ref({
  nome_cor: "",
});
onMounted(async () => {
  cores.value = await coresApi.buscarTodasAsCores();
});
async function salvar() {
  if (cor.value.id) {
    await coresApi.atualizarCor(cor.value);
  } else {
    await coresApi.adicionarCor(cor.value);
  }
  cor.value = {
    nome_cor: "",
  };
  cores.value = await coresApi.buscarTodasAsCores();
}
function editar(editcor) {
  cor.value = { ...editcor };
}
async function limpar() {
  cor.value = {
    nome_cor: "",
  };
}
async function excluir(cor) {
  await coresApi.excluirCor(cor.id);
  cores.value = await coresApi.buscarTodasAsCores();
}
</script>
<template>
  <div class="form">
    <div class="cor">
      <label for="cor">Cores: </label>
      <input id="cor" type="text" v-model="cor.nome_cor" />
    </div>
    <button class="salvar" @click="salvar">Salvar</button>
    <button class="limpar" @click="limpar">Limpar</button>
  </div>
  <div class="card-container">
    <div class="card" v-for="cor in cores" :key="cor.id">
      <div class="card-content">
        ID: ({{ cor.id }}) - {{ cor.nome_cor }}
        <div class="botoes">
          <button class="edit" @click="editar(cor)">Editar</button>
          <button class="del" @click="excluir(cor)">X</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.capa_previa {
  height: 40px;
  width: 40px;
  margin-top: 25px;
  border-radius: 10px;
}
input[type="file"] {
  display: none;
}

.capa_label {
  display: flex;
  flex-direction: column;
  margin: 0 7px;
}
label {
  cursor: pointer;
}
.cover {
  display: flex;
  flex-direction: row;
}
.cor {
  display: flex;
  flex-direction: column;
  margin: 0 7px;
}
</style>
