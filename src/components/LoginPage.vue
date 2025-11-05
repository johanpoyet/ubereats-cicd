<template>
  <div>
    <!-- Navbar Uber Eats -->
    <v-app-bar app color="black" dark flat>
      <v-container>
        <v-row align="center">
          <v-col cols="auto">
            <span class="text-h6 font-weight-bold">Uber Eats</span>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-container fluid class="fill-height pa-0">
      <v-row class="fill-height" align="center" justify="center">
        <v-col cols="12" sm="8" md="4" class="d-flex flex-column align-center">

          <v-card class="pa-6" width="420">
          <v-card-text>
            <div class="text-center mb-4">
              <h3 class="font-weight-regular">Quel est votre numéro de téléphone ou votre adresse courriel?</h3>
            </div>

            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="email"
                placeholder="Indiquez un numéro de téléphone ou une adresse courriel"
                hide-details
                outlined
                dense
                class="mb-2 grey--text text--darken-1"
                @keyup.enter="onContinue"
              />

              <v-text-field
                v-model="password"
                placeholder="Mot de passe"
                type="password"
                hide-details
                outlined
                dense
                class="mb-4 grey--text text--darken-1"
                @keyup.enter="onContinue"
              />

              <v-alert v-if="error" type="error" dense class="mb-3">
                {{ error }}
              </v-alert>

              <v-btn
                class="mb-3"
                large
                block
                dark
                color="black"
                :loading="loading"
                @click="onContinue"
              >
                Continuer
              </v-btn>

              <div class="d-flex align-center my-3">
                <v-divider></v-divider>
                <div class="px-3 caption grey--text">ou</div>
                <v-divider></v-divider>
              </div>

              <v-btn block class="mb-3" color="grey lighten-3" elevation="0">
                <v-icon left>mdi-google</v-icon>
                Continuer avec Google
              </v-btn>

              <v-btn block class="mb-3" color="grey lighten-3" elevation="0">
                <v-icon left>mdi-apple</v-icon>
                Continuer avec Apple
              </v-btn>

              <div class="d-flex align-center my-3">
                <v-divider></v-divider>
                <div class="px-3 caption grey--text">ou</div>
                <v-divider></v-divider>
              </div>

              <v-btn block color="grey lighten-3" elevation="0">
                <v-icon left>mdi-qrcode</v-icon>
                Connectez-vous avec le code QR
              </v-btn>

              <div class="d-flex align-center my-3">
                <v-divider></v-divider>
                <div class="px-3 caption grey--text">Test rapide</div>
                <v-divider></v-divider>
              </div>

              <v-btn block color="green lighten-2" class="mb-2" @click="fillAdminCredentials">
                <v-icon left>mdi-account-circle</v-icon>
                Connexion Admin (Test)
              </v-btn>

              <v-btn block color="blue lighten-2" @click="fillUserCredentials">
                <v-icon left>mdi-account</v-icon>
                Connexion Utilisateur (Test)
              </v-btn>

              <div class="caption grey--text mt-4">
                En continuant, vous acceptez de recevoir des appels, y compris par composition automatique, WhatsApp ou textos d'Uber et de ses sociétés affiliées.
              </div>
            </v-form>
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>
import { authService } from '@/services/api'

export default {
  name: 'LoginPage',
  data () {
    return {
      email: '',
      password: '',
      loading: false,
      error: null
    }
  },
  methods: {
    fillAdminCredentials () {
      this.email = 'admin@ubereats.com'
      this.password = 'admin123'
      this.error = null
    },
    fillUserCredentials () {
      this.email = 'john@example.com'
      this.password = 'password123'
      this.error = null
    },
    async onContinue () {
      if (!this.email || !this.password) {
        this.error = 'Veuillez indiquer votre email et mot de passe'
        return
      }

      this.loading = true
      this.error = null

      try {
        await authService.login(this.email, this.password)
        // Redirection vers la page d'accueil
        this.$router.push('/home')
      } catch (error) {
        console.error('Erreur de connexion:', error)
        this.error = error.response?.data?.message || 'Erreur de connexion. Vérifiez vos identifiants.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.fill-height { min-height: calc(100vh - 64px); }
h3 { font-size: 1.125rem; }
.v-card { border-radius: 6px; }
</style>
