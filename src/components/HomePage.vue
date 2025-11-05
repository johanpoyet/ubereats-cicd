<template>
  <v-app>
    <HomeNavbar @toggle-drawer="drawer = !drawer" />
    <Sidebar :drawer.sync="drawer" />
    <v-main class="grey lighten-5">
      <v-container fluid class="pt-6">
        <!-- Filters Row -->
        <v-row class="mb-4">
          <v-col>
            <div class="d-flex align-center">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    v-bind="attrs"
                    v-on="on"
                    class="mr-3"
                  >
                    Frais de livraison
                    <v-icon right small>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>Tous</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Gratuit</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Moins de 3€</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-btn outlined class="mr-3">
                <v-icon left small>mdi-star</v-icon>
                Les mieux notés
              </v-btn>

              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  >
                    Trier
                    <v-icon right small>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>Recommandé</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Plus rapide</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Note</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-col>
        </v-row>

        <!-- Cuisine Types -->
        <CuisineTypes />

        <!-- Restaurant List -->
        <RestaurantList @select-restaurant="onSelectRestaurant" />
      </v-container>
    </v-main>

    <CartDrawer />
  </v-app>
</template>

<script>
import HomeNavbar from './HomeNavbar'
import Sidebar from './Sidebar'
import CuisineTypes from './CuisineTypes'
import RestaurantList from './RestaurantList'
import CartDrawer from './CartDrawer'

export default {
  name: 'HomePage',
  components: { HomeNavbar, Sidebar, CuisineTypes, RestaurantList, CartDrawer },
  data () {
    return {
      drawer: true
    }
  },
  methods: {
    onSelectRestaurant (restaurant) {
      // eslint-disable-next-line no-console
      console.log('Restaurant selected:', restaurant)
      // Navigate to restaurant detail page
    }
  }
}
</script>

<style scoped>
.v-main {
  background-color: #f5f5f5;
}
</style>
