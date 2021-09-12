<template>
  <div>
    <h1>Vue-select</h1>
    <vs-row class="p-3" justify="center" align="center">
      <vs-col w="6">
        <v-select :options="options" label="title"></v-select>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        'Canada',
        'United States',
        'Canada 1',
        'United States 1',
        'Canada 2',
        'United States2',
        'Canada3',
        'United States3',
        'Canada4',
        'United States4',
        'Canada5',
        'United States6',
        'Canada7',
        'United States8',
      ],
    }
  },

  methods: {},
}
</script>
<style>
.vs__dropdown-menu {
  height: 118px;
}
</style>
