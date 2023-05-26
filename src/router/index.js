import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoriaView from "../views/CategoriaView.vue";
import CorView from "../views/CorView.vue";
import ItemView from "../views/ItemView.vue";
import MarcaView from "../views/MarcaView.vue";
import TamanhoView from "../views/TamanhoView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/categorias",
      name: "categorias",
      component: CategoriaView,
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
      path: "/marcas",
      name: "marcas",
      component: MarcaView,
    },
    {
      path: "/tamanhos",
      name: "tamanhos",
      component: TamanhoView,
    },
  ],
});

export default router;
