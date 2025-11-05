import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    cartDrawer: false
  },
  getters: {
    cartItems: state => state.cart,
    cartItemCount: state => {
      return state.cart.reduce((total, item) => total + item.quantity, 0)
    },
    cartTotal: state => {
      return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    isCartOpen: state => state.cartDrawer
  },
  mutations: {
    ADD_TO_CART (state, item) {
      const existingItem = state.cart.find(i => i.id === item.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.cart.push({
          ...item,
          quantity: 1
        })
      }
    },
    REMOVE_FROM_CART (state, itemId) {
      state.cart = state.cart.filter(item => item.id !== itemId)
    },
    UPDATE_QUANTITY (state, { itemId, quantity }) {
      const item = state.cart.find(i => i.id === itemId)
      if (item) {
        if (quantity <= 0) {
          state.cart = state.cart.filter(i => i.id !== itemId)
        } else {
          item.quantity = quantity
        }
      }
    },
    CLEAR_CART (state) {
      state.cart = []
    },
    SET_CART_DRAWER (state, isOpen) {
      state.cartDrawer = isOpen
    },
    TOGGLE_CART_DRAWER (state) {
      state.cartDrawer = !state.cartDrawer
    }
  },
  actions: {
    addToCart ({ commit }, item) {
      commit('ADD_TO_CART', item)
    },
    removeFromCart ({ commit }, itemId) {
      commit('REMOVE_FROM_CART', itemId)
    },
    updateQuantity ({ commit }, payload) {
      commit('UPDATE_QUANTITY', payload)
    },
    clearCart ({ commit }) {
      commit('CLEAR_CART')
    },
    openCart ({ commit }) {
      commit('SET_CART_DRAWER', true)
    },
    closeCart ({ commit }) {
      commit('SET_CART_DRAWER', false)
    },
    toggleCart ({ commit }) {
      commit('TOGGLE_CART_DRAWER')
    }
  }
})
