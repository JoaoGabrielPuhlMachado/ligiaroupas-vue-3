<script setup>
import { onMounted, ref } from "vue";
import router from "../router";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
import UsuariosApi from "@/services/usuarios";
const usuariosApi = new UsuariosApi();
import imageService from "@/services/images.js";

const Logout = () => {
  authStore.LogOut();
  window.alert("Usuário encerrou sessão com sucesso!");
  router.push("/");
};
const file = ref(null);
const coverUrl = ref("");
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
  foto: "",
});

onMounted(async () => {
  usuario.value = await usuariosApi.buscarUsuarioPorId(props.id);
});
function onFileChange(e) {
  file.value = e.target.files[0];
  coverUrl.value = URL.createObjectURL(file.value);
}
async function salvar() {
  if (file.value) {
    const image = await imageService.adicionarImagem(file.value);
    usuario.value.foto_attachment_key = image.attachment_key;
  }
  if (usuario.value.id) {
    await usuariosApi.atualizarUsuario(usuario.value);
    window.alert("Usuário atualizado com sucesso!");
    router.push("/");
  } else {
    await usuariosApi.adicionarUsuario(usuario.value);
  }
}

async function excluir(usuario) {
  const confirmado = window.confirm(
    "Tem certeza que deseja excluir a conta? Ela será excluída permanentemente!"
  );
  if (confirmado) {
    await usuariosApi.excluirUsuario(usuario.id);
    window.alert("Sua conta foi excluída com sucesso!");
    Logout();
  }
}
</script>
<template>
  <div class="form-centralizado">
    <div class="form">
      <div class="usuario-imagem">
        <div class="campo_foto">
          <div class="cover">
            <img v-if="coverUrl" class="capa_previa" :src="coverUrl" />
            <p v-else class="foto sem-img">
              Usuario<br />
              Sem<br />
              Imagem
            </p>
          </div>
          <input
            id="Capa"
            type="file"
            accept="image/*"
            @change="onFileChange"
          />
        </div>
      </div>
      <div class="usuario-info">
        <div class="email">
          <label class="label-user-login-cadastro" for="email">Email: </label>
          <input
            class="input-user-login-cadastro"
            id="email"
            type="email"
            v-model="usuario.email"
          />
        </div>
        <div class="first_name">
          <label class="label-user-login-cadastro" for="first_name"
            >Primeiro Nome:
          </label>
          <input
            class="input-user-login-cadastro"
            id="first_name"
            type="text"
            v-model="usuario.first_name"
          />
        </div>
        <div class="last_name">
          <label class="label-user-login-cadastro" for="last_name"
            >Último Nome:
          </label>
          <input
            class="input-user-login-cadastro"
            id="last_name"
            type="text"
            v-model="usuario.last_name"
          />
        </div>
        <div class="telefone">
          <label class="label-user-login-cadastro" for="telefone"
            >Telefone:
          </label>
          <input
            class="input-user-login-cadastro"
            id="telefone"
            type="tel"
            v-model="usuario.telefone"
          />
        </div>
        <div class="cpf">
          <label class="label-user-login-cadastro" for="cpf">CPF: </label>
          <input
            class="input-user-login-cadastro"
            id="cpf"
            type="text"
            v-model="usuario.cpf"
          />
        </div>
        <div class="data_nascimento">
          <label class="label-user-login-cadastro" for="data_nascimento"
            >Data de Nascimento:
          </label>
          <input
            class="input-user-login-cadastro"
            type="date"
            id="data_nascimento"
            v-model="usuario.data_nascimento"
            required
          />
        </div>
      </div>
      <div class="usuario-edit">
        <button class="confirmacao" @click="excluir(usuario)">
          <span class="excluir">Excluir Conta</span>
          <span class="certeza">Certeza?</span>
        </button>
        <button class="sair" @click="Logout()">Sair</button>
        <button class="salvar" @click="salvar">Salvar Dados</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.form {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  height: 600px;
  width: 600px;
  display: flex;
  flex-direction: column;
  margin: 80px 0;
}
.form-centralizado {
  display: flex;
  justify-content: center;
  align-items: center;
}
.usuario-imagem {
  width: 100px;
  height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #f1ebf7;
  border-radius: 100%;
  text-align: center;
  line-height: 130px;
}
.foto {
  height: 100%;
  width: 100%;
  border-radius: 100%;
}
.sem-img {
  line-height: normal;
  display: inline-block;
  vertical-align: middle;
}
.label-user-login-cadastro {
  font-size: 18px;
  cursor: pointer;
  text-align: center;
  width: 300px;
  margin-top: 10px;
}
.input-user-login-cadastro {
  padding: 5px;
  margin-bottom: 10px;
  width: 290px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.8);
}
button .certeza {
  display: none;
}
button:hover .excluir {
  display: none;
}
button:hover .certeza {
  display: inline;
}
.email,
.password,
.first_name,
.last_name,
.telefone,
.cpf,
.data_nascimento {
  display: flex;
  flex-direction: row;
}
.carrinho,
.confirmacao,
.salvar,
.sair {
  cursor: pointer;
  padding: 8px;
  margin-top: -15px;
  margin-bottom: 25px;
  margin-right: auto;
  margin-left: auto;
  width: 200px;
  height: 35px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.8);
  justify-content: center;
  display: flex;
}
.confirmacao {
  background-color: black;
  color: white;
  font-weight: bolder;
  font-size: 15px;
}
.confirmacao:hover {
  background-color: rgb(243, 10, 10);
  font-size: 15px;
  font-weight: bolder;
  color: white;
  border: none;
}
.usuario-info {
  width: 450px;
  background-color: #f1ebf7;
  padding: 4%;
  border-radius: 10px;
  margin: 10px;
}
.usuario-edit {
  width: 450px;
  height: 50px;
  padding: 4%;
  border-radius: 10px;
  font-weight: bold;
  background-color: #f1ebf7;
  display: flex;
  flex-wrap: wrap;
}
.carrinho:hover,
.salvar:hover,
.sair:hover {
  background-color: #f1ebf7;
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
.cor {
  display: flex;
  flex-direction: column;
  margin: 0 7px;
}
</style>
