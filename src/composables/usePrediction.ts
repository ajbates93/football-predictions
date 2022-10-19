import useSupabase from "./useSupabase";
import useAuthUser from '../composables/useAuthUser'
import { IFixture, IPrediction } from "../types";

const { user } = useAuthUser()

export default function usePrediction() {
  const { supabase } = useSupabase()

  const fetchPredictions = async (fixtures: IFixture[]) => {
    const ids = fixtures.map(x => x.fixture.id)
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
    fetchPredictions,
    addPrediction,
    addAllPredictions
  }
  
}