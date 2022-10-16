<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../store'

const store = useStore()
store.fetchFixtures()

const editPredictions = ref(false)
const savePredictions = ref(false)

const edit = () => {
  savePredictions.value = false
  editPredictions.value = true
}
const save = () => {
  savePredictions.value = true
  editPredictions.value = false
}

</script>

<template>
  <h1 text-5xl font-bold mb5>Fixtures</h1>
  <p v-if="store.loading">Loading...</p>
  <Fixture v-for="fixture in store.orderedFixtures" 
    :fixture="fixture"
    :editPrediction="editPredictions" 
    :savePrediction="savePredictions"
    :key="fixture.fixture.id" />
  <div my5 flex justify-center>
    <button @click="edit" 
      bg-green-600 text-white rounded-sm px3 py1 mx-2>{{editPredictions ? 'Cancel' : 'Make'}} Predictions!</button>
    <button v-if="editPredictions" @click="save" 
      bg-green-600 text-white rounded-sm px3 py1 mx-2>Save Predictions!</button>
  </div>
</template>
