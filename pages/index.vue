<template>
  <div class="grid">
    <v-row>
      <v-col cols="12" justify="center" align="center">
        <v-img
          class="rounded-lg"
          height="100"
          width="74"
          src="/logo.jpeg"
        ></v-img>
        <br />
        <p class="text-h5">
         {{configuracion.titulo}}
        </p>
        <p class="red--text">{{configuracion.subtitulo}}</p>
      </v-col>
      <v-container>
        <v-row v-if="!confirmacion">
          <v-col cols="12" md="7" justify="center" align="start">
            <p class="cyan--text">Listado</p>
            <v-card class="mx-auto" max-width="100%">
              <v-list>
                <v-list-group
                  v-for="(item, index) in items"
                  :key="index"
                  no-action
                >
                  <template v-slot:activator>
                    <v-list-item-content>
                      <div class="d-flex flex-row justify-start align-center">
                        <v-img
                          heigth="5%"
                          width="5%"
                          :src="item.image_url"
                          class="mr-4"
                        ></v-img>
                        <v-list-item-title
                          v-text="item.descripcion"
                        ></v-list-item-title>
                      </div>
                    </v-list-item-content>
                  </template>

                  <v-list-item v-for="child in item.items" :key="child.title">
                    <v-list-item-content>
                      <div class="d-flex flex-row justify-space-between">
                        <div>
                          <v-list-item-title
                            class="font-weight-bold"
                            v-text="child.descripcion"
                          ></v-list-item-title>
                          <p v-if="child.adicional">({{ child.adicional }})</p>
                          <v-list-item-title
                            class="font-weight-bold"
                            v-text="`Precio: $${child.precio}`"
                          ></v-list-item-title>
                        </div>
                        <v-btn
                          @click="agregar(child)"
                          :disabled="child.activo"
                          rounded
                          color="primary"
                          >AGREGAR</v-btn
                        >
                      </div>
                      <v-divider></v-divider>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-group>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" md="5" justify="center" align="start">
            <p class="cyan--text">Mi pedido</p>
            <v-card class="mx-auto" max-width="100%">
              <v-data-table
                hide-default-footer
                :headers="headers"
                :items="pedido.items"
                class="elevation-1"
              >
                <template v-slot:[`item.descripcion`]="{ item }">
                  <p>
                    {{ `${item.seccion.descripcion}: ${item.descripcion}` }}
                  </p>
                </template>
                <template v-slot:[`item.cantidad`]="{ item }">
                  <v-text-field
                    class="pt-3"
                    type="number"
                    v-model="item.cantidad"
                    outlined
                    placeholder="0"
                    dense
                  ></v-text-field>
                </template>
                <template v-slot:[`item.acciones`]="{ item }">
                  <v-btn
                    class="mt-n3 mx-2"
                    fab
                    dark
                    small
                    color="primary"
                    @click="eliminar(item)"
                  >
                    <v-icon dark> mdi-delete </v-icon>
                  </v-btn>
                </template>
              </v-data-table>
              <v-btn block color="primary" @click="datoPersonal = true"
                >Aceptar</v-btn
              >
            </v-card>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12">
            <v-alert dense text type="success" class="text-center">
              <strong>Su pedido se envio correctamente.</strong>
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <vs-dialog v-model="datoPersonal">
      <template #header>
        <h4 class="not-margin"><b>Completa tus datos</b></h4>
      </template>

      <div class="con-form">
        <v-text-field
          class="mt-2"
          v-model="pedido.usuario"
          outlined
          label="Nombre y Apellido"
          placeholder="0"
          dense
        ></v-text-field>
        <v-text-field
          class="mt-2"
          v-model="pedido.telefono"
          outlined
          placeholder=" "
          label="Teléfono"
          dense
        ></v-text-field>
        <v-checkbox v-model="envio" label="Envio (cargo $50)"></v-checkbox>
        <v-text-field
          v-if="envio"
          class="mt-2"
          v-model="pedido.direccion"
          outlined
          placeholder=" "
          label="Dirección"
          dense
        ></v-text-field>
      </div>
      <template #footer>
        <div class="footer-dialog">
          <vs-button block @click="enviarPedido()">Enviar pedido</vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: false,
    envio: false,
    datoPersonal: false,
    confirmacion: false,
    items: [],
    headers: [
      { text: '', value: 'descripcion', align: 'left' },
      { text: 'Cantidad', value: 'cantidad', align: 'center' },
      { text: 'Accion', value: 'acciones', align: 'center' },
    ],
    pedido: {
      usuario: '',
      telefono: '',
      direccion: null,
      items: [],
    },
    configuracion: {}
  }),
  async mounted() {
    const responseConfig = await this.$axios.get('/api/configuracion')
    const responseProductos = await this.$axios.get('/api/productos')
    if (responseConfig.status == 200 && responseProductos.status == 200) {
      this.configuracion = responseConfig.data;
      this.items = responseProductos.data
    }
  },
  methods: {
    agregar(item) {
      item.activo = true
      item.cantidad = 1
      this.pedido.items.push(item)
    },
    eliminar(item) {
      item.activo = false
      this.pedido.items = this.pedido.items.filter(
        (p) => p.productoId !== item.productoId
      )
    },
    async enviarPedido() {
      const response = await this.$axios.post('/api/nuevoPedido', this.pedido)
      console.log(response)
      if (response.status === 200) {
        this.datoPersonal = false
        this.confirmacion = true
      }
    },
  },
  watch: {
    envio() {
      if (!this.envio) {
        this.pedido.direccion = null
      }
    },
  },
}
</script>

<style></style>
