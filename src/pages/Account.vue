<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthUser } from '@/composables'
import { useStore } from '@/store'
import ComponentWrapper from '@/components/ComponentWrapper.vue'
const { user, isLoggedIn } = useAuthUser()
const store = useStore()

onMounted(() => {
  if (!store.userProfile)
    store.fetchUserProfile()
})

</script>

<template>
  <section text-center mx-auto class="bg-[#242424]" py-20 v-if="isLoggedIn()">
    <ComponentWrapper>
      <div text-left px-3 mx-auto max-w-7xl v-if="isLoggedIn() && user">
        <div text-5xl font-bold mb5 flex>
          <picture w-22>
            <img :src="user.user_metadata.avatar_url" alt="profile image"  rounded-xl border="4 green-600"/>
          </picture>
          <div ml-5>
            <div text-5xl>{{ user.user_metadata.full_name }}</div>
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
        <h5 py5 border="t [#313131]" text-3xl font-bold>Team name: Leeds United</h5>
        <h5 text-3xl font-bold py5 border="t [#313131]">Leagues</h5>
        <div my5 grid grid-cols-3 gap-2 bg-truegray-900 px5 py4 rounded-lg>
          <div font-bold>League Name</div>
          <div font-bold>Position</div>
          <div font-bold>Number of Teams</div>
          <div>League of Big Daigs</div>
          <div>8th</div>
          <div>24</div>
        </div>
        <p class='bg-#343434' inline-block px2 rounded-sm py2 text-lg>😟 Looks like you're not in any leagues. Join a league with a code or create your own!</p>
        <div flex items-center>
          <button inline-block mr1 my5 text-xl bg-green-600 text-white rounded-sm px3 py1>Join League</button>
          <button inline-block ml1 my5 text-xl bg-green-600 text-white rounded-sm px3 py1>Create League</button>
        </div>
      </div>
    </ComponentWrapper>
  </section>
</template>
