<template>
  <div class="app-name d-flex align-center">
    <v-icon class="mr-2" color="deep-orange">mdi-food</v-icon>
    <div>
      <div class="title">UberEats Clone</div>
      <div class="subtitle grey--text text--darken-1">Livraison rapide près de chez vous</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppName'
}
</script>

<style scoped>
.app-name .title {
  font-weight: 700;
  font-size: 1.1rem;
}
.app-name .subtitle {
  font-size: 0.75rem;
}
</style>
