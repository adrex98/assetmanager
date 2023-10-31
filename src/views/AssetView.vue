<template>
  <div class="wrapper">
  <div class="container">
    <h2>Nuevo Tipo de Activo</h2>
    <!-- Formulario para Nuevo Tipo de Activo -->
    <form class="col s12">
      <!-- Contenido del formulario -->
    </form>
  </div>
  <div class="container">
    <h2>Registrar Activo</h2>
    <!-- Formulario para Registrar Activo -->
    <form @submit.prevent="registerAsset" ref="assetForm">
      <div class="row">
        <div class="input-field col s4">
          <label for="assetType">Tipo de Activo</label>
          <select v-model="assetType" id="assetType">
            <option value="Computadora">Computadora</option>
            <option value="Impresora">Impresora</option>
            <!-- Otras opciones -->
          </select>
        </div>
        <div class="input-field col s4">
          <input v-model="brand" id="brand" type="text" class="validate" required>
          <label for="brand">Marca</label>
        </div>
        <div class="input-field col s4">
          <input v-model="model" id="model" type="text" class="validate" required>
          <label for="model">Modelo</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s4">
          <label for="status">Estado</label>
          <select v-model="status" id="status">
            <option value="Nuevo">Nuevo</option>
            <option value="Usado">Usado</option>
            <option value="En desuso">En desuso</option>
          </select>
        </div>
        <div class="input-field col s4">
          <label for="areaId">Área</label>
          <select v-model="areaId" id="areaId">
            <option v-for="area in existingAreas" :key="area.id" :value="area.id">
              {{ area.name }}
            </option>
          </select>
        </div>
        <div class="input-field col s4">
          <button class="waves-effect waves-light btn" type="submit">Registrar Activo</button>
        </div>
      </div>
    </form>
  </div>
  <div class="container">
    <h2>Buscador de Activos</h2>
    
    <div class="row">
      <div class="input-field col s4">
        <!-- <label for="filterStatus">Filtrar por Estado</label> -->
        <select v-model="filterStatus" id="filterStatus">
          <option value="">Todos</option>
          <option value="Nuevo">Nuevo</option>
          <option value="Usado">Usado</option>
          <option value="En desuso">En desuso</option>
        </select>
      </div>
      <div class="input-field col s4">
        <label for="searchType">Buscar por Tipo</label>
        <input v-model="searchType" id="searchType" type="text" class="validate">
      </div>
      <div class="input-field col s4">
        <button class="waves-effect waves-light btn" @click="clearFilters">Limpiar Filtros</button>
      </div>
    </div>
  </div>
  <div class="container">
    <h2>Activos Registrados</h2>
    <table class="highlight">
      <thead>
        <tr>
          <th>Tipo de Activo</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Estado</th>
          <th>Área</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="asset in filterAssets" :key="asset.id">
          <td>{{ asset.type }}</td>
          <td>{{ asset.brand }}</td>
          <td>{{ asset.model }}</td>
          <td>{{ asset.status }}</td>
          <td>{{ getAreaName(asset.areaId) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
export default {
  name: 'assets',
  data() {
    const api = process.env.VUE_APP_API;
    return {
      api,
      assetType: '',
      brand: '',
      model: '',
      status: '',
      areaId: null,
      existingAreas: [],
      existingAssets: [],
      filterStatus: '', // Inicialmente Vacío
      searchType: '', // Inicialmente Vacío
    };
  },
  created() {
    this.getExistingAreas();
    this.getExistingAssets();
  },
  computed: {
    filterAssets() {
      return this.existingAssets.filter((asset) => {
        // Aplicar Filtro por estado
        if (this.filterStatus && asset.status !== this.filterStatus) {
          return false;
        }

        // Aplicar búsqueda por tipo
        if (this.searchType && !asset.type.toLowerCase().includes(this.searchType.toLowerCase())) {
          return false;
        }

        return true;
      });
    },
  },
  methods: {
    async registerAsset() {
      if (this.assetType && this.brand && this.model && this.status && this.areaId) {
        const response = await this.axios.post(this.api + '/assets', {
          type: this.assetType,
          brand: this.brand,
          model: this.model,
          status: this.status,
          areaId: this.areaId,
        });
        // Manejar la respuesta
        if (response.status === 201) {
          alert('Activo registrado con éxito!');

          this.assetType = '';
          this.brand = '';
          this.model = '';
          this.status = '';
          this.areaId = null;

          this.existingAssets.push(response.data);
        }
      } else {
        alert('Por favor, complete todos los campos.');
      }
    },
    getAreaName(areaId) {
      const area = this.existingAreas.find((area) => area.id === areaId);
      return area ? area.name : 'Area desconocida';
    },
    async getExistingAreas() {
      try {
        const response = await this.axios.get(this.api + '/areas');
        if (response.status === 200) {
          this.existingAreas = response.data;
        }
      } catch (error) {
        console.error('Error al obtener las áreas existentes', error);
      }
    },
    async getExistingAssets() {
      try {
        const response = await this.axios.get(this.api + '/assets');
        if (response.status === 200) {
          this.existingAssets = response.data;
        }
      } catch (error) {
        console.error('Error al obtener los Activos Existentes', error);
      }
    },
    clearFilters() {
      this.filterStatus = '';
      this.searchType = '';
    },
  },
};
</script>

<style scoped>
select {
  display: block ;
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
}

.input-field {
  margin: 20px 0;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 10px; /* Espaciado inferior para los títulos */
}

label {
  font-size: 1rem;
}

.select-wrapper {
  margin-top: 0;
}

.select-dropdown {
  min-width: 200px;
}

/* Estilo adicional para la tabla de activos */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: center;
  padding: 8px;
  border: 1px solid #ccc;
}
</style>
