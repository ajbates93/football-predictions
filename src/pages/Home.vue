<script setup lang="ts">
import { useStore } from '../store'
import useAuthUser from '../composables/useAuthUser'

const store = useStore()
const { isLoggedIn } = useAuthUser()

const logIn = () => store.toggleShowLogIn(true)
</script>

<template>
  <section text-center mx-auto relative id="homepage" >
    <div class="page-background" absolute left-0 top-0 w-full h-full z-18></div>
    <div class="page-content" flex items-center justify-center flex-col relative z-20 border="b #343434">
      <h1 text-5xl font-bold mb10>Welcome to Pred.io!</h1>
      <h3 text-2xl my5>Predict multiple fixtures each gameweek. Join a league with your friends and compete to be top of the table!</h3>
      <h3 text-2xl my5 v-if="!isLoggedIn()">Get started by registering for an account below.</h3>
      <div flex justify-center items-center gap-5>
        <template v-if="isLoggedIn()">
          <router-link as="button" to="/predictions" inline-block my5 text-xl bg-green-600 text-white rounded px3 py2>Fixtures &amp; Predictions</router-link>
          <router-link as="button" to="/account" inline-block my5 text-xl bg-green-600 text-white rounded px3 py2>Account</router-link>
        </template>
        <template v-else>
          <router-link as="button" to="/register" inline-block my5 text-xl bg-green-600 text-white rounded px3 py2>Register</router-link>
          <button as="button" @click="logIn" inline-block my5 text-xl bg-blue-600 text-white rounded px3 py2>Log In</button>
        </template>
      </div>
    </div>
  </section>
  <section py-5 bg-white class="dark:bg-[#242424]" text-green-600 dark:text-white text-center text-xl>
    <div>
      <p>Some other stuff...</p>
    </div>
  </section>
</template>

<style>
.page-background {
  background-color: #242424;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23343434' fill-opacity='0.3' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
}
.page-content {
  min-height: 75vh;
}
</style>