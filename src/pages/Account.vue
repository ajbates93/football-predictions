<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthUser } from '@/composables'
import { useStore } from '@/store'
import { ComponentWrapper, Loading } from '@/components'
const { user, isLoggedIn } = useAuthUser()
const store = useStore()

const toggleCreate = ref<boolean>(false)
const newLeague = ref<string>('')
const loading = ref<boolean>(false)

const submit = async () => {
  loading.value = true
  try {
    await store.createLeague(newLeague.value)
    toggleCreate.value = false
    newLeague.value = ''
  } catch (ex: any) {
    console.error(ex)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  loading.value = true
  const [ profile, leagues ] = await Promise.allSettled([
    await store.fetchUserProfile(),
    await store.fetchUserLeagues()
  ])
  loading.value = false
})

</script>

<template>
  <section text-center mx-auto class="bg-[#242424]" py-20 v-if="isLoggedIn()">
    <ComponentWrapper>
      <div text-left px-3 mx-auto max-w-7xl v-if="isLoggedIn() && store.userProfile && user">
        <div text-5xl font-bold mb5 flex>
          <picture w-22>
            <img :src="user.user_metadata.avatar_url" alt="profile image"  rounded-xl border="4 green-600"/>
          </picture>
          <div ml-5>
            <div text-5xl v-if="store.userProfile">{{ store.userProfile.firstName }} {{ store.userProfile.lastName }}</div>
            <div text-5xl v-else>{{ user.user_metadata.full_name }}</div>
            <div text-lg text-gray-400 mt-2 flex items-center>
              <span mr-2>{{ user.user_metadata.email }}</span>
              <span v-if="user.user_metadata.email_verified" inline-block inline-flex items-center text-sm rounded bg-green-600 text-white px-2 py-1>
                <i inline-block i-carbon-checkmark-outline text-white
                  mr-1></i>
                Email Verified!
              </span>
            </div>
          </div>
        </div>
        <h5 py5 border="t [#313131]" text-3xl font-bold>Team name: {{ store.userProfile.teamName }}</h5>
        <h5 text-3xl font-bold py5 border="t [#313131]">Leagues</h5>
        <div v-if="store.userLeagues.length > 0" my5 grid grid-cols-3 gap-2 bg-truegray-900 px5 py4 rounded-lg>
          <div font-bold>League Name</div>
          <div font-bold>Position</div>
          <div font-bold>Number of Teams</div>
          <template v-if="loading">
            <Loading class="mx-auto text-center" />
          </template>
          <template v-else>
            <template v-for="league in store.userLeagues">
              <div>{{ league.name }}</div>
              <div>8th</div>
              <div>24</div>
            </template>
          </template>
        </div>
        <p v-else class='bg-#343434' inline-block px2 rounded-sm py2 text-lg>😟 Looks like you're not in any leagues. Join a league with a code or create your own!</p>
        <div flex items-center>
          <button inline-block mr1 my5 text-xl bg-green-600 text-white rounded-sm px3 py1>Join League</button>
          <button @click="toggleCreate = !toggleCreate" inline-block ml1 my5 text-xl bg-green-600 text-white rounded-sm px3 py1>Create League</button>
        </div>
        <div v-if="toggleCreate" flex items-center>
          <input v-model="newLeague" px2 py1 />
          <button @click="submit" inline-block ml1 my5 text-xl bg-green-600 text-white rounded-sm px3 py1>Submit</button>
        </div>
      </div>
    </ComponentWrapper>
  </section>
</template>
