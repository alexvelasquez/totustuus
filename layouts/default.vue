<template>
  <v-app color="primary">
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <div class="app">
          <Nuxt />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

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
