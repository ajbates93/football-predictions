<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from './store'
import Fixture from './components/Fixture.vue'

const store = useStore()
store.fetchFixtures()

</script>

<template>
  <h1 text-5xl font-bold mb5>Fixtures</h1>
  <p v-if="store.loading">Loading...</p>
  <Fixture v-for="fixture in store.orderedFixtures" :fixture="fixture" :date="fixture.fixture.date" :key="fixture.fixture.id" />
</template>
