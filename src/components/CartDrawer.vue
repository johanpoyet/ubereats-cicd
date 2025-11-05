<template>
  <v-navigation-drawer
    v-model="isOpen"
    app
    right
    temporary
    width="400"
    class="cart-drawer"
  >
    <v-toolbar flat color="white">
      <v-toolbar-title class="font-weight-bold">Votre panier</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="closeCart">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-divider></v-divider>

    <div v-if="cartItems.length === 0" class="pa-6 text-center">
      <v-icon size="64" color="grey lighten-1">mdi-cart-outline</v-icon>
      <div class="mt-4 text-h6 grey--text">Votre panier est vide</div>
      <div class="caption grey--text">Ajoutez des articles pour commencer</div>
    </div>

    <v-list v-else class="cart-items">
      <v-list-item
        v-for="item in cartItems"
        :key="item.id"
        class="cart-item"
      >
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            {{ item.name }}
          </v-list-item-title>
          <v-list-item-subtitle class="caption">
            {{ item.restaurant }}
          </v-list-item-subtitle>
          <v-list-item-subtitle v-if="item.description" class="caption grey--text">
            {{ item.description }}
          </v-list-item-subtitle>

          <div class="d-flex align-center mt-2">
            <v-btn
              icon
              x-small
              color="grey"
              @click="decreaseQuantity(item)"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <span class="mx-3 font-weight-bold">{{ item.quantity }}</span>
            <v-btn
              icon
              x-small
              color="black"
              @click="increaseQuantity(item)"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-list-item-content>

        <v-list-item-action class="align-self-start">
          <div class="d-flex flex-column align-end">
            <div class="font-weight-bold">{{ formatPrice(item.price * item.quantity) }}</div>
            <v-btn
              icon
              x-small
              color="grey"
              class="mt-2"
              @click="removeItem(item.id)"
            >
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </div>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <template v-if="cartItems.length > 0">
      <v-divider></v-divider>

      <!-- Summary Section -->
      <div class="pa-4">
        <div class="d-flex justify-space-between mb-2">
          <span class="grey--text">Sous-total</span>
          <span class="font-weight-bold">{{ formatPrice(subtotal) }}</span>
        </div>
        <div class="d-flex justify-space-between mb-2">
          <span class="grey--text">Frais de livraison</span>
          <span class="font-weight-bold">{{ formatPrice(deliveryFee) }}</span>
        </div>
        <div class="d-flex justify-space-between mb-2">
          <span class="grey--text">Taxes</span>
          <span class="font-weight-bold">{{ formatPrice(taxes) }}</span>
        </div>
        <v-divider class="my-3"></v-divider>
        <div class="d-flex justify-space-between">
          <span class="text-h6 font-weight-bold">Total</span>
          <span class="text-h6 font-weight-bold">{{ formatPrice(total) }}</span>
        </div>
      </div>

      <v-divider></v-divider>

      <!-- Action Buttons -->
      <div class="pa-4">
        <v-btn
          block
          large
          color="black"
          dark
          class="mb-3"
          @click="checkout"
        >
          Passer la commande
        </v-btn>
        <v-btn
          block
          outlined
          color="grey"
          @click="clearAllItems"
        >
          Vider le panier
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CartDrawer',
  data () {
    return {
      deliveryFee: 3.99,
      taxRate: 0.1 // 10% de taxes
    }
  },
  computed: {
    ...mapGetters(['cartItems', 'cartTotal', 'isCartOpen']),
    isOpen: {
      get () {
        return this.isCartOpen
      },
      set (value) {
        if (!value) {
          this.closeCart()
        }
      }
    },
    subtotal () {
      return this.cartTotal
    },
    taxes () {
      return this.subtotal * this.taxRate
    },
    total () {
      return this.subtotal + this.deliveryFee + this.taxes
    }
  },
  methods: {
    ...mapActions(['removeFromCart', 'updateQuantity', 'clearCart', 'closeCart']),
    formatPrice (price) {
      return `${price.toFixed(2)} €`
    },
    increaseQuantity (item) {
      this.updateQuantity({
        itemId: item.id,
        quantity: item.quantity + 1
      })
    },
    decreaseQuantity (item) {
      this.updateQuantity({
        itemId: item.id,
        quantity: item.quantity - 1
      })
    },
    removeItem (itemId) {
      this.removeFromCart(itemId)
    },
    clearAllItems () {
      if (confirm('Êtes-vous sûr de vouloir vider le panier ?')) {
        this.clearCart()
      }
    },
    checkout () {
      // TODO: Implémenter la logique de checkout
      alert(`Commande de ${this.formatPrice(this.total)} prête à être validée !`)
      this.closeCart()
    }
  }
}
</script>

<style scoped>
.cart-drawer {
  display: flex;
  flex-direction: column;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
}

.cart-item {
  border-bottom: 1px solid #f0f0f0;
}
</style>
