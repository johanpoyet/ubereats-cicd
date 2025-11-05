<template>
  <div class="cuisine-types-container py-4">
    <v-row align="center" no-gutters class="mb-4">
      <v-col>
        <div class="d-flex align-center overflow-x-auto">
          <v-btn icon small class="mr-2">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <div class="d-flex align-center">
            <div
              v-for="(type, idx) in cuisineTypes"
              :key="idx"
              class="cuisine-item text-center mx-2"
            >
              <v-avatar size="60" class="mb-1">
                <v-img :src="type.image" />
              </v-avatar>
              <div class="caption">{{ type.name }}</div>
            </div>
          </div>

          <v-btn icon small class="ml-2">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'CuisineTypes',
  data () {
    return {
      cuisineTypes: [
        { name: 'Offres', image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=150&h=150&fit=crop', icon: 'mdi-percent' },
        { name: 'Courses', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&h=150&fit=crop', icon: 'mdi-shopping' },
        { name: 'Pizzas', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&h=150&fit=crop', icon: 'mdi-pizza' },
        { name: 'Desserts', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=150&h=150&fit=crop', icon: 'mdi-cake' },
        { name: 'Sushis', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=150&h=150&fit=crop', icon: 'mdi-food-variant' },
        { name: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&h=150&fit=crop', icon: 'mdi-hamburger' },
        { name: 'Asiatique', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=150&h=150&fit=crop', icon: 'mdi-noodles' },
        { name: 'Halal', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=150&h=150&fit=crop', icon: 'mdi-food-drumstick' },
        { name: 'Fast food', image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=150&h=150&fit=crop', icon: 'mdi-food' },
        { name: 'Chinoise', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=150&h=150&fit=crop', icon: 'mdi-food-takeout-box' },
        { name: 'Italienne', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=150&h=150&fit=crop', icon: 'mdi-pasta' },
        { name: 'Street food', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=150&h=150&fit=crop', icon: 'mdi-taco' }
      ]
    }
  }
}
</script>

<style scoped>
.cuisine-types-container {
  border-bottom: 1px solid #e0e0e0;
}
.cuisine-item {
  min-width: 80px;
  cursor: pointer;
  transition: transform 0.2s;
}
.cuisine-item:hover {
  transform: scale(1.05);
}
.overflow-x-auto {
  overflow-x: auto;
  scrollbar-width: none;
}
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
</style>
