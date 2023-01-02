<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { useAuthUser } from '@/composables'

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
  <div v-if="store.showLogIn" fixed top-0 left-0 w-screen grid place-items-center h-screen z-30>
    <div fixed w-screen h-screen z-30 bg-black opacity-70></div>
    <div w-200 h-100 bg-slate-800 rounded-xl overflow-hidden z-31 relative>
      <div class="background" absolute left-0 top-0 w-full h-full z-18></div>
      <div relative z-20 p10 m10 flex flex-col items-center justify-center>
        <h1 text-4xl font-bold mb5>Sign In</h1>
        <button @click="store.toggleShowLogIn(false)" inline-block absolute top-5 right-5 i-carbon-close text-3xl text-slate-300 hover:text-white></button>
        <div v-if="!showSignInForm" text-center>
          <div flex gap-3 justify-center items-center>
            <button bg-blue-600 text-white rounded-lg flex items-center justify-center mt-5 py1 px3 font-bold text-lg 
              @click="showSignInForm = true"><span i-carbon-email inline-block text-xl mr3></span>Sign in with Email</button>
            <button bg-blue-600 text-white rounded-lg flex items-center justify-center mt-5 py1 px3 font-bold text-lg 
              @click="signInWithGoogle"><span i-carbon-logo-google inline-block text-xl mr3></span>Sign in with Google</button>
          </div>
          <p my-5 text-lg text-center text-gray-300>Not yet signed up? Register here!</p>
          <button @click="register" bg-green-600 rounded-lg text-white flex items-center justify-center mx-auto my-2 py1 px3 font-bold text-lg><span i-carbon-user-avatar-filled-alt inline-block text-xl mr3></span>Register</button>
        </div>
        <div v-else>
          <form @submit.prevent="handleSubmit">
            <label>Email <input v-model="form.email" type="email" /></label>
            <label>Password <input v-model="form.password" type="password" /></label>
          </form>
        </div>
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