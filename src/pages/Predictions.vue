<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from '@/store'
import { ComponentWrapper, Fixture, GameweekSelector, Loading } from '@/components'

const store = useStore()

onMounted(async () => {
  await store.fetchFixtures(store.selectedGameweekTitle)
  await store.fetchPredictions()
})

const editPredictions = ref(false)
const savePredictions = ref(false)
const loading = ref(false)

const cancel = () => {
  savePredictions.value = false
  editPredictions.value = false
}
const edit = () => {
  savePredictions.value = false
  editPredictions.value = true
  store.fetchPredictions()
}
const save = () => {
  savePredictions.value = true
  editPredictions.value = false
}
const submit = () => {
  loading.value = true
  store.insertPredictions()
  savePredictions.value = false
  loading.value = false
}
</script>

<template>
  <section text-center mx-auto class="bg-[#242424]" py-20>
    <ComponentWrapper>
      <h1 text-5xl font-bold mb5 text-center>Fixtures</h1>
      <GameweekSelector />
      <p v-if="store.loading">
        <Loading />
      </p>
      <template v-else>
        <template v-if="store.orderedFixturesWithPredictions.length === 0 && !store.allFixturesComplete">
          <Fixture v-for="fixture in store.orderedFixtures" 
            :fixture="fixture"
            :editPrediction="editPredictions" 
            :savePrediction="savePredictions"
            :key="fixture.id" />
        </template>
        <template v-else-if="store.orderedFixturesWithPredictions.length === 0 && store.allFixturesComplete">
          <Fixture v-for="fixture in store.orderedFixtures" 
            :fixture="fixture"
            complete
            :editPrediction="editPredictions" 
            :savePrediction="savePredictions"
            :key="fixture.id" />
        </template>
        <template v-else>
          <Fixture v-for="fixture in store.orderedFixturesWithPredictions" 
            :fixture="fixture"
            complete
            :editPrediction="editPredictions" 
            :savePrediction="savePredictions"
            :key="fixture.id" />
        </template>
        <div my5 flex justify-center v-if="!store.allFixturesPredicted && !store.allFixturesComplete">
          <button @click="cancel" v-if="editPredictions"
            bg-gray-600 text-white rounded-sm px3 py1 mx-2>Cancel</button>
          <button @click="edit"  v-if="!editPredictions"
            bg-green-600 text-white rounded-sm px3 py1 mx-2>Make Predictions!</button>
          <button v-if="editPredictions" @click="save" 
            bg-green-600 text-white rounded-sm px3 py1 mx-2>Save Predictions!</button>
        </div>
        <div my5 flex justify-center>
          <button v-if="!editPredictions && savePredictions" @click="submit" 
            bg-red-600 text-white rounded-sm px3 py1 mx-2>{{ loading ? 'Submitting...' : 'Submit Predictions!'}}</button>
        </div>
      </template>
    </ComponentWrapper>
  </section>
</template>
