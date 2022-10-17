<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../store'
import { useRouter } from 'vue-router'

import useAuthUser from '../composables/useAuthUser'

const store = useStore()
const router = useRouter()
const { signInWithGoogle, signIn } = useAuthUser()

const showSignInForm = ref(false)

const form = ref({
  email: "",
  password: ""
})

const handleSubmit = async () => {
  try {
    await signIn(form.value)
    router.push('/account')
  } catch (error) {
    alert(error)
  }
}

const register = () => {
  store.toggleShowLogIn(false)
  router.push('/register')
}

</script>

<template>
  <div v-if="store.showLogIn" fixed top-0 left-0 w-screen grid place-items-center h-screen>
    <div fixed w-screen h-screen z-10 bg-black opacity-70></div>
    <div w-200 h-100 bg-slate-800 rounded-xl z-11 p10 m10 relative flex flex-col items-center justify-center>
      <h1 text-3xl font-bold mb3>Sign In</h1>
      <p>Choose from one of the options below, or register for an account.</p>
      <button @click="store.toggleShowLogIn(false)" inline-block absolute top-5 right-5 i-carbon-close text-3xl text-slate-300 hover:text-white></button>
      <div v-if="!showSignInForm">
        <div flex justify-center items-center>
          <button bg-white rounded-2xl text-slate-600 flex items-center justify-center mx-2 mt-5 py1 px3 font-bold @click="showSignInForm = true"><span i-carbon-email inline-block text-xl text-red mr3></span>Sign in with Email</button>
          <button bg-white rounded-2xl text-slate-600 flex items-center justify-center mx-2 mt-5 py1 px3 font-bold @click="signInWithGoogle"><span i-carbon-logo-google inline-block text-xl text-red mr3></span>Sign in with Google</button>
        </div>
        <div text-3xl>-</div>
        <button @click="register" bg-white rounded-2xl text-slate-600 flex items-center justify-center mx-auto my-2 py1 px3 font-bold><span i-carbon-user-avatar-filled-alt inline-block text-xl text-red mr3></span>Register</button>
      </div>
      <div v-else>
        <form @submit.prevent="handleSubmit">
          <label>Email <input v-model="form.email" type="email" /></label>
          <label>Password <input v-model="form.password" type="password" /></label>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>