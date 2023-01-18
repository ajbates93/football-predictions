import { useAuthUser, useSupabase } from '@/composables'
import { ICreatePrediction, IFixture, IPrediction, IRawFixture } from "@/types"
import { useExternalFixturesApi } from "@/api"

const { user } = useAuthUser()
const api = useExternalFixturesApi()

const parseIntFromRoundString = (x: string) => {
  const round = x.match(/\d+/)?.toString()
  let roundAsNum = 0
  if (round)
    roundAsNum = parseInt(round)

  return roundAsNum
}

export default function usePrediction() {
  const { supabase } = useSupabase()

  const fetchFixturesFromDB = async (round: string) => {
    const { data, error } = await supabase
      .from('fixtures')
      .select()
      .eq('round', round)
      .order('date')

    if (error) {
      console.error(error)
    }

    return data as IFixture[]
  }

  const syncFixturesFromApiToDb = async () => {
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
      roundInt: parseIntFromRoundString(fixture.league.round),
      status: fixture.fixture.status.long,
      venueId: fixture.fixture.venue.id,
      venueName: fixture.fixture.venue.name
    }))

    const { error } = await supabase
      .from('fixtures')
      .upsert(fixtures)

    if (error)
      console.error(error)
    else {
      const { error } = await supabase
        .from('syncs')
        .insert({ sync_date: now.toISOString() })

      if (error)
        console.error(error)
    }

  }

  const fetchPredictionsFromDB = async (fixtures: IFixture[]) => {
    const ids = fixtures.map(x => x.id)
    const { data, error } = await supabase
      .from('predictions')
      .select()
      .in('fixtureId', ids)

    if (error)
      console.error(error)

    return data
  }

  const fetchLastSyncFromDB = async () => {
    const { data, error } = await supabase
      .from('syncs')
      .select()
      .order('sync_date', { ascending: false })
      .limit(1)

    if (error)
      console.error(error)
    
    if (data)
      return data[0]
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

  const addAllPredictions = async (predictions: ICreatePrediction[]) => {
    let inserts = []
    
    for (let x = 0; x < predictions.length; x++) {
      const prediction = predictions[x]
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
      inserts.push(p)
    }

    const { error } = await supabase
      .from('predictions')
      .insert(inserts)
      // .upsert(inserts, { onConflict: 'fixtureId,userId'})

    if (error)
      throw error
  }

  return {
    fetchFixturesFromDB,
    fetchPredictionsFromDB,
    addPrediction,
    addAllPredictions,
    syncFixturesFromApiToDb,
    fetchLastSyncFromDB
  }
  
}