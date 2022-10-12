import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { IFixture } from '../types'
import { mande, Options, OptionsRaw } from 'mande'

const globalOptions: OptionsRaw = {
  headers: {
    'X-RapidAPI-Key': '315852a10dmsheb92b9dbbb0446dp1e8c37jsn76ac431971c5',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }
}

const api = mande('https://api-football-v1.p.rapidapi.com/v3', globalOptions)

export const useStore = defineStore('main', {
  state: () => ({
    fixtures: [] as IFixture[],
    loading: false
  }),
  getters: {
    orderedFixtures(): IFixture[] {
      if (this.fixtures.length === 0)
        return []
      try {
        let ordered = this.fixtures.sort((a, b) => new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime())
        return ordered
      } catch (error) {
        console.error(error)
        return []
      }
    }
  },
  actions: {
    async fetchFixtures() {
      const params: Options = {
        query: {
          league: '39',
          season: '2022',
          round: 'Regular Season - 10'
        }
      }
      try {
        this.loading = true
        const currentRound = "Regular Season - 10"
        const fixtureDate = new Date().toLocaleDateString()
        const existing = JSON.parse(localStorage.getItem('fixtures') || "")
        if (!existing 
          // Consider whether to re-fetch fixtures each day, or after each round.
          // || existing.fixtures[0].league.round !== currentRound
          || existing.date !== fixtureDate
        ) {
          const apiFixtures: any = await api.get('/fixtures', params).then((response) => { return response })
          this.fixtures = apiFixtures.response
          useStorage('fixtures', JSON.stringify({ fixtures: apiFixtures.response, date: fixtureDate }))
        }
      } 
      catch (error) {
        console.error(error)
        return error
      }
      finally {
        this.loading = false
      }
    }
  }
})