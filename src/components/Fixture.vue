<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from '@/store'
import { IFixture, IPredictedFixture, ICreatePrediction, ICompletePredictedFixture } from '@/types';

const store = useStore()
const props = defineProps<{
  fixture: IFixture | IPredictedFixture
  editPrediction: boolean,
  savePrediction: boolean,
  complete?: boolean,
  fixtureId: number
}>()

const homePrediction = ref(0)
const awayPrediction = ref(0)

const hasCompletePrediction = ref(false)
let completePrediction = ref<IPredictedFixture>()

watch(() =>  props.savePrediction, () => {
  if (props.savePrediction) {
    const pIdx = store.predictions.findIndex(x => x.fixtureId === props.fixture.id)
      const pId = pIdx !== -1 ? store.predictions[pIdx].id : -1
      store.savePrediction({
        id: pId,
        fixtureId: props.fixture.id,
        homeGoals: parseInt(homePrediction.value.toString()),
        awayGoals: parseInt(awayPrediction.value.toString()),
        xG: 0
      })
    }
  }
)

watch(() => store.orderedFixturesWithPredictions, (value, oldValue) => {
  if (value.length > 0) {
    if (oldValue !== value) {
      let exists = value.find(x => x.fixtureId === props.fixture.id)
      if (exists) {
        completePrediction.value = exists
        hasCompletePrediction.value = true
      }
    }
  }
})

const showDate = ref<boolean>(false)
const first = !props.complete 
  ? store.orderedCompletedFixturesWithPredictions.find(x => new Date(x.date).toLocaleDateString() === new Date(props.fixture.date).toLocaleDateString())?.fixtureId
  : store.orderedFixtures.find(x => new Date(x.date).toLocaleDateString() === new Date(props.fixture.date).toLocaleDateString())?.id
if (first)
  showDate.value = first === props.fixtureId
  
</script>

<template>
  <div>

    <p text-center font-bold mt5 mb2 text-2xl underline v-if="showDate">{{new Date(fixture.date).toLocaleDateString()}}</p>
    <div mb1 grid style="grid-template-columns: 3fr 25px 3fr">
      <span px1 text-right inline-block>{{fixture.homeTeamName}}</span>
      <span mx-auto text-center px1 inline-block text-green-500>v</span> 
      <span px1 text-left inline-block>{{fixture.awayTeamName}}</span>
    </div>
    <div v-if="editPrediction"
    grid mb2 style="grid-template-columns: 3fr 25px 3fr">
    <input inputmode="numeric" rounded-sm justify-self-end mx1 inline-block w-10 text-center v-model="homePrediction" />
    <span text-center px1 inline-block text-gray-400>-</span>
    <input inputmode="numeric" rounded-sm justify-self-start mx1 inline-block w-10 text-center v-model="awayPrediction" />
  </div>
  <div v-if="store.newPredictions.some(x => x.fixtureId === props.fixture.id) && !props.editPrediction" mb1 grid style="grid-template-columns: 3fr 25px 3fr">
    <span rounded-sm justify-self-end mx1 inline-block w-10 text-center bg-green-700>{{homePrediction}}</span>
    <span text-center px1 inline-block text-gray-400>-</span>
    <span rounded-sm justify-self-start mx1 inline-block w-10 text-center bg-green-700>{{awayPrediction}}</span>
  </div>
  <div v-if="complete && !editPrediction"
    grid mb2 style="grid-template-columns: 3fr 25px 3fr">
    <span rounded-sm justify-self-end mx1 inline-block w-10 text-center bg-green-700>{{fixture.homeTeamGoals}}</span>
    <span text-center px1 inline-block text-gray-400>-</span>
    <span rounded-sm justify-self-start mx1 inline-block w-10 text-center bg-green-700>{{fixture.awayTeamGoals}}</span>
  </div>
</div>
</template>