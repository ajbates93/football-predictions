<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from '@/store'
import { IPredictedFixture, ICompletePredictedFixture, IPredictionResult } from '@/types';
import { usePoints } from '@/composables'

const store = useStore()
const props = defineProps<{
  fixture: ICompletePredictedFixture
  editPrediction: boolean,
  savePrediction: boolean,
  complete?: boolean,
  fixtureId: number
}>()

const { evaluate } = usePoints()

const homePrediction = ref(0)
const awayPrediction = ref(0)
const predictionResult = ref<IPredictionResult>()

const predictionFromDb = store.predictions.find(x => x.fixtureId === props.fixture.fixtureId)

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
const first = store.orderedCompletedFixturesWithPredictions.find(x => new Date(x.date).toLocaleDateString() === new Date(props.fixture.date).toLocaleDateString())?.fixtureId
if (first)
  showDate.value = first === props.fixture.fixtureId

if (predictionFromDb && props.complete) {
  predictionResult.value = evaluate(predictionFromDb, props.fixture)
}
  
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
  <div v-if="predictionFromDb"
    grid mb2 style="grid-template-columns: 3fr 25px 3fr">
    <span rounded-sm justify-self-end mx1 inline-block w-10 text-center bg-green-700>{{predictionFromDb.homeGoals}}</span>
    <span text-center px1 inline-block text-gray-400>-</span>
    <span rounded-sm justify-self-start mx1 inline-block w-10 text-center bg-green-700>{{predictionFromDb.awayGoals}}</span>
  </div>
  <div v-if="complete && !editPrediction"
    grid mb2 style="grid-template-columns: 3fr 25px 3fr">
    <span rounded-sm justify-self-end mx1 inline-block w-10 text-center bg-gray-600>{{fixture.actualHomeTeamGoals !== null ? fixture.actualHomeTeamGoals : 'PST' }}</span>
    <span text-center px1 inline-block text-gray-400>-</span>
    <span rounded-sm justify-self-start mx1 inline-block w-10 text-center bg-gray-600>{{fixture.actualAwayTeamGoals !== null ? fixture.actualAwayTeamGoals : 'PST' }}</span>
  </div>
  <div v-if="predictionFromDb && (predictionResult?.correctScore ||predictionResult?.correctResult)" py-1 px-2 rounded my2 inline-flex items-center :class="predictionResult?.correctScore ? 'bg-green-600' : predictionResult?.correctResult ? 'bg-yellow-500' : ''">
    {{ predictionResult?.correctScore ? 'Correct Score' : predictionResult?.correctResult ? 'Correct Result' : '' }}<i ml2 inline-block i-carbon-checkmark-outline text-white></i>
  </div>
</div>
</template>