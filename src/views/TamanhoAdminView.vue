<script setup>
import { onMounted, ref } from "vue";
import TamanhosApi from "@/services/tamanhos";
const tamanhosApi = new TamanhosApi();

const tamanhos = ref([]);
const tamanho = ref({
  especificacao: "",
});
onMounted(async () => {
  tamanhos.value = await tamanhosApi.buscarTodosOsTamanhos();
});
async function salvar() {
  if (tamanho.value.id) {
    await tamanhosApi.atualizarTamanho(tamanho.value);
  } else {
    await tamanhosApi.adicionarTamanho(tamanho.value);
  }
  tamanho.value = {
    especificacao: "",
  };
  tamanhos.value = await tamanhosApi.buscarTodosOsTamanhos();
}
function editar(edittamanho) {
  tamanho.value = { ...edittamanho };
}
async function limpar() {
  tamanho.value = {
    especificacao: "",
  };
}
async function excluir(tamanho) {
  await tamanhosApi.excluirTamanho(tamanho.id);
  tamanhos.value = await tamanhosApi.buscarTodosOsTamanhos();
}
</script>
<template>
  <div class="form">
    <div class="tamanho">
      <label for="tamanho">Tamanhos: </label>
      <input id="tamanho" type="text" v-model="tamanho.especificacao" />
    </div>
    <button class="salvar" @click="salvar">Salvar</button>
    <button class="limpar" @click="limpar">Limpar</button>
  </div>
  <div class="card-container">
    <div class="card" v-for="tamanho in tamanhos" :key="tamanho.id">
      <div class="card-content">
        ID: ({{ tamanho.id }}) - {{ tamanho.especificacao }}
        <div class="botoes">
          <button class="edit" @click="editar(tamanho)">Editar</button>
          <button class="del" @click="excluir(tamanho)">X</button>
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
.cor_label {
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
.cor_label:hover {
  background-color: #f1ebf7;
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
.tamanho {
  display: flex;
  flex-direction: column;
  margin: 0 7px;
}
</style>
