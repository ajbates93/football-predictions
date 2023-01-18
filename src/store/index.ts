import { defineStore } from 'pinia'
import { ICompletePredictedFixture, ICreatePrediction, IFixture, IPredictedFixture, IPrediction } from '@/types'
import { usePrediction, useProfile } from '@/composables'

export const useStore = defineStore('main', {
  state: () => ({
    fixtures: [] as IFixture[],
    predictions: [] as IPrediction[],
    newPredictions: [] as ICreatePrediction[],
    loading: false,
    showLogIn: false,
    showLogOut: false,
    userProfile: {},
    gameweek: {
      title: 'Regular Season - 21',
      round: 21
    },
    selectedGameweek: 21
  }),
  getters: {
    initialGameweek(): string {
      return this.fixtures.length > 0 ? this.fixtures[0].round : this.gameweek.title
    },
    selectedGameweekTitle(): string {
      return `Regular Season - ${this.selectedGameweek}`
    },
    selectedGameweekNumber(): number {
      return this.selectedGameweek
    },
    orderedFixtures(): IFixture[] {
      if (this.fixtures.length === 0)
        return []
      try {
        let ordered = this.fixtures.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        return ordered
      } catch (error) {
        console.error(error)
        return []
      }
    },
    orderedFixturesWithPredictions(): IPredictedFixture[] {
      if (this.fixtures.length === 0 || this.predictions.length === 0)
        return []
      try {
        let fixtures = this.orderedFixtures
        let predictions = this.predictions
        let combined: IPredictedFixture[] = []
        predictions.map((x, idx) => {
          let f = fixtures.find(y => y.id === x.fixtureId)
          if (f) {
            let c: IPredictedFixture = {
              id: x.id,
              date: f.date,
              fixtureId: f.id,
              predictionId: x.id,
              homeTeamName: f.homeTeamName,
              homeTeamGoals: x.homeGoals,
              awayTeamName: f.awayTeamName,
              awayTeamGoals: x.awayGoals,
            }
            combined.push(c)
          }
        })
        return combined
      } 
      catch (error) {
        console.error(error)
        return []
      }
    },
    orderedCompletedFixturesWithPredictions(): ICompletePredictedFixture[] {
      const predictedFixtures = this.orderedFixturesWithPredictions
      try {
        let fixtures = this.orderedFixtures
        let complete: ICompletePredictedFixture[] = []
        predictedFixtures.map(x => {
          let f = fixtures.find(y => y.id === x.fixtureId)
          if (f) {
            let cpf: ICompletePredictedFixture = {
              ...x,
              actualHomeTeamGoals: f.homeTeamGoals,
              actualAwayTeamGoals: f.awayTeamGoals
            }

            complete.push(cpf)
          }
        })
        return complete
      } catch (error) {
        console.error(error)
        return []
      }
    },
    allFixturesSaved(): boolean {
      const fIds = this.fixtures.map(x => x.id)
      const npfIds = this.newPredictions.map(x => x.fixtureId)

      const intersection = fIds.filter(x => npfIds.includes(x))
      return intersection.length === fIds.length
    },
    allFixturesComplete(): boolean {
      return this.fixtures.every(x => x.status === 'Match Finished')
    },
    allPredictionsSubmitted(): boolean {
      const fIds = this.fixtures.map(x => x.id)
      const pfIds = this.predictions.map(x => x.fixtureId)

      const intersection = fIds.filter(x => pfIds.includes(x))
      return intersection.length === fIds.length
    }
  },
  actions: {
    async fetchFixtures(round: string) {
      const { fetchFixturesFromDB } = usePrediction()
      try {
        this.loading = true
        const res = await fetchFixturesFromDB(round)
        this.fixtures = res
      } 
      catch (error) {
        console.error(error)
        return error
      }
      finally {
        this.loading = false
      }
    },
    async fetchPredictions() {
      const { fetchPredictionsFromDB } = usePrediction()
      try {
        const predictions = await fetchPredictionsFromDB(this.fixtures)
        this.predictions = predictions as IPrediction[]
      } catch (ex: any) {
        console.error(ex)
      }
    },
    savePrediction(prediction: ICreatePrediction) {
      const pIdx = this.predictions.findIndex(x => x.fixtureId === prediction.fixtureId)
      if (pIdx === -1) 
        this.newPredictions.push(prediction)
      else 
        this.newPredictions[pIdx] = prediction
    },
    insertPredictions() {
      const { addAllPredictions } = usePrediction()
      if (this.newPredictions.length > 0)
        addAllPredictions(this.newPredictions)
    },
    fetchUserProfile() {
      const { fetchProfile } = useProfile()
      this.userProfile = fetchProfile()
    },
    toggleShowLogIn(show: boolean) {
      this.showLogIn = show
    }
  }
})