<script setup lang="ts">
import { useStore } from '../store'
import useAuthUser from '../composables/useAuthUser'
import { onBeforeMount, ref } from 'vue';
import { useDark, useToggle } from '@vueuse/core'
const store = useStore()
const logIn = () => store.toggleShowLogIn(true)
const { user, isLoggedIn } = useAuthUser()
const stickyHeader = ref(false)

const handleScroll = () => {
  window.pageYOffset ? stickyHeader.value = true : stickyHeader.value = false
}

const isDark = useDark()
const toggleDark = useToggle(isDark)

onBeforeMount(() => window.addEventListener('scroll', handleScroll))

</script>

<template>
  <header fixed top-0 left-0 w-full p3 z-22 :class="stickyHeader ? 'bg-green-600' : 'bg-transparent'">
    <nav flex justify-between items-center>
      <div flex items-center>
        <router-link font-bold text-xl hover:text-green-500 flex items-center to="/"><span inline-block text-white mr3 text-2xl i-iconoir-soccer-ball></span>Pred.io</router-link>
        <span v-if="isLoggedIn() && user" ml2>- Logged in as <b>{{ user.user_metadata.name }}</b></span>
      </div>
      <div flex items-center>
        <button v-if="!isLoggedIn()" @click="logIn" text-lg hover:text-green-500 ml3 text-white inline-block flex items-center>Log In <i ml-2 text-3xl inline-block i-carbon-login></i></button>
        <router-link v-if="isLoggedIn()" text-lg hover:text-green-500 mx3 to="/predictions">Fixtures & Predictions</router-link>
        <span v-if="isLoggedIn()">|</span>
        <router-link v-if="isLoggedIn()" text-3xl hover:text-green-500 ml3 i-carbon-user-avatar-filled text-white inline-block to="/account"></router-link>
        <router-link v-if="isLoggedIn()" text-3xl hover:text-green-500 mx3 i-carbon-settings text-white inline-block to="/settings"></router-link>
        <button @click="toggleDark()" dark:i-carbon-sun i-carbon-moon dark:text-yellow-300 text-white text-3xl></button>
      </div>
    </nav>
  </header>
</template>