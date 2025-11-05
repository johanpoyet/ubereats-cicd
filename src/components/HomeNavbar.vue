<template>
  <v-app-bar app color="white" flat elevate-on-scroll>
    <v-container fluid>
      <v-row align="center" no-gutters>
        <v-col cols="auto">
          <v-btn icon @click="$emit('toggle-drawer')">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-col>

        <v-col cols="auto" class="ml-3">
          <div class="d-flex align-center">
            <span class="text-h6 font-weight-bold">Uber Eats</span>
          </div>
        </v-col>

        <v-col cols="auto" class="ml-6">
          <v-chip outlined>
            <v-icon small left>mdi-bike</v-icon>
            Livraison
          </v-chip>
        </v-col>

        <v-col cols="auto" class="ml-3">
          <v-chip outlined>
            <v-icon small left>mdi-package-variant</v-icon>
            À emporter
          </v-chip>
        </v-col>

        <v-col cols="auto" class="ml-6">
          <v-btn text>
            <v-icon left>mdi-map-marker</v-icon>
            32 Allée Jean-Paul II · Maintenant
            <v-icon right small>mdi-chevron-down</v-icon>
          </v-btn>
        </v-col>

        <v-spacer></v-spacer>

        <v-col cols="3">
          <v-text-field
            placeholder="Rechercher dans Uber Eats"
            prepend-inner-icon="mdi-magnify"
            outlined
            dense
            hide-details
          />
        </v-col>

        <v-col cols="auto" class="ml-3">
          <v-btn icon @click="toggleCart">
            <v-badge
              color="green"
              :content="cartItemCount"
              :value="cartItemCount > 0"
              overlap
            >
              <v-icon>mdi-cart-outline</v-icon>
            </v-badge>
          </v-btn>
        </v-col>        <v-col cols="auto" class="ml-2">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-account-circle</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ userEmail }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click="logout">
                <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Déconnexion</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { authService } from '@/services/api'

export default {
  name: 'HomeNavbar',
  computed: {
    ...mapGetters(['cartItemCount']),
    userEmail () {
      const user = authService.getCurrentUser()
      return user ? user.email : ''
    }
  },
  methods: {
    ...mapActions(['toggleCart']),
    logout () {
      authService.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.v-chip {
  cursor: pointer;
}
</style>
