<script setup lang="ts">

</script>

<template>
  <section flex items-center justify-center flex-col min-h-150 text-center mx-auto id="homepage">
    <h1 text-5xl font-bold mb10>Welcome to Pred.io!</h1>
    <h3 text-2xl my5>Predict multiple fixtures each gameweek. Join a league with your friends and compete to be top of the table!</h3>
    <h3 text-2xl mt5>Get started by registering for an account below.</h3>
    <router-link as="button" to="/register" inline-block my5 text-xl bg-green-600 text-white rounded-sm px3 py1>Register</router-link>
  </section>
</template>