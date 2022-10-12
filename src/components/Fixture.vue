<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../store'
import { IFixture } from '../types';

const store = useStore()
const { fixture, date } = defineProps<{
  fixture: IFixture,
  key: number,
  date: Date
}>()

const showDate = ref<boolean>(false)
  
</script>

<template>
  <p mb1 text-xl>{{new Date(fixture.fixture.date).toLocaleDateString()}}</p>
  <div grid style="grid-template-columns: 3fr 1fr 3fr">
    <span px1 text-right inline-block>{{fixture.teams.home.name}}</span>
    <span grid-col-a text-center px1 inline-block>v</span> 
    <span px1 text-left inline-block>{{fixture.teams.away.name}}</span>
  </div>
</template>