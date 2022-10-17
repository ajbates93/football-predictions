<script setup lang="ts">
import useAuthUser from '../composables/useAuthUser'
const { user, isLoggedIn } = useAuthUser()
</script>

<template>
  <div v-if="isLoggedIn() && user">
    <h1 text-5xl font-bold mb5>Account</h1>
    <p text-2xl>Hello, {{ user.user_metadata.options.data.firstName }}</p>
  </div>
</template>
