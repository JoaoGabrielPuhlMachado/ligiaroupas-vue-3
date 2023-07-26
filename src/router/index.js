import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CorView from "../views/CorView.vue";
import ProdutoView from "../views/ProdutoView.vue";
import TamanhoView from "../views/TamanhoView.vue";
import CadastroAdminView from "../views/CadastroAdminView.vue";
import CategoriaAdminView from "../views/CategoriaAdminView.vue";
import MarcaAdminView from "../views/MarcaAdminView.vue";
import DescricaoProdutoView from "../views/DescricaoProdutoView.vue";
import CategoriaClienteView from "../views/CategoriaClienteView.vue";
import LoginView from "../views/LoginView.vue";
import CadastroClienteView from "../views/CadastroClienteView.vue";
import MarcaClienteView from "../views/MarcaClienteView.vue";
import UsuarioView from "../views/UsuarioView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/cadastro",
      name: "cadastro",
      component: CadastroClienteView,
    },
    {
      path: "/admin/cadastro",
      name: "cadastro-admin",
      component: CadastroAdminView,
    },
    {
      path: "/admin/categorias",
      name: "categorias-admin",
      component: CategoriaAdminView,
    },
    {
      path: "/admin/marcas",
      name: "marcas-admin",
      component: MarcaAdminView,
    },
    {
      path: "/categorias",
      name: "categorias",
      component: CategoriaClienteView,
    },
    {
      path: "/marcas",
      name: "marcas",
      component: MarcaClienteView,
    },
    {
      path: "/cores",
      name: "cores",
      component: CorView,
    },
    {
      path: "/tamanhos",
      name: "tamanhos",
      component: TamanhoView,
    },
    {
      path: "/produtos",
      name: "produtos",
      component: ProdutoView,
    },
    {
      path: "/produtos/:id",
      name: "descricao",
      component: DescricaoProdutoView,
      props: true,
    },
    {
      path: "/usuarios/:id",
      name: "usuarios",
      component: UsuarioView,
      props: true,
    },
  ],
});

export default router;
