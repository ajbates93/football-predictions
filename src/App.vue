<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from './store'
import Fixture from './components/Fixture.vue'

const store = useStore()
store.fetchFixtures()

const activePredictions = ref(false)
const savePredictions = ref(false)

</script>

<template>
  <h1 text-5xl font-bold mb5>Fixtures</h1>
  <p v-if="store.loading">Loading...</p>
  <Fixture v-for="fixture in store.orderedFixtures" 
    :fixture="fixture"
    :showPrediction="activePredictions" 
    :savePrediction="savePredictions"
    :key="fixture.fixture.id" />
  <div my5>
    <button @click="activePredictions = !activePredictions" 
      bg-green-600 text-white rounded-sm px3 py1>{{activePredictions ? 'Hide' : 'Show'}} Predictions!</button>
    <button v-if="activePredictions" @click="savePredictions = true" 
      bg-green-600 text-white rounded-sm px3 py1>Save Predictions!</button>
  </div>
  <div v-if="store.predictions.length">
    <h3 text-3xl font-bold mb5>Current Predictions</h3>
    <div v-for="prediction in store.predictions" :key="prediction.id">
      {{ prediction }}
    </div>
  </div>
</template>
