<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../store'
import { IFixture } from '../types';

const store = useStore()
const { fixture, date, showPrediction } = defineProps<{
  fixture: IFixture,
  key: number,
  date: Date,
  showPrediction: boolean
}>()

const homePrediction = ref(0)
const awayPrediction = ref(0)

const savePrediction = () => {
  
}

const showDate = ref<boolean>(false)
const first = store.orderedFixtures.find(x => new Date(x.fixture.date).toLocaleDateString() === new Date(fixture.fixture.date).toLocaleDateString())
if (first)
  showDate.value = first.fixture.id === fixture.fixture.id
  
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