<template>
  <header>
    <div class="menu">
      <div class="links">
        <span><RouterLink to="/">Home</RouterLink></span>
        <span><RouterLink to="/categorias">Categorias</RouterLink></span>
        <span><RouterLink to="/marcas">Marcas</RouterLink></span>
      </div>
      <div class="nome-site">
        <span class="ligia">Lígia Roupas</span>
      </div>
      <div class="login">
        <span><RouterLink to="/login">Login</RouterLink></span>
      </div>
    </div>
  </header>
</template>
<style>
.menu {
  display: flex;
  width: 100%;
}
.links,
.login {
  display: flex;
  align-items: center;
}
.ligia {
  font-weight: bold;
  font-size: 40px;
}
.router-link-active {
  color: black;
  font-weight: bold;
}
</style>
