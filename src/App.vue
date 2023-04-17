<script setup lang="ts">
import { useAuthStore } from './stores/authStore';

const isAuth = useAuthStore().isAuth
</script>

<template>
  <router-view ></router-view>
</template>

<style scoped>
</style>
