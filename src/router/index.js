import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CorAdminView from "../views/CorAdminView.vue";
import ProdutoAdminView from "../views/ProdutoAdminView.vue";
import TamanhoAdminView from "../views/TamanhoAdminView.vue";
import CadastroAdminView from "../views/CadastroAdminView.vue";
import CategoriaAdminView from "../views/CategoriaAdminView.vue";
import MarcaAdminView from "../views/MarcaAdminView.vue";
import DescricaoProdutoAdminView from "../views/DescricaoProdutoAdminView.vue";
// import CategoriaClienteView from "../views/CategoriaClienteView.vue";
import LoginAdminView from "../views/LoginAdminView.vue";
// import CadastroClienteView from "../views/CadastroClienteView.vue";
// import MarcaClienteView from "../views/MarcaClienteView.vue";
import UsuarioAdminView from "../views/UsuarioAdminView.vue";
import ComprasView from "../views/ComprasView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/admin/login",
      name: "login",
      component: LoginAdminView,
    },
    {
      path: "/admin/cadastro",
      name: "cadastro",
      component: CadastroAdminView,
    },
    {
      path: "/admin/categorias",
      name: "categorias",
      component: CategoriaAdminView,
    },
    {
      path: "/admin/marcas",
      name: "marcas",
      component: MarcaAdminView,
    },
    {
      path: "/admin/cores",
      name: "cores",
      component: CorAdminView,
    },
    {
      path: "/admin/tamanhos",
      name: "tamanhos",
      component: TamanhoAdminView,
    },
    {
      path: "/admin/produtos",
      name: "produtos",
      component: ProdutoAdminView,
    },
    {
      path: "/admin/produtos/:id",
      name: "descricao",
      component: DescricaoProdutoAdminView,
      props: true,
    },
    {
      path: "/admin/usuarios/:id",
      name: "usuarios",
      component: UsuarioAdminView,
      props: true,
    },
    {
      path: "/compras/:id",
      name: "compras",
      component: ComprasView,
      props: true,
    },
  ],
});

export default router;
