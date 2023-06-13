import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CorView from "../views/CorView.vue";
import ItemView from "../views/ItemView.vue";
import TamanhoView from "../views/TamanhoView.vue";
import LoginAdminView from "../views/LoginAdminView.vue";
import CadastroAdminView from "../views/CadastroAdminView.vue";
import CategoriaAdminView from "../views/CategoriaAdminView.vue";
import MarcaAdminView from "../views/MarcaAdminView.vue";
import DescricaoItemView from "../views/DescricaoItemView.vue";
import CategoriaClienteView from "../views/CategoriaClienteView.vue";
import LoginClienteView from "../views/LoginClienteView.vue";
import CadastroClienteView from "../views/CadastroClienteView.vue";
import MarcaClienteView from "../views/MarcaClienteView.vue";

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
      component: LoginClienteView,
    },
    {
      path: "/cadastro",
      name: "cadastro",
      component: CadastroClienteView,
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
      path: "/admin/login",
      name: "login-admin",
      component: LoginAdminView,
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
      path: "/cores",
      name: "cores",
      component: CorView,
    },
    {
      path: "/itens",
      name: "itens",
      component: ItemView,
    },
    {
      path: "/tamanhos",
      name: "tamanhos",
      component: TamanhoView,
    },
    {
      path: "/itens/:id",
      name: "descricao",
      component: DescricaoItemView,
      props: true,
    },
  ],
});

export default router;
