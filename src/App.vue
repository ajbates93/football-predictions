<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from './store'

const store = useStore()
store.fetchFixtures()

const loading = ref<boolean>(false)
const fixtures = store.orderedFixtures

loading.value = fixtures.length === 0

</script>

<template>
  <h1>Fixtures:</h1>
  <p v-if="loading">Loading...</p>
  <p v-for="fixture in store.orderedFixtures" :key="fixture.fixture.id">
    <span>{{fixture.teams.home.name}}</span>
    <span>v</span> 
    <span>{{fixture.teams.away.name}}</span>
  </p>
</template>
