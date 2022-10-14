<script setup lang="ts">
import { createPinia } from 'pinia';
import { ref, watch } from 'vue';
import { useStore } from '../store'
import { IFixture, IPredictedFixture } from '../types';

const store = useStore()
const props = defineProps<{
  fixture: IFixture
  editPrediction: boolean,
  savePrediction: boolean
}>()

const homePrediction = ref(0)
const awayPrediction = ref(0)

const hasCompletePrediction = ref(false)
let completePrediction = ref<IPredictedFixture>()

watch(() =>  props.savePrediction, () => {
  if (props.savePrediction)
    store.savePrediction({
      id: 0,
      fixtureId: props.fixture.fixture.id,
      homeGoals: parseInt(homePrediction.value.toString()),
      awayGoals: parseInt(awayPrediction.value.toString()),
      xG: 0
    })
})

watch(() => store.orderedFixturesWithPredictions, (value, oldValue) => {
  if (value.length > 0) {
    if (oldValue !== value) {
      let exists = value.find(x => x.fixtureId === props.fixture.fixture.id)
      if (exists) {
        completePrediction.value = exists
        hasCompletePrediction.value = true
      }
    }
  }
})

const showDate = ref<boolean>(false)
const first = store.orderedFixtures.find(x => new Date(x.fixture.date).toLocaleDateString() === new Date(props.fixture.fixture.date).toLocaleDateString())
if (first)
  showDate.value = first.fixture.id === props.fixture.fixture.id
  
</script>

<template>
  <p mt5 mb1 text-xl v-if="showDate">{{new Date(fixture.fixture.date).toLocaleDateString()}}</p>
  <div mb1 grid style="grid-template-columns: 3fr 1fr 3fr">
    <span px1 text-right inline-block>{{fixture.teams.home.name}}</span>
    <span grid-col-a text-center px1 inline-block>v</span> 
    <span px1 text-left inline-block>{{fixture.teams.away.name}}</span>
  </div>
  <div v-if="editPrediction"
    grid mb2 style="grid-template-columns: 3fr 1fr 3fr">
    <input inputmode="numeric" rounded-sm justify-self-end mx1 inline-block w-10 text-center v-model="homePrediction" />
    <span text-center px1 inline-block></span>
    <input inputmode="numeric" rounded-sm justify-self-start mx1 inline-block w-10 text-center v-model="awayPrediction" />
  </div>
  <div v-if="completePrediction && !editPrediction"
    grid mb2 style="grid-template-columns: 3fr 1fr 3fr">
    <span rounded-sm justify-self-end mx1 inline-block w-10 text-center>{{completePrediction.homeGoals}}</span>
    <span text-center px1 inline-block></span>
    <span rounded-sm justify-self-start mx1 inline-block w-10 text-center>{{completePrediction.awayGoals}}</span>
  </div>
</template>