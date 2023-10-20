<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarComponent from '@/components/layouts/NavbarComponent.vue'
import { useUser } from './composables/useUser'
import { onMounted } from 'vue'

onMounted(() => {
  getUserFromLocalStorage()
})

const { user, getUserFromLocalStorage } = useUser()
</script>

<template>
  <template v-if="user?.status === 'admin'">
    <AdminPanel />
  </template>

  <NavbarComponent />
  <RouterView />
</template>

<style scoped></style>
