<script setup>
import { onMounted, ref } from "vue";
import CategoriasApi from "@/services/categorias";
const categoriasApi = new CategoriasApi();
import imageService from "@/services/images.js";

const categorias = ref([]);
const file = ref(null);
const coverUrl = ref("");
const categoria = ref({
  descricao: "",
  capa_categoria: {
    attachment_key: "",
    public_id: "",
    file: "http://191.52.55.168:19003/media/images/af7c6d40-e1f7-495e-9603-f594614802d5.png",
    description: "",
    uploaded_on: "",
  },
});
onMounted(async () => {
  categorias.value = await categoriasApi.buscarTodasAsCategorias();
});
function onFileChange(e) {
  file.value = e.target.files[0];
  coverUrl.value = URL.createObjectURL(file.value);
}
async function salvar() {
  if (file.value) {
    const image = await imageService.adicionarImagem(file.value);
    categoria.value.capa_attachment_key = image.attachment_key;
  }
  if (categoria.value.id) {
    await categoriasApi.atualizarCategoria(categoria.value);
  } else {
    await categoriasApi.adicionarCategoria(categoria.value);
  }
  categoria.value = {
    descricao: "",
    capa_categoria: null,
  };
  categorias.value = await categoriasApi.buscarTodasAsCategorias();
  coverUrl.value = null;
  file.value = null;
}
function editar(editcategoria) {
  categoria.value = { ...editcategoria };
}
async function excluir(categoria) {
  await categoriasApi.excluirCategoria(categoria.id);
  categorias.value = await categoriasApi.buscarTodasAsCategorias();
}
</script>
<template>
  <div class="form">
    <div class="categoria">
      <label class="label_categoria" for="categoria">Categorias: </label>
      <input id="categoria" type="text" v-model="categoria.descricao" />
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
    <div class="header-botao">
      <button class="salvar" @click="salvar">Salvar</button>
    </div>
  </div>
  <div class="card-container">
    <div class="card" v-for="categoria in categorias" :key="categoria.id">
      <div class="card-content">
        <img class="img" v-if="categoria.capa" :src="categoria.capa.file" />
        ID: ({{ categoria.id }}) - {{ categoria.descricao }}
        <div class="botoes">
          <button class="edit" @click="editar(categoria)">Editar</button>
          <button class="del" @click="excluir(categoria)">X</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.form {
  display: flex;
  flex-wrap: wrap;
  margin: 25px 0;
  width: 100vw;
}
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
  width: 170px;
  height: 40px;
  margin-top: 0px;
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
.categoria {
  display: flex;
  flex-direction: column;
  margin: 0 7px;
}
.salvar {
  margin-top: 26px;
  height: 40px;
}
</style>
