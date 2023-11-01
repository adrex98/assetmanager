<template>
  <div class="wrapper">
    <div class="container">
      <h2>Nuevo Encargado</h2>
      <form @submit.prevent="postEncargado">
        <div class="input-field">
          <input v-model="firstName" placeholder="Nombre(s)">
        </div>
        <div class="input-field">
          <input v-model="lastName" placeholder="Apellido(s)">
        </div>
        <div class="input-field">
          <input v-model="cellPhone" placeholder="Número de Celular">
        </div>
        <button class="btn waves-effect waves-light" type="submit">Registrar</button>
      </form>
    </div>
    <div class="container">
      <h2>Encargados Existentes</h2>
      <table class="striped">
        <thead>
          <tr>
            <th>Nombre(s)</th>
            <th>Apellido(s)</th>
            <th>Celular</th>
            <th>Fecha de Registro</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="manager in existingManagers" :key="manager.id">
            <td>{{manager.firstName}}</td>
            <td>{{manager.lastName}}</td>
            <td>{{manager.cellPhone}}</td>
            <td>{{manager.registrationDate}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'managers',
  data() {
    const api = process.env.VUE_APP_API;
    return {
      api,
      firstName: '',
      lastName: '',
      cellPhone: '',
      existingManagers: [],
      registrationDate: '',
    };
  },
  mounted() {
    this.getExistingManagers();
  },
  methods: {
    async postEncargado() {
      if (this.firstName && this.lastName && this.cellPhone) {
        const currentDate = new Date(); // Obtenemos la fecha actual
        const formattedDate = currentDate.toISOString().split('T')[0]; // Formato a la fecha
        // alert(formattedDate);
        const response = await this.axios.post(this.api + '/managers', {
          firstName: this.firstName,
          lastName: this.lastName,
          cellPhone: this.cellPhone,
          registrationDate: formattedDate,
        });

        if (response.status === 201) {
          alert('Nuevo Encargado Registrado con Exito!');
          this.existingManagers.push(response.data);

          // Limpiar los Datos luego del registro exitoso
          this.firstName = '';
          this.lastName = '';
          this.cellPhone = '';
          
        } else {
          alert('Hubo un error en el registro');
        }
      } else {
        alert('Por favor completar los campos');
      }
    },
    async getExistingManagers() {
      try {
        const response = await this.axios.get(this.api + '/managers');
        if (response.status === 200) {
          this.existingManagers = response.data;
        }
      } catch (error) {
        console.error('Error al obtener los Encargados Existentes', error);
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
