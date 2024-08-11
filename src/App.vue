<template>
  <div id="app" class="container mt-4">
    <nav class="mb-4">
      <router-link to="/" class="btn btn-primary me-2">Home</router-link>
      <router-link to="/stats" class="btn btn-secondary">Stats</router-link>
    </nav>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { provide } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    provide('store', store)
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>