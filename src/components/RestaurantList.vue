<template>
  <v-container fluid class="pa-0">
    <!-- Promotional Banners -->
    <v-row class="mb-4">
      <v-col cols="12">
        <div class="d-flex align-center mb-2">
          <v-btn icon small>
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon small>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
        <v-row>
          <v-col
            v-for="(banner, idx) in promoBanners"
            :key="'banner-' + idx"
            cols="12"
            md="4"
          >
            <v-card class="promo-banner" elevation="2">
              <v-img :src="banner.image" height="150">
                <div class="pa-4">
                  <div class="white--text font-weight-bold mb-1">{{ banner.title }}</div>
                  <div class="white--text caption mb-2">{{ banner.subtitle }}</div>
                  <v-btn small color="white" class="black--text">{{ banner.cta }}</v-btn>
                </div>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Section Title -->
    <v-row class="mb-3">
      <v-col>
        <div class="d-flex align-center justify-space-between">
          <h2 class="text-h5 font-weight-bold">À découvrir sur Uber Eats</h2>
          <v-btn text small>
            Tout afficher
            <v-icon right small>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
        <div class="caption grey--text">Sponsorisé</div>
      </v-col>
    </v-row>

    <!-- Restaurant Grid -->
    <v-row>
      <v-col
        v-for="(restaurant, idx) in restaurants"
        :key="restaurant.id || idx"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card class="restaurant-card" flat hover @click="goToRestaurant(restaurant)">
          <div class="position-relative">
            <v-img :src="restaurant.image" height="180" />
            <v-chip
              v-if="restaurant.badge"
              small
              color="red"
              dark
              class="badge-chip"
            >
              {{ restaurant.badge }}
            </v-chip>
            <v-btn
              icon
              small
              class="favorite-btn"
              color="white"
            >
              <v-icon>mdi-heart-outline</v-icon>
            </v-btn>
          </div>

          <v-card-text class="pb-2">
            <div class="d-flex align-center justify-space-between mb-1">
              <h3 class="font-weight-bold">{{ restaurant.name }}</h3>
            </div>

            <div class="d-flex align-center caption grey--text text--darken-1 mb-1">
              <v-icon x-small class="mr-1">mdi-circle-small</v-icon>
              {{ restaurant.deliveryInfo }} · {{ restaurant.deliveryFee }}
            </div>

            <div class="d-flex align-center caption">
              <v-icon small color="yellow darken-2" class="mr-1">mdi-star</v-icon>
              <span class="font-weight-bold mr-1">{{ restaurant.rating }}</span>
              <span class="grey--text">({{ restaurant.reviews }})</span>
              <span class="mx-1">·</span>
              <span class="grey--text">{{ restaurant.deliveryTime }}</span>
            </div>

            <div v-if="restaurant.promo" class="caption green--text text--darken-2 mt-1">
              {{ restaurant.promo }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { restaurantService } from '@/services/api'

export default {
  name: 'RestaurantList',
  data () {
    return {
      loading: false,
      promoBanners: [
        {
          title: '1 acheté = 1 offert pour le double 🎉',
          subtitle: 'Et -30% sur vos courses',
          cta: 'J\'en profite →',
          image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=150&fit=crop'
        },
        {
          title: '1 acheté = 1 offert sur vos classiques chez Mcdonald\'s',
          subtitle: 'À dévorer',
          cta: 'J\'en profite →',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=150&fit=crop'
        },
        {
          title: 'Les bons plans : tous vos restos en promo 👍',
          subtitle: '1 acheté = 1 offert et plus encore',
          cta: 'Je commande →',
          image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=150&fit=crop'
        }
      ],
      restaurants: []
    }
  },
  async created () {
    await this.fetchRestaurants()
  },
  methods: {
    async fetchRestaurants () {
      this.loading = true
      try {
        const data = await restaurantService.getAll()
        // Transformer les données du backend pour correspondre au format attendu
        this.restaurants = data.map(restaurant => ({
          id: restaurant._id,
          name: restaurant.name,
          image: restaurant.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=180&fit=crop',
          deliveryInfo: 'Frais de livraison',
          deliveryFee: typeof restaurant.deliveryFee === 'number' ? `${restaurant.deliveryFee.toFixed(2)} €` : restaurant.deliveryFee,
          rating: typeof restaurant.rating === 'number' ? restaurant.rating.toFixed(1) : restaurant.rating,
          reviews: restaurant.reviewCount ? `${restaurant.reviewCount}+` : restaurant.reviews,
          deliveryTime: restaurant.deliveryTime,
          badge: restaurant.tags && restaurant.tags.length > 0 ? restaurant.tags[0] : restaurant.badge,
          promo: restaurant.promo || null,
          cuisine: restaurant.cuisine,
          isOpen: restaurant.isOpen
        }))
      } catch (error) {
        console.error('Erreur lors de la récupération des restaurants:', error)
        // Afficher un message d'erreur à l'utilisateur
        this.restaurants = []
      } finally {
        this.loading = false
      }
    },
    goToRestaurant (restaurant) {
      this.$router.push(`/restaurant/${restaurant.id}`)
    }
  }
}
</script>

<style scoped>
.restaurant-card {
  cursor: pointer;
  transition: transform 0.2s;
  border-radius: 8px;
}
.restaurant-card:hover {
  transform: translateY(-4px);
}
.position-relative {
  position: relative;
}
.badge-chip {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 1;
}
.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.9);
}
.promo-banner {
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}
h3 {
  font-size: 1rem;
}
</style>
