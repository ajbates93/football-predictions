<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { useAuthUser } from '@/composables'

const store = useStore()
const router = useRouter()
const { signOut } = useAuthUser()

const showSignOutForm = ref(false)

const handleSubmit = async () => {
  try {
    await signOut()
    router.push('/')
    store.showLogOut = false
  } catch (error) {
    alert(error)
  }
}

</script>

<template>
  <div v-if="store.showLogOut" fixed top-0 left-0 w-screen grid place-items-center h-screen z-30>
    <div fixed w-screen h-screen z-30 bg-black opacity-70></div>
    <div w-200 h-100 bg-slate-800 rounded-xl overflow-hidden z-31 relative>
      <div class="background" absolute left-0 top-0 w-full h-full z-18></div>
      <div relative z-20 p10 m10 flex flex-col items-center justify-center>
        <button @click="store.showLogOut = false" inline-block absolute top-5 right-5 i-carbon-close text-3xl text-slate-300 hover:text-white></button>
        <h1 text-4xl font-bold mb5>Are you sure you want to log out?</h1>
        <p text-xl>You can log back in any time.</p>
        <button @click="handleSubmit" bg-green-600 rounded-lg text-white flex items-center justify-center mx-auto my-2 mt-5 py1 px3 font-bold text-lg>Log Out</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  background-color: #242424;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23343434' fill-opacity='0.3' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
}
</style>