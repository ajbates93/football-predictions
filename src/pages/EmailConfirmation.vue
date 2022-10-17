<script setup lang="ts">

</script>

<template>
  <div v-if="$route.query.confirmationSuccess == 'true'">
    <h1 text-5xl font-bold mb10>Registration Complete!</h1>
    <p text-2xl>You're ready to start making predictions!</p>
    <router-link as="button" to="/predictions" inline-block my5 text-xl bg-green-600 text-white rounded-sm px3 py1>Let's Go!</router-link>
  </div>
  <div v-else>
    <h1 text-5xl font-bold mb10>Thanks for registering!</h1>
    <p text-2xl>Please confirm your email to finish registering. This has been sent to {{ $route.query.email }}</p>
  </div>
</template>
