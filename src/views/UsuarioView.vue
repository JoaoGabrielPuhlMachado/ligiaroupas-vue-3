<script setup>
import { onMounted, ref } from "vue";
import router from "../router";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
import UsuariosApi from "/src/api/usuarios.js";

const Logout = () => {
  authStore.LogOut();
  window.alert("Usuário encerrou sessão com sucesso!");
  router.push("/login");
};
function abrir(id) {
  router.push(`/compras/${id}`);
}
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
  foto: "",
});

onMounted(async () => {
  usuario.value = await usuariosApi.buscarUsuarioPorId(props.id);
});

async function salvar() {
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
        <img class="foto" v-if="usuario.foto" :src="usuario.foto.url" alt="" />
        <p v-else class="foto sem-imagem">Usuario Sem Imagem</p>
      </div>
      <div class="usuario-info">
        <div class="email">
          <label for="email">Email: </label>
          <input id="email" type="email" v-model="usuario.email" />
        </div>
        <div class="first_name">
          <label for="first_name">Primeiro Nome: </label>
          <input id="first_name" type="text" v-model="usuario.first_name" />
        </div>
        <div class="last_name">
          <label for="last_name">Último Nome: </label>
          <input id="last_name" type="text" v-model="usuario.last_name" />
        </div>
        <div class="telefone">
          <label for="telefone">Telefone: </label>
          <input id="telefone" type="tel" v-model="usuario.telefone" />
        </div>
        <div class="cpf">
          <label for="cpf">CPF: </label>
          <input id="cpf" type="text" v-model="usuario.cpf" />
        </div>
        <div class="data_nascimento">
          <label for="data_nascimento">Data de Nascimento: </label>
          <input
            type="date"
            id="data_nascimento"
            v-model="usuario.data_nascimento"
            required
          />
        </div>
      </div>
      <div class="usuario-edit">
        <div class="botao-espaco">
          <button
            class="usuario-card-button confirmacao"
            @click="excluir(usuario)"
          >
            <span class="excluir">Excluir Conta</span>
            <span class="certeza">Certeza?</span>
          </button>
          <button class="sair" @click="Logout()">Sair</button>
          <button class="salvar" @click="salvar">Salvar Dados</button>
          <button class="carrinho" @click="abrir()">Carrinho</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
label {
  width: 200px;
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
.editar,
.confirmacao,
.salvar,
.sair {
  cursor: pointer;
}
.form-centralizado {
  display: flex;
  justify-content: center;
  align-items: center;
}
.confirmacao:hover {
  background-color: rgb(243, 10, 10);
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
.form {
  background-color: rgb(192, 214, 255);
  justify-content: center;
  align-items: center;
  height: 600px;
  width: 600px;
  flex-direction: column;
}
.foto {
  height: 100%;
  width: 100%;
}
.usuario-imagem {
  border: 2px solid rgb(0, 0, 0);
  border-radius: 8%;
  width: 15%;
  height: 100px;
}
.usuario-info {
  width: 450px;
  background-color: rgb(249, 251, 255);
  padding: 4%;
  border-radius: 3%;
  margin: 10px;
}
.usuario-edit {
  width: 65%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-weight: bold;
  background-color: #f5f5f5;
}
.usuario-card-button {
  font-weight: bold;
  background-color: black;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 7px 10px;
}
.botao-espaco {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
</style>
