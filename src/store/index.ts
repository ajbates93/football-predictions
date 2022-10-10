import { defineStore } from 'pinia'
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
    fixtures: [] as IFixture[]
  }),
  getters: {
    orderedFixtures(): IFixture[] {
      if (this.fixtures.length === 0)
        return []
      console.log('trying the ordering')
      try {
        let ordered = this.fixtures.sort((a, b) => a.date.getTime() - b.date.getTime())
        return ordered
      } catch (error) {
        console.error(error)
        return []
      }
    }
  },
  actions: {
    async fetchFixtures() {
      console.log('pre-fetch:', this.fixtures)
      const params: Options = {
        query: {
          league: '39',
          season: '2022',
          round: 'Regular Season - 10'
        }
      }
      try {
        const apiFixtures: any = await api.get('/fixtures', params).then((response) => { return response })
        this.fixtures = apiFixtures.response
        console.log('post-fetch:', this.fixtures)
      } 
      catch (error) {
        console.error(error)
        return error
      }
    }
  }
})