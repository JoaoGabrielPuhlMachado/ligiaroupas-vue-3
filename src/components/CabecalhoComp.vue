<template>
  <header class="menu">
    <div>
      <RouterLink :to="{ name: 'home' }"><span>Home</span></RouterLink>
      <span><RouterLink to="/itens">Itens</RouterLink></span>
      <span><RouterLink to="/categorias">Categorias</RouterLink></span>
      <span><RouterLink to="/marcas">Marcas</RouterLink></span>
      <span><RouterLink to="/tamanhos">Tamanhos</RouterLink></span>
      <span><RouterLink to="/cores">Cores</RouterLink></span>
    </div>
  </header>
</template>
<style>
.router-link-active {
  color: black;
  font-weight: bold;
}
</style>
