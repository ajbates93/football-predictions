import { ICompletePredictedFixture, IPrediction, IPredictionResult } from "@/types";

export default function usePoints() {
  const pr: IPredictionResult = {
    correctScore: false,
    correctResult: false,
    noPoints: true
  }
  const evaluate = (prediction: IPrediction, result: ICompletePredictedFixture) => {
    if (prediction.awayGoals === result.actualAwayTeamGoals && prediction.homeGoals === result.actualHomeTeamGoals) {
      pr.correctScore = true
      pr.correctResult = true
      pr.noPoints = false
    }
    if ((prediction.awayWin && result.actualAwayTeamGoals > result.actualHomeTeamGoals)
    || (prediction.homeWin && result.actualHomeTeamGoals > result.actualAwayTeamGoals)) {
      pr.correctResult = true
      pr.noPoints = false
    }
    return pr
  }

  return { evaluate }
}