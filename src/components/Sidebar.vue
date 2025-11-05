<template>
  <v-navigation-drawer
    :value="drawer"
    @input="$emit('update:drawer', $event)"
    app
    width="230"
  >
    <v-list dense nav>
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        link
        :class="{ 'v-list-item--active grey lighten-4': item.active }"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'SidebarMenu',
  props: {
    drawer: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      menuItems: [
        { title: 'Domicile', icon: 'mdi-home', active: true },
        { title: 'Courses', icon: 'mdi-clock-outline', active: false },
        { title: 'Épicerie', icon: 'mdi-store', active: false },
        { title: 'Alcool', icon: 'mdi-glass-wine', active: false },
        { title: 'Santé', icon: 'mdi-medical-bag', active: false },
        { title: 'Boutique', icon: 'mdi-shopping', active: false },
        { title: 'Animal de compagnie', icon: 'mdi-paw', active: false },
        { title: 'Fleurs', icon: 'mdi-flower', active: false },
        { title: 'Hygiène', icon: 'mdi-heart-outline', active: false }
      ]
    }
  }
}
</script>

<style scoped>
.v-list-item--active {
  background-color: #f5f5f5;
}
</style>
