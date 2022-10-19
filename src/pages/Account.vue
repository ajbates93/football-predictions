<script setup lang="ts">
import { onMounted } from 'vue';
import useAuthUser from '../composables/useAuthUser'
import { useStore } from '../store'
const { user, isLoggedIn } = useAuthUser()
const store = useStore()

onMounted(() => {
  if (!store.$state.userProfile)
    store.fetchUserProfile()
})

</script>

<template>
  <div text-left v-if="isLoggedIn() && user">
    <p text-5xl font-bold mb5>Hello, {{ user.user_metadata.options.data.firstName }}</p>
    <h5 py5 border="t [#313131]" text-3xl font-bold>Team name: Leeds United</h5>
    <h5 text-3xl font-bold py5 border="t [#313131]">Leagues</h5>
    <!-- <div my5 grid grid-cols-3 gap-2 bg-truegray-900 px5 py4 rounded-lg>
      <div font-bold>League Name</div>
      <div font-bold>Position</div>
      <div font-bold>Number of Teams</div>
      <div>League of Big Daigs</div>
      <div>8th</div>
      <div>24</div>
    </div> -->
    <p class='bg-#343434' inline-block px2 rounded-sm py2 text-lg>😟 Looks like you're not in any leagues. Join a league with a code or create your own!</p>
    <div flex items-center>
      <button inline-block mr1 my5 text-xl bg-green-600 text-white rounded-sm px3 py1>Join League</button>
      <button inline-block ml1 my5 text-xl bg-green-600 text-white rounded-sm px3 py1>Create League</button>
    </div>
  </div>
</template>
