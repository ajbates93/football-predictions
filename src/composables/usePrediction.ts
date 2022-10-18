import useSupabase from "./useSupabase";
import useAuthUser from '../composables/useAuthUser'
import { IPrediction } from "../types";

const { user } = useAuthUser()

export default function usePrediction() {
  const { supabase } = useSupabase()

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

    if (error)
      throw error
  }

  return {
    addPrediction,
    addAllPredictions
  }
  
}