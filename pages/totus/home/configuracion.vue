<template>
  <v-container>
    <p class="text-h5">Configuración</p>
    <v-row>
      <v-col cols="12">
        <v-textarea v-model="configuracion.titulo" color="teal">
          <template v-slot:label>
            <div>Titulo</div>
          </template>
        </v-textarea>
        <v-textarea v-model="configuracion.subtitulo" color="teal">
          <template v-slot:label>
            <div>Subtitulo</div>
          </template>
        </v-textarea>
        <v-btn block class="primary" @click="updateConfiguracion()"
          >Aceptar</v-btn
        >
      </v-col>
    </v-row>
    <v-snackbar :color="alerta.color" v-model="alerta.active">
      {{ alerta.text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="alerta.active = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  layout: 'auth',
  middleware: 'authenticated',
  data() {
    return {
      alerta: {
        active: false,
        text: '',
        color: 'success',
      },
      configuracion: {},
    }
  },
  async mounted() {
    const response = await this.$axios.get('/api/configuracion')
    if (response.status == 200) {
      this.configuracion = response.data
    }
  },
  methods: {
    async updateConfiguracion() {
      const response = await this.$axios.put(
        '/auth/user/configuracion',
        this.configuracion
      )
      if (response.status == 200) {
        this.alerta.text = 'Actualizado correctamente'
        this.alerta.active = true
      }
    },
  },
}
</script>

<style></style>
