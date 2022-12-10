<script setup lang="ts">

</script>

<template>
  <Header />
  <Login />
  <div bg-white class="dark:bg-[#242424]" min-h-screen>
    <router-view />
  </div>
  <footer flex items-center justify-between pa-5 border="t-1 #343434">
    <div>Copyright Pred.io 2022 &copy;</div>
    <div>Like this site? <a font-bold underline target="_blank" href="https://ko-fi.com/ajbates93">Buy me a ko-fi!</a></div>
  </footer>
</template>
