<template>
  <div class="wrapper">
    <div class="container">
      <h2>Nuevo Tipo de Activo</h2>
      <form @submit.prevent="postTipoActivo">
        <div class="input-field">
          <input v-model="assetTypeName" placeholder="Tipo de Activo">
        </div>
        <button class="btn waves-effect waves-light" type="submit">Registrar</button>
      </form>
    </div>
    <div class="container">
      <h2>Tipo de Activos Existentes</h2>
      <br />
      <table class="striped">
        <thead>
          <tr>
            <th>Tipo de Activo</th>
            <th>Cantidad de Activos Asignados</th>
            <th>Fecha de Creacion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="assetType in existingAssetTypes" :key="assetType.id">
            <td>{{assetType.assetTypeName}}</td>
            <td></td>
            <td>{{assetType.registrationDate}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'newAssetType',
  data() {
    const api = process.env.VUE_APP_API;
    return {
      api,
      assetTypeName: '',
      // assetsAsigned: '',
      registrationDate: '',
      existingAssetTypes: [],
    };
  },
  mounted() {
    this.getExistingAssetTypes();
  },
  methods: {
    async postTipoActivo() {
      if (this.assetTypeName) {
        const currentDate = new Date(); // Obtenemos la fecha actual
        const formattedDate = currentDate.toISOString().split('T')[0]; // Formato a la fecha
        // alert(formattedDate);
        const response = await this.axios.post(this.api + '/assetTypes', {
          assetTypeName: this.assetTypeName,
          registrationDate: formattedDate,
        });

        if (response.status === 201) {
          alert('Nuevo Encargado Registrado con Exito!');
          this.existingAssetTypes.push(response.data);

          // Limpiar Datos

          this.assetTypeName = '';

        } else {
          alert('Hubo un error en el registro');
        }
      } else {
        alert('Por favor completar los campos');
      }
    },
    async getExistingAssetTypes() {
      try {
        const response = await this.axios.get(this.api + '/assetTypes');
        if (response.status === 200) {
          this.existingAssetTypes = response.data;
        }
      } catch (error) {
        console.error('Error al obtener los tipos de activos Existentes', error);
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 70vh;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.input-field {
  margin: 10px 0;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

th, td {
  text-align: center;
  padding: 8px;
  border: 1px solid #ccc;
}
</style>
