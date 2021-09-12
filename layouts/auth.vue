<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app v-if="isLoggedIn">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Totus </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="logout()">
          <v-list-item-icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app style="position: fixed" v-if="isLoggedIn">
      <v-row style="position: fixed">
        <v-app-bar-nav-icon
          v-show="!drawer"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <!-- If using vue-router -->
        <div class="app">
          <Nuxt />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default   {
  data() {
    return {
      drawer: false,
      items: [
        { title: 'Pedidos', icon: 'mdi-moped', to: '/totus/home' },
        {
          title: 'Configuración',
          icon: 'mdi-cog',
          to: '/totus/home/configuracion',
        },
      ],
      right: null,
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.token != null
    },
    logout(){
      this.$store.dispatch('logout')
    }
  },
}
</script>
<style>
body {
  margin: 0;
  border-radius: 5em;
}
.app {
  width: 100%;
  height: 100vh;
}
</style>
