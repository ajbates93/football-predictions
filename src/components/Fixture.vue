<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from '../store'
import { IFixture } from '../types';

const store = useStore()
const props = defineProps<{
  fixture: IFixture
  showPrediction: boolean,
  savePrediction: boolean
}>()

const homePrediction = ref(0)
const awayPrediction = ref(0)

watch(() =>  props.savePrediction, () => {
  if (props.savePrediction)
    store.savePrediction({
      id: 0,
      fixtureId: props.fixture.fixture.id,
      homeGoals: homePrediction.value,
      awayGoals: awayPrediction.value,
      xG: 0
    })
})

const showDate = ref<boolean>(false)
const first = store.orderedFixtures.find(x => new Date(x.fixture.date).toLocaleDateString() === new Date(props.fixture.fixture.date).toLocaleDateString())
if (first)
  showDate.value = first.fixture.id === props.fixture.fixture.id
  
</script>

<template>
  <p mt5 mb1 text-xl v-if="showDate">{{new Date(fixture.fixture.date).toLocaleDateString()}}</p>
  <div grid style="grid-template-columns: 3fr 1fr 3fr">
    <span px1 text-right inline-block>{{fixture.teams.home.name}}</span>
    <span grid-col-a text-center px1 inline-block>v</span> 
    <span px1 text-left inline-block>{{fixture.teams.away.name}}</span>
  </div>
  <div v-if="showPrediction">
    <input type="number" v-model="homePrediction" />
    <span></span>
    <input type="number" v-model="awayPrediction" />
  </div>
</template>