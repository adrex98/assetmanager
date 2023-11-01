<template>
  <div class="wrapper">
    <div class="container">
      <h2>Nuevo Departamento</h2>
      <form @submit.prevent="postArea">
        <div class="input-field">
          <input v-model="name" placeholder="Nombre del área">
        </div>
        <!-- <div class="input-field">
          <input v-model="manager" placeholder="Encargado">
        </div> -->
        <div>
          <label for="managerId">Encargado</label>
          <select v-model="managerId" id="managerId">
            <option v-for="manager in existingManagers" :key="manager.id" :value="manager.id">
              {{ manager.firstName }}
            </option>
          </select>
        </div>
        <div class="input-field">
          <input v-model="employees" type="number" placeholder="Número de empleados">
        </div>
        <button class="btn waves-effect waves-light" type="submit">Registrar</button>
      </form>
    </div>
    <div class="container">
      <h2>Departamentos Existentes</h2>
      <table class="striped">
        <thead>
          <tr>
            <th>Departamento</th>
            <th>Encargado</th>
            <th>Cantidad de Empleados</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="area in existingAreas" :key="area.id">
            <td>{{ area.name }}</td>
            <td>{{ getManagerName(area.managerId) }}</td>
            <td>{{ area.employees }}</td>
            <td>
              <button class="btn red" @click="deleteArea(area.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'areas',
  data() {
    const api = process.env.VUE_APP_API;
    return {
      api,
      name: '',
      manager: '',
      employees: 0,
      existingAreas: [],
      existingManagers: [],
      managerId: null,
    };
  },
  mounted() {
    this.getExistingAreas();
    this.getExistingManagers();
  },
  methods: {
    async postArea() {
      if (this.name && this.managerId && this.employees) {
        const response = await this.axios.post(this.api + '/areas', {
          name: this.name,
          manager: this.manager,
          employees: this.employees,
          managerId: this.managerId,
        });

        if (response.status === 201) {
          alert('Área registrada con éxito');
          this.existingAreas.push(response.data);
        } else {
          alert('Hubo un error en el registro');
        }
      } else {
        alert('Por favor, complete todos los campos');
      }
    },
    getManagerName(managerId) {
      const manager = this.existingManagers.find((manager) => manager.id === managerId);
      return manager ? `${manager.firstName} ${manager.lastName}` : 'Encargado Desconocido';
    },
    async getExistingManagers() {
      try {
        const response = await this.axios.get(this.api + '/managers');
        if ( response.status === 200) {
          this.existingManagers = response.data;
        }
      } catch (error) {
        console.error('Error al obtener a los Encargados', error);
      }
    },
    async getExistingAreas() {
      try {
        const response = await this.axios.get(this.api + '/areas');
        if (response.status === 200) {
          this.existingAreas = response.data;
        }
      } catch (error) {
        console.error('Error al obtener áreas existentes', error);
      }
    },
    async deleteArea(areaId) {
      try {
        const response = await this.axios.delete(this.api + `/areas/${areaId}`);
        if (response.status === 200) {
          const updatedAreas = this.existingAreas.filter((area) => area.id !== areaId);
          this.existingAreas = [...updatedAreas];
        }
      } catch (error) {
        console.error(`Error al eliminar el área con ID ${areaId}`, error);
      }
    },
  },
};
</script>

<style scoped>
select {
  display: block;
}
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
