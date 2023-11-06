<script setup>
import { onMounted, ref } from "vue";
import MarcasApi from "@/services/marcas";
const marcasApi = new MarcasApi();
import imageService from "@/services/images.js";

const marcas = ref([]);
const file = ref(null);
const coverUrl = ref("");
const marca = ref({
  nome_marca: "",
  logo_marca: null,
});
onMounted(async () => {
  marcas.value = await marcasApi.buscarTodasAsMarcas();
});
function onFileChange(e) {
  file.value = e.target.files[0];
  coverUrl.value = URL.createObjectURL(file.value);
}
async function salvar() {
  if (file.value) {
    const image = await imageService.adicionarImagem(file.value);
    marca.value.capa_attachment_key = image.attachment_key;
  }
  if (marca.value.id) {
    await marcasApi.atualizarMarca(marca.value);
  } else {
    await marcasApi.adicionarMarca(marca.value);
  }
  marca.value = {
    nome_marca: "",
    logo_marca: null,
  };
  marcas.value = await marcasApi.buscarTodasAsMarcas();
  coverUrl.value = null;
  file.value = null;
}
function editar(editmarca) {
  marca.value = { ...editmarca };
}
async function limpar() {
  marca.value = {
    nome_marca: "",
    logo_marca: {
      attachment_key: "",
      public_id: "",
      file: "",
      description: "",
      uploaded_on: "",
    },
  };
  coverUrl.value = null;
  file.value = null;
}
async function excluir(marca) {
  await marcasApi.excluirCategoria(marca.id);
  marcas.value = await marcasApi.buscarTodasAsMarcas();
}
</script>
<template>
  <div class="form">
    <div class="marca">
      <label class="label_marca" for="marca">Marcas: </label>
      <input id="marca" type="text" v-model="marca.nome_marca" />
    </div>
    <div class="capa">
      <div class="cover">
        <div class="capa_label">
          <label for="Capa">Capa: </label>
          <label class="cor_label" for="Capa">Selecionar Imagem</label>
        </div>
        <img v-if="coverUrl" class="capa_previa" :src="coverUrl" />
      </div>
      <input id="Capa" type="file" accept="image/*" @change="onFileChange" />
    </div>
    <button class="salvar" @click="salvar">Salvar</button>
    <button class="limpar" @click="limpar">Limpar</button>
  </div>
  <div class="card-container">
    <div class="card" v-for="marca in marcas" :key="marca.id">
      <div class="card-content">
        <img
          class="marca_img"
          v-if="marca.logo_marca"
          :src="marca.logo_marca.url"
        />
        ID: ({{ marca.id }}) - {{ marca.nome_marca }}
        <div class="botoes">
          <button class="edit" @click="editar(marca)">Editar</button>
          <button class="del" @click="excluir(marca)">X</button>
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
.marca {
  display: flex;
  flex-direction: column;
  margin: 0 7px;
}
.marca_img {
  height: 50px;
  width: 40px;
}
</style>
