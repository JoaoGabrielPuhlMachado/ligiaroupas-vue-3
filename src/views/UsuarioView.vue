<script setup>
import { onMounted, ref } from "vue";

import UsuariosApi from "/src/api/usuarios.js";

const usuariosApi = new UsuariosApi();
const props = defineProps({
  id: {
    required: true,
  },
});
const usuario = ref({
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  telefone: "",
  cpf: "",
  data_nascimento: "",
});

onMounted(async () => {
  usuario.value = await usuariosApi.buscarUsuarioPorId(props.id);
});

async function salvar() {
  if (usuario.value.id) {
    await usuariosApi.atualizarUsuario(usuario.value);
  } else {
    await usuariosApi.adicionarUsuario(usuario.value);
  }
}

function editar(editusuario) {
  usuario.value = { ...editusuario };
}

async function excluir(usuario) {
  await usuariosApi.excluirUsuario(usuario.id);
  usuario.value = await usuariosApi.buscarUsuarioPorId(props.id);
}
</script>
<template>
  <div class="form">
    <div class="descricao">
      <label for="Descricao">Descrição: {{ usuario.id }}</label>
    </div>
    <div class="estoque">
      <label for="Estoque">Estoque: </label>
    </div>
    <div class="preco">
      <label for="Preco">Preço: </label>
    </div>

    <div class="header-botao">
      <button class="botao" @click="salvar">Salvar</button>
    </div>
  </div>
  <div class="usuario-card-container">
    <div class="usuario-card">
      <div class="botao-espaco">
        <button @click="editar(usuario)">Editar</button>
        <button class="usuario-card-button" @click="excluir()">X</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.usuario-card-container {
  display: flex;
  flex-wrap: wrap;
}
.usuario-card {
  width: 20%;
  max-height: 530px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-weight: bold;
  background-color: #f5f5f5;
}
.usuario-card-text {
  cursor: pointer;
}
.usuario-card-button {
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
