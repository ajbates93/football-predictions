<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ComponentWrapper, Loading } from '@/components'
import { useAuthUser, usePrediction } from '@/composables'
import { useStore } from '@/store'

const { isAdmin } = useAuthUser()
const { syncFixturesFromApiToDb, fetchLastSyncFromDB, updatePredictionsWithResults } = usePrediction()
const store = useStore()

const loading = ref(false)
const syncCompleted = ref(false)
const lastSync = ref<string>("")

onMounted(async () => {
  await Promise.allSettled([
    await store.fetchFixtures(store.selectedGameweekTitle),
    await store.fetchPredictions()
  ])
})

const sync = async () => {
  try {
    loading.value = true
    await syncFixturesFromApiToDb()
    await fetchLastSync()
    syncCompleted.value = true
  }
  catch (ex: any) {
    console.error(ex)
  }
  finally {
    loading.value = false
  }
}

const awardPoints = async () => {
  try {
    loading.value = true
    await updatePredictionsWithResults(store.predictions, store.orderedCompletedFixturesWithPredictions)
  } 
  catch (ex: any) {
    console.error(ex)
  }
  finally {
    loading.value = false
  }
}

const fetchLastSync = async () => {
  const res = await fetchLastSyncFromDB()
  if (res) {
    lastSync.value = new Date(res.sync_date).toLocaleDateString('en-UK')
  }
  else
    lastSync.value = "Could not retrieve sync data."
}

fetchLastSync()

</script>

<template>
  <section text-center mx-auto class="bg-[#242424]" py-20>
    <ComponentWrapper>
      <h1 text-5xl font-bold mb5 text-center>Admin</h1>
      <p text-2xl my5>Use this button to sync the results of this week's fixtures to the Pred.io database.</p>
      <p text-2xl my5>Last sync: <span text-green-600>{{ lastSync }}</span></p>
      <button @click="sync" v-if="isAdmin()"
        :class="loading ? 'bg-gray' : 'bg-green-600'"
        text-2xl text-white rounded px3 py1 mx-2 
        :disabled="loading">{{ loading ? 'Syncing...' : 'Sync Results' }}</button>
      <button @click="awardPoints" v-if="isAdmin()"
        :class="loading ? 'bg-gray' : 'bg-green-600'"
        text-2xl text-white rounded px3 py1 mx-2 
        :disabled="loading">{{ loading ? 'Awarding Points...' : 'Award Points' }}</button>
      <Loading v-if="loading" />
      <div v-if="syncCompleted">
        <div inline-block mx-auto my5 p2 bg-gray-600 text-white rounded>Sync Completed!</div>
      </div>
    </ComponentWrapper>
  </section>
</template>
