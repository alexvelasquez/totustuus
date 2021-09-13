<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <vs-dialog prevent-close overflow-hidden not-close v-model="active">
          <template #header>
            <h4 class="not-margin"><b>INICIAR SESION</b></h4>
          </template>

          <div class="con-form">
            <v-text-field
              class="mt-2"

              v-model="auth.username"
              outlined
              label="Usuario"
              placeholder="Usuario"
              dense
            ></v-text-field>
            <v-text-field
              class="mt-2"
              v-model="auth.password"
              outlined
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              dense
            ></v-text-field>
          </div>

          <template #footer>
            <div class="footer-dialog">
              <vs-button block @click="login()">Iniciar sesión</vs-button>
            </div>
          </template>
        </vs-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'auth',
  data: () => ({
    active: true,
    auth: {
      username: '',
      password: '',
    },
  }),
  methods: {
    async login() {
      let response = await this.$axios.post('/auth/login_check', this.auth)
      if (response.status === 200) {
        const token = response.data.token
        this.$store.commit('token', token)
        this.$axios.setToken(`bearer ${token}`)
        this.$router.push('/totus/home')
      }
    },
  },
}
</script>

<style></style>
