<template>
  <div class="wrapper">
  
  <div class="container">
    <h2>Registrar Activo</h2>
    <!-- Formulario para Registrar Activo -->
    <form @submit.prevent="registerAsset" ref="assetForm">
      <div class="row">
        <div class="input-field col s4">
          <input v-model="brand" id="brand" type="text" class="validate" required>
          <label for="brand">Marca</label>
        </div>
        <div class="input-field col s4">
          <input v-model="model" id="model" type="text" class="validate" required>
          <label for="model">Modelo</label>
        </div>
        <div class="input-field col s4">
          <label for="assetType">Tipo de Activo</label>
          <br />
          <br />
          <select v-model="assetType" id="assetType">
           <option v-for="assetType in existingAssetTypes" :key="assetType.id" :value="assetType.id">
            {{ assetType.assetTypeName }}
          </option>
          </select>
          <br />
          <button class="btn blue" @click="goToNewAssetType">Nuevo Tipo</button>
        </div>
        
      </div>
      <div class="row">
        <div class="input-field col s4">
          <label for="status">Estado</label>
          <br />
          <br />
          <select v-model="status" id="status">
            <option value="Nuevo">Nuevo</option>
            <option value="Usado">Usado</option>
            <option value="En desuso">En desuso</option>
          </select>
        </div>
        <div class="input-field col s4">
          <label for="areaId">Área</label>
          <br />
          <br />
          <select v-model="areaId" id="areaId">
            <option v-for="area in existingAreas" :key="area.id" :value="area.id">
              {{ area.name }}
            </option>
          </select>
          <br />
          <button class="btn blue" @click="goToNewArea">Nuevo Area</button>
        </div>
        <br />
        <div class="input-field col s5">
          <button class="waves-effect waves-light btn" type="submit">Registrar Activo</button>
        </div>
      </div>
    </form>
  </div>
  <br />
  <button class="btn green" @click="goToSearchAssets">Ver Activos</button>
</div>
</template>

<script>
export default {
  name: 'newAssets',
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
      existingAssetTypes: [],
    };
  },
  created() {
    this.getExistingAreas();
    this.getExistingAssetTypes();
  },
  methods: {
    goToSearchAssets() {
      this.$router.push('/assets');
    },
    goToNewAssetType() {
      this.$router.push('/newAssetType');
    },
    goToNewArea() {
      this.$router.push('/areas');
    },
    async registerAsset() {
      if (this.assetType && this.brand && this.model && this.status && this.areaId) {
        const response = await this.axios.post(this.api + '/assets', {
          assetTypeId: this.assetType,
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
    getAssetTypeName(assetTypeId){
      const assetType = this.existingAssetTypes.find((assetType) => assetType.id === assetTypeId);
      return assetType ? assetType.name : 'Tipo de activo desconocido';
    }, 
    async getExistingAssetTypes() {
      try {
        const response = await this.axios.get(this.api + '/assetTypes');
        if (response.status === 200) {
          this.existingAssetTypes = response.data;
          // console.log(existingAssetTypes)
        }
      } catch (error) {
        console.error('Error al obtener los tipo de Activos', error);
      }
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
</style>
