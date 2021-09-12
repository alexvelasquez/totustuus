<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <p class="text-h5">Pedidos</p>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Pedido</th>
                <th class="text-left">Nombre y Apellido</th>
                <th class="text-left">Teléfono</th>
                <th class="text-center">Envio</th>
                <th class="text-center">Ver Pedido/Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in pedidos" :key="item.pedidoId">
                <td>#{{ item.pedidoId }}</td>
                <td>{{ item.nombreApellido }}</td>
                <td>{{ item.telefono }}</td>
                <td class="text-center">
                  {{ item.direccion != null ? item.direccion : '-' }}
                </td>
                <td class="text-center">
                  <v-btn
                    class="mt-n3 mx-1"
                    fab
                    dark
                    small
                    color="primary"
                    @click="verDetalle(item.pedidoId)"
                  >
                    <v-icon dark> mdi-eye </v-icon>
                  </v-btn>
                  <v-btn
                    class="mt-n3"
                    fab
                    dark
                    small
                    color="error"
                    @click="seleccionarEliminado(index)"
                  >
                    <v-icon dark> mdi-delete </v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-dialog v-model="dialog" scrollable max-width="600px">
          <v-card>
            <p class="d-flex font-weight-bold text-h5 pt-2 justify-center">
              Pedido
            </p>
            <v-divider></v-divider>
            <v-card-text style="height: 300px">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Sección</th>
                      <th class="text-left">Pedido</th>
                      <th class="text-left">Precio</th>
                      <th class="text-left">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in itemsPedido"
                      :key="item.pedidoProductoId"
                    >
                      <td>{{ item.producto.seccion.descripcion }}</td>
                      <td>{{ item.producto.descripcion }}</td>
                      <td>$ {{ item.producto.precio }}</td>
                      <td>{{ item.cantidad }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-space-between">
              <v-btn color="blue darken-1" text @click="dialog = false">
                Cerrar
              </v-btn>
              <p class="font-weight-bold">Total: ${{ totalItemsPedido }}</p>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- DIALOG DELETE -->
        <v-dialog v-model="preguntar" persistent max-width="300">
          <v-card>
            <v-card-title class="justify-center"> ¿Estás seguro? </v-card-title>
            <v-card-text>El pedido no se podrá volver a recuperar</v-card-text>
            <v-card-actions class="justify-space-between">
              <v-btn color="primary" text @click="preguntar = false">
                Cancelar
              </v-btn>
              <v-btn color="primary" text @click="eliminarPedido()">
                Aceptar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      dialog: false,
      pedidos: [],
      itemsPedido: [],
      totalItemsPedido: 0,
      preguntar: false,
      indexSeleccionado: null,
    }
  },
  async mounted() {
    const response = await this.$axios.get('/auth/user/pedidos')
    if (response.status == 200) {
      this.pedidos = response.data
    }
  },
  methods: {
    async verDetalle(itemId) {
      const response = await this.$axios.get(
        `/auth/user/pedidos/producto/${itemId}`
      )
      if (response.status == 200) {
        this.itemsPedido = response.data
        this.calcularTotalPedido()
        this.dialog = true
      }
    },

    async eliminarPedido() {
      const item = this.pedidos[indexSeleccionado]
      const response = await this.$axios.delete(
        `/auth/user/pedidos/${item.pedidoId}`
      )
      if (response.status == 200) {
        this.pedidos = this.pedidos.slice(indexSeleccionado, 1)
        this.preguntar = false
      }
    },

    calcularTotalPedido() {
      const precios = this.itemsPedido.map(
        (p) => p.producto.precio * p.cantidad
      )
      this.totalItemsPedido = precios.reduce((ant, current) => ant + current)
    },
    seleccionarEliminado(index) {
      indexSeleccionado = index
      preguntar = true
    },
  },
}
</script>

<style></style>
