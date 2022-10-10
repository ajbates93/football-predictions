<script setup lang="ts">
import { computed, ref } from 'vue';
import { IFixture } from './types'
import { useStore } from './store'

const store = useStore()

store.fetchFixtures()

// const fixtures = ref<IFixture[] | null>()
const fixtures = ref(store.orderedFixtures)
const fixturesByDate = computed(() => {
  // return fixtures.value ? fixtures.value.sort((a, b) => a.date.getTime() - b.date.getTime()) : []
  return fixtures.value ? fixtures.value.sort((a, b) => a.date.getTime() - b.date.getTime()) : []
})

</script>

<template>
  <h1>Fixtures:</h1>
  <p v-for="fixture in fixtures" :key="fixture.id">{{fixture.homeTeam}} v {{fixture.awayTeam}}</p>
</template>
