<template>
  <header fixed top-0 left-0 w-full bg-gray-800 p3>
    <nav flex justify-between items-center>
      <div>
        <router-link font-bold text-xl hover:text-green-500 flex items-center to="/"><span inline-block text-white mr3 text-2xl i-iconoir-soccer-ball></span>Pred.io</router-link>
      </div>
      <div flex items-center>
        <router-link text-lg hover:text-green-500 mx3 to="/predictions">Fixtures & Predictions</router-link>
        <span>|</span>
        <router-link text-3xl hover:text-green-500 ml3 i-carbon-user-avatar-filled text-white inline-block to="/account"></router-link>
        <router-link text-3xl hover:text-green-500 mx3 i-carbon-settings text-white inline-block to="/settings"></router-link>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

</style>