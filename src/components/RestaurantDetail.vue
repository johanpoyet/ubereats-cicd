<template>
  <v-app>
    <HomeNavbar />

    <v-main class="grey lighten-5">
      <v-container v-if="loading" class="text-center py-12">
        <v-progress-circular indeterminate color="black" size="64"></v-progress-circular>
      </v-container>

      <v-container v-else-if="restaurant" fluid class="pa-0">
        <!-- Restaurant Header -->
        <v-img :src="restaurant.image" height="300" class="restaurant-header">
          <div class="header-overlay">
            <v-btn icon color="white" class="back-btn" @click="goBack">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </div>
        </v-img>

        <v-container class="py-6">
          <!-- Restaurant Info -->
          <v-row>
            <v-col cols="12">
              <h1 class="text-h4 font-weight-bold mb-2">{{ restaurant.name }}</h1>
              <div class="d-flex align-center mb-2">
                <v-icon small color="yellow darken-2" class="mr-1">mdi-star</v-icon>
                <span class="font-weight-bold mr-2">{{ restaurant.rating }}</span>
                <span class="grey--text mr-2">({{ restaurant.reviewCount }}+ avis)</span>
                <span class="grey--text">· {{ restaurant.cuisine }}</span>
              </div>
              <div class="grey--text">
                <v-icon small class="mr-1">mdi-clock-outline</v-icon>
                {{ restaurant.deliveryTime }} min ·
                <v-icon small class="mx-1">mdi-currency-eur</v-icon>
                {{ restaurant.deliveryFee }} € de frais
              </div>
            </v-col>
          </v-row>

          <v-divider class="my-6"></v-divider>

          <!-- Menu Section -->
          <v-row>
            <v-col cols="12">
              <h2 class="text-h5 font-weight-bold mb-4">Menu</h2>

              <div v-if="!restaurant.menu || restaurant.menu.length === 0" class="text-center py-8">
                <v-icon size="64" color="grey lighten-1">mdi-food-off</v-icon>
                <div class="mt-4 grey--text">Aucun article disponible pour le moment</div>
              </div>

              <v-row v-else>
                <v-col
                  v-for="item in restaurant.menu"
                  :key="item._id"
                  cols="12"
                  md="6"
                >
                  <v-card class="menu-item-card" hover @click="addItemToCart(item)">
                    <v-card-text>
                      <div class="d-flex justify-space-between">
                        <div class="flex-grow-1 pr-4">
                          <h3 class="font-weight-bold mb-1">{{ item.name }}</h3>
                          <p class="caption grey--text mb-2">{{ item.description }}</p>
                          <div class="font-weight-bold">{{ formatPrice(item.price) }}</div>
                          <v-chip x-small class="mt-2" color="grey lighten-3">
                            {{ item.category }}
                          </v-chip>
                        </div>
                        <div class="menu-item-image">
                          <v-img
                            :src="getItemImage(item.category)"
                            height="100"
                            width="100"
                            class="rounded"
                          />
                          <v-btn
                            fab
                            x-small
                            color="black"
                            dark
                            class="add-btn"
                            @click.stop="addItemToCart(item)"
                          >
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <v-container v-else class="text-center py-12">
        <v-icon size="64" color="grey">mdi-alert-circle-outline</v-icon>
        <div class="mt-4 text-h6">Restaurant introuvable</div>
        <v-btn color="black" dark class="mt-4" @click="goBack">
          Retour
        </v-btn>
      </v-container>
    </v-main>

    <CartDrawer />

    <!-- Snackbar for feedback -->
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      color="success"
      bottom
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import { restaurantService } from '@/services/api'
import HomeNavbar from './HomeNavbar'
import CartDrawer from './CartDrawer'

export default {
  name: 'RestaurantDetail',
  components: {
    HomeNavbar,
    CartDrawer
  },
  data () {
    return {
      restaurant: null,
      loading: false,
      snackbar: false,
      snackbarText: ''
    }
  },
  async created () {
    await this.fetchRestaurant()
  },
  methods: {
    ...mapActions(['addToCart', 'openCart']),
    async fetchRestaurant () {
      this.loading = true
      try {
        const id = this.$route.params.id
        this.restaurant = await restaurantService.getById(id)
      } catch (error) {
        console.error('Erreur lors de la récupération du restaurant:', error)
      } finally {
        this.loading = false
      }
    },
    formatPrice (price) {
      return `${price.toFixed(2)} €`
    },
    getItemImage (category) {
      const images = {
        Pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop',
        Pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=100&h=100&fit=crop',
        Burgers: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop',
        Tacos: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=100&h=100&fit=crop',
        Sushi: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop',
        Desserts: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=100&h=100&fit=crop',
        Nouilles: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=100&h=100&fit=crop',
        Plats: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&h=100&fit=crop'
      }
      return images[category] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop'
    },
    addItemToCart (item) {
      this.addToCart({
        id: `${this.restaurant._id}-${item._id}`,
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        restaurant: this.restaurant.name,
        restaurantId: this.restaurant._id
      })
      this.snackbarText = `${item.name} ajouté au panier`
      this.snackbar = true
    },
    goBack () {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
.restaurant-header {
  position: relative;
}

.header-overlay {
  background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%);
  height: 100%;
  padding: 16px;
}

.back-btn {
  background-color: rgba(255, 255, 255, 0.9) !important;
}

.menu-item-card {
  transition: transform 0.2s;
  cursor: pointer;
}

.menu-item-card:hover {
  transform: translateY(-2px);
}

.menu-item-image {
  position: relative;
}

.add-btn {
  position: absolute;
  bottom: -8px;
  right: -8px;
}
</style>
