<template>
  <div class="home">
    <header class="header">
      <h1>Bienvenido a AssetManager</h1>
      <p>La solución para gestionar tus activos de manera eficiente.</p>
      <router-link to="/assets">
        <button class="explore-button">Explorar Activos</button>
      </router-link>
    </header>
    <section class="features">
      <div class="feature" @click="goToAssets">
        <div class="feature-content">
          <!-- <img src="@/assets/icon1.png" alt="Icon 1" /> -->
          <h2>Registro de Activos</h2>
          <p>Registra fácilmente tus activos, especificando su tipo, marca y estado.</p>
        </div>
      </div>
      <div class="feature" @click="goToAreas">
        <div class="feature-content">
          <!-- <img src="@/assets/icon2.png" alt="Icon 2" /> -->
          <h2>Gestión de Áreas</h2>
          <p>Crea y administra áreas para organizar tus activos de manera efectiva.</p>
        </div>
      </div>
      <div class="feature" @click="goToSearch">
        <div class="feature-content">
          <!-- <img src="@/assets/icon3.png" alt="Icon 3" /> -->
          <h2>Búsqueda Rápida</h2>
          <p>Encuentra tus activos en segundos utilizando filtros por tipo y estado.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    goToAssets() {
      this.$router.push('/assets');
    },
    goToAreas() {
      this.$router.push('/areas');
    },
    goToSearch() {
      this.$router.push('/assets');
    }
  }
}
</script>

<style scoped>
.home {
  text-align: center;
}

.header {
  margin: 2rem 0;
}

.explore-button {
  background-color: #42b983;
  color: #fff;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.explore-button:hover {
  background-color: #2c7a5b;
}

.features {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.feature {
  margin: 1rem;
  padding: 2rem;
  border: 1px solid #e4e4e4;
  border-radius: 10px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.feature:hover {
  transform: scale(1.05);
}

.feature-content {
  text-align: center;
}

.feature img {
  max-width: 100px;
}

.feature h2 {
  margin: 1rem 0;
  font-size: 1.5rem;
}

.feature p {
  font-size: 1rem;
}
</style>
