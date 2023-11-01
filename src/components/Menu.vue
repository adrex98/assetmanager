<template>
<!-- Dropdown Structure -->
<ul id="dropdown1" class="dropdown-content">
  <li><router-link to="/managers">Nuevo Encargado(a)</router-link></li>
  <li><router-link to="/areas">Nueva Area</router-link></li>
  <li class="divider"></li>
</ul>

<ul id="dropdown2" class="dropdown-content">
  <li><router-link to="/assets">Buscar Activos</router-link></li>
  <li class="divider"></li>
  <li><router-link to="/assets">Nuevo Tipo de Activo</router-link></li>
  <li><router-link to="/assets">Registrar Activos</router-link></li>
  <li class="divider"></li>
</ul>
<nav>
  <div class="nav-wrapper">
    <!-- <a href="#!" class="brand-logo">Logo</a> -->
    <ul class="right hide-on-med-and-down">
      <li><router-link to="/">Inicio</router-link></li>
      <!-- Dropdown Trigger -->
      <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Administrar Areas<i class="material-icons right">arrow_drop_down</i></a></li>
      <li><a class="dropdown-trigger" href="#!" data-target="dropdown2">Administrar Activos<i class="material-icons right">arrow_drop_down</i></a></li>
      <li><a href="#">Github</a></li>
    </ul>
  </div>
</nav>
</template>

<script>
export default {
  name: 'menu',
  mounted() {
    // Inicializa el dropdown en el elemento con la clase "dropdown-trigger"
    // $('.dropdown-trigger').dropdown({ hover: false });
  },
};
</script>
