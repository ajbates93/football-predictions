<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from '@/store'
import { ComponentWrapper, GameweekSelector, Loading, Legend } from '@/components'
import { Fixture } from '@/components/fixture'

const store = useStore()

onMounted(async () => {
  await Promise.allSettled([
    await store.fetchFixtures(store.selectedGameweekTitle),
    await store.fetchPredictions()
  ])
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
        <!-- TODO: Predictions did not appear after clicking 'Save'. -->
        <Fixture v-for="fixture in store.orderedCompletedFixturesWithPredictions"
          :fixture="fixture"
          :editPrediction="editPredictions" 
          :savePrediction="savePredictions"
          :key="fixture.id"
          :fixtureId="fixture.id"
          :complete="store.allFixturesComplete || store.selectedGameweek < store.gameweek.round" />
        <div v-if="!store.allPredictionsSubmitted">
          <div my5 flex justify-center v-if="!store.allFixturesComplete">
            <button @click="cancel" v-if="editPredictions"
              bg-gray-600 text-white rounded-sm px3 py1 mx-2>Cancel</button>
            <button @click="edit"  v-if="!editPredictions && store.selectedGameweek == store.gameweek.round"
              bg-green-600 text-white rounded-sm px3 py1 mx-2>{{ store.newPredictions.length === 0 ? 'Make' : 'Edit' }} Predictions</button>
            <button v-if="editPredictions" @click="save" 
              bg-green-600 text-white rounded-sm px3 py1 mx-2>Save Predictions</button>
          </div>
          <div my5 flex justify-center>
            <button v-if="!editPredictions && savePredictions" @click="submit" 
              bg-red-600 text-white rounded-sm px3 py1 mx-2>{{ loading ? 'Submitting...' : 'Submit Predictions'}}</button>
          </div>
        </div>
        <div v-else my-5 inline-flex mx-auto items-center text-lg>
          All predictions have been submitted - good luck! <i i-carbon-checkmark-outline text-green-600 inline-block ml-2 text-lg></i>
        </div>
      </template>
    </ComponentWrapper>
  </section>
  <Legend />
</template>
