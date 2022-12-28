import { defineStore } from 'pinia'
import { IFixture, IPredictedFixture, IPrediction } from '../types'
import usePrediction from '../composables/usePrediction'
import useProfile from '../composables/useProfile'

export const useStore = defineStore('main', {
  state: () => ({
    fixtures: [] as IFixture[],
    predictions: [] as IPrediction[],
    loading: false,
    showLogIn: false,
    userProfile: {},
    gameweek: {
      title: 'Regular Season - 17',
      round: 17
    },
    selectedGameweek: 17
  }),
  getters: {
    initialGameweek(): string {
      return this.fixtures.length > 0 ? this.fixtures[0].round : this.gameweek.title
    },
    selectedGameweekTitle(): string {
      return `Regular Season - ${this.selectedGameweek}`
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
        predictions.map((x) => {
          let f = fixtures.find(y => y.id === x.fixtureId)
          if (f) {
            let c: IPredictedFixture = {
              id: 0,
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
    allFixturesPredicted(): boolean {
      const fIds = this.fixtures.map(x => x.id)
      const pfIds = this.predictions.map(x => x.fixtureId)

      const intersection = fIds.filter(x => pfIds.includes(x))
      return intersection.length === fIds.length
    },
    allFixturesComplete(): boolean {
      return this.fixtures.every(x => x.status === 'Match Finished')
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
    fetchPredictions() {
      const { fetchPredictionsFromDB } = usePrediction()
      fetchPredictionsFromDB(this.fixtures)
        .then((res: IPrediction[] | undefined) => {
          if (res)
            this.predictions = res
        })
    },
    savePrediction(prediction: IPrediction) {
      const pIdx = this.predictions.findIndex(x => x.fixtureId === prediction.fixtureId)
      if (pIdx === -1) 
        this.predictions.push(prediction)
      else 
        this.predictions[pIdx] = prediction
    },
    insertPredictions() {
      const { addAllPredictions } = usePrediction()
      if (this.predictions.length > 0)
        addAllPredictions(this.predictions)
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