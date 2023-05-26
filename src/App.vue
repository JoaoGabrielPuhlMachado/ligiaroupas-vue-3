<template>
  <header>
    <router-link :to="{ name: 'home' }">Home</router-link>
    <router-link to="/itens">Itens</router-link>
    <router-link to="/categorias">Categorias</router-link>
    <router-link to="/cores">Cores</router-link>
    <router-link to="/marcas">Marcas</router-link>
    <router-link to="/tamanhos">Tamanhos</router-link>
  </header>
  <main>
    <RouterView />
  </main>
</template>
