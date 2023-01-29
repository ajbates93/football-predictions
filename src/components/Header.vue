<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useStore } from '@/store'
import { useAuthUser } from '@/composables'
import { useDark, useToggle } from '@vueuse/core'
import { Logout } from '@/components'

const store = useStore()
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
  <header fixed top-0 left-0 w-full p3 z-22 transition :class="stickyHeader ? 'bg-green-600' : 'bg-transparent'">
    <nav flex justify-between items-center>
      <div flex items-center>
        <router-link font-bold text-xl hover:text-green-500 flex items-center to="/"><span inline-block text-white mr3 text-2xl i-iconoir-soccer-ball></span>Pred.io</router-link>
        <span v-if="isLoggedIn() && user" ml2>- Logged in as <b>{{ user.user_metadata.name }}</b></span>
      </div>
      <div flex items-center gap-x-1>
        <button v-if="!isLoggedIn()" @click="store.showLogIn = true" text-lg hover:text-green-500 ml3 text-white inline-block flex items-center>Log In <i ml-2 text-3xl inline-block i-carbon-login></i></button>
        <router-link v-if="isLoggedIn()" text-lg hover:text-green-500 mx3 to="/predictions">Fixtures & Predictions</router-link>
        <span v-if="isLoggedIn()">|</span>
        <router-link v-if="isLoggedIn()" text-3xl hover:text-green-500 ml3 i-carbon-user-avatar-filled text-white inline-block to="/account"></router-link>
        <button v-if="isLoggedIn()" @click="store.showLogOut = true" text-3xl hover:text-green-500 ml3 i-carbon-user-avatar-filled text-white inline-block i-carbon-logout>Log Out</button>
        <!-- <router-link v-if="isLoggedIn()" text-3xl hover:text-green-500 mx3 i-carbon-settings text-white inline-block to="/settings"></router-link> -->
        <button @click="toggleDark()" dark:i-carbon-sun i-carbon-moon dark:text-yellow-300 text-white text-3xl></button>
      </div>
    </nav>
  </header>
  <Logout v-if="store.showLogOut" />
</template>