import useSupabase from "./useSupabase";
import useAuthUser from '../composables/useAuthUser'
import { IFixture, IPrediction, IRawFixture } from "../types"
import { useExternalFixturesApi } from "../api"

const { user } = useAuthUser()
const api = useExternalFixturesApi()

export default function usePrediction() {
  const { supabase } = useSupabase()

  const fetchFixturesFromDB = async (round: string) => {
    const now = new Date()
    const { data, error } = await supabase
      .from('fixtures')
      .select()
      .eq('round', round)

    if (error) {
      console.error(error)
    }

    return data as IFixture[]

    // else {
    //   if (data?.length === 0)
    //     initFixtures()
    // }

  }

  const initFixtures = async () => {
    let rawFixtures = [] as IRawFixture[]
    const now = new Date()
    const { data, status } = await api.fetchFixtures()
    if (status !== 200)
      console.error(data.errors)
    if (data.errors.length > 0)
      console.error(data.errors)
    rawFixtures = data.response
    let fixtures = rawFixtures.map(fixture => ({
      id: fixture.fixture.id,
      created_at: now.toISOString(),
      modified_at: now.toISOString(),
      date: fixture.fixture.date,
      homeTeamName: fixture.teams.home.name,
      awayTeamName: fixture.teams.away.name,
      homeTeamGoals: fixture.goals.home,
      awayTeamGoals: fixture.goals.away,
      leagueId: fixture.league.id,
      leagueName: fixture.league.name,
      round: fixture.league.round,
      status: fixture.fixture.status.long,
      venueId: fixture.fixture.venue.id,
      venueName: fixture.fixture.venue.name
    }))

    const { error } = await supabase
      .from('fixtures')
      .insert(fixtures)

    if (error)
      console.error(error)
  }

  const fetchPredictionsFromDB = async (fixtures: IFixture[]) => {
    const ids = fixtures.map(x => x.id)
    const { data, error } = await supabase
      .from('predictions')
      .select()
      .in('fixtureId', ids)

    if (data) {
      let predictions: IPrediction[] = data.map(x => {
        let p: IPrediction = {
          id: x.id,
          fixtureId: x.fixtureId,
          homeGoals: x.homeGoals,
          awayGoals: x.awayGoals,
          xG: x.xGprediction
        }
        return p
      })
      return predictions
    }
  }

  const addPrediction = async (prediction: IPrediction) => {
    const p = {
      userId: user.value?.id,
      fixtureId: prediction.fixtureId,
      dateSubmitted: new Date(),
      dateModified: null,
      homeGoals: prediction.homeGoals,
      awayGoals: prediction.awayGoals,
      homeWin: prediction.homeGoals > prediction.awayGoals,
      awayWin: prediction.awayGoals > prediction.homeGoals,
      xGprediction: 0,
      gameComplete: false,
      roundComplete: false,
      pointsScored: 0
    }

    const { error } = await supabase
      .from('predictions')
      .insert(p)

    if (error)
      throw error
  }

  const addAllPredictions = async (predictions: IPrediction[]) => {
    let inserts = []
    
    for (let x = 0; x < predictions.length; x++) {
      const prediction = predictions[x]
      const p = {
        id: prediction.id,
        userId: user.value?.id,
        fixtureId: prediction.fixtureId,
        dateSubmitted: new Date(),
        dateModified: null,
        homeGoals: prediction.homeGoals,
        awayGoals: prediction.awayGoals,
        homeWin: prediction.homeGoals > prediction.awayGoals,
        awayWin: prediction.awayGoals > prediction.homeGoals,
        xGprediction: 0,
        gameComplete: false,
        roundComplete: false,
        pointsScored: 0
      }
      inserts.push(p)
    }

    const { error } = await supabase
      .from('predictions')
      .upsert(inserts)
      // .upsert(inserts, { onConflict: 'fixtureId,userId'})

    if (error)
      throw error
  }

  return {
    fetchFixturesFromDB,
    fetchPredictionsFromDB,
    addPrediction,
    addAllPredictions
  }
  
}