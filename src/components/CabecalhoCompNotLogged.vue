<template>
  <header>
    <div class="menu">
      <div class="menu-left">
        <div class="links">
          <span><RouterLink to="/">Home</RouterLink></span>
        </div>
      </div>
      <div class="nome-site">
        <span class="ligia">Lígia Roupas</span>
      </div>
      <div class="menu-right">
        <div class="login">
          <span><RouterLink to="/admin/login">Login</RouterLink></span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.ligia {
  font-size: 40px;
}
.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  background-color: white;
  color: black;
}
.router-link-active {
  color: black;
  font-weight: bold;
}
</style>
