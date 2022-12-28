<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from '../store'

const store = useStore()

watch(() => store.selectedGameweekTitle, (value) => store.fetchFixtures(value))
</script>

<template>
  <div flex items-stretch justify-around
    rounded inline-block mx-auto w-70 text-white bg-dark border="1px solid #2f2f2f" text-center mb5>
    <button py-2 px-2 text-lg @click="store.selectedGameweek--"><i block i-carbon-chevron-left text-white></i></button>
    <div py-2 px-5 border="l r #2f2f2f solid" grow-2>
      Gameweek {{ store.selectedGameweek }}
    </div>
    <button pa-1 text-lg @click="store.selectedGameweek++"><i block i-carbon-chevron-right text-white></i></button>
  </div>
</template>
