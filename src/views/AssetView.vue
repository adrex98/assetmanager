<template>
  <div class="wrapper">
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
          <td>{{ getAssetTypeName(asset.assetTypeId) }}</td>
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
      existingAssetTypes: [],
      filterStatus: '', // Inicialmente Vacío
      searchType: '', // Inicialmente Vacío
    };
  },
  created() {
    this.getExistingAreas();
    this.getExistingAssets();
    this.getExistingAssetTypes();
  },
  computed: {
  filterAssets() {
    return this.existingAssets.filter((asset) => {
      // Aplicar Filtro por estado
      if (this.filterStatus && asset.status !== this.filterStatus) {
        return false;
      }

      // Aplicar búsqueda por nombre del tipo de activo
      if (this.searchType) {
        const assetType = this.existingAssetTypes.find((type) => type.id === asset.assetTypeId);
        if (assetType && assetType.assetTypeName.toLowerCase().includes(this.searchType.toLowerCase())) {
          return true;
        }
        return false;
      }

      return true;
    });
  },
},
  methods: {
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
    getAssetTypeName(assetTypeId) {
      const assetType = this.existingAssetTypes.find((type) => type.id === assetTypeId);
      return assetType ? assetType.assetTypeName : 'Tipo de Activo Desconocido';
    },
    async getExistingAssetTypes() {
      try {
        const response = await this.axios.get(this.api + '/assetTypes');
        if (response.status === 200) {
          // console.log(response.data);
          
          this.existingAssetTypes = response.data;
        }
      } catch (error) {
        console.error('Error al obtener tipos de activos', error);
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
