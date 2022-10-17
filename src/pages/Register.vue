<script setup lang="ts">
import { ref } from 'vue'
import useAuthUser from '../composables/useAuthUser'
import { useRouter } from 'vue-router'
const router = useRouter()
const { register } = useAuthUser()

const form = ref({
  email: "",
  password: "",
  meta: {
    firstName: "",
    lastName: ""
  }
})

const handleSubmit = async () => {
  try {
    await register(form.value)
    router.push({
      name: "EmailConfirmation",
      query: { email: form.value.email }
    })
  } catch (error) {
    alert(error)
  }
}
</script>

<template>
  <form max-w-lg m-auto @submit.prevent="handleSubmit">
    <h1 class="text-5xl mb-10">Register</h1>
    <p my2 mx2 text-lg>
      <label>First Name: <input px2 py1 rounded v-model="form.meta.firstName" type="text" /></label>
    </p>
    <p my2 mx2 text-lg>
      <label>Last Name: <input px2 py1 rounded v-model="form.meta.lastName" type="text" /></label>
    </p>
    <p my2 mx2 text-lg>
      <label>Email: <input px2 py1 rounded v-model="form.email" type="email" /></label>
    </p>
    <p my2 mx2 text-lg>
      <label>Password: <input px2 py1 rounded v-model="form.password" type="password" /></label>
    </p>
    <button inline-block my5 text-xl bg-green-600 text-white rounded-sm px3 py1>Register</button>
  </form>
</template>

<style scoped>

</style>