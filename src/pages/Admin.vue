<script setup lang="ts">
import { ref } from 'vue'
import { ComponentWrapper, Loading } from '@/components'
import { useAuthUser, usePrediction } from '@/composables'

const { isAdmin } = useAuthUser()
const { syncFixturesFromApiToDb, fetchLastSyncFromDB } = usePrediction()

const loading = ref(false)
const lastSync = ref<string>("")

const sync = async () => {
  loading.value = true
  await syncFixturesFromApiToDb()
  await fetchLastSync()
  loading.value = false
}

const fetchLastSync = async () => {
  const res = await fetchLastSyncFromDB()
  if (res)
    lastSync.value = new Date(res.sync_date).toLocaleDateString('en-UK')
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
      <Loading v-if="loading" />
    </ComponentWrapper>
  </section>
</template>
