
export interface IFixture {
  fixture: {
    date: Date,
    id: number,
    status: {
      long: string,
      short: string
    }
  },
  goals: {
    away: number,
    home: number
  }, 
  league: {
    id: number,
    round: string,
    season: number
  },
  score: {
    fulltime: {
      away: number,
      home: number
    }
  }, 
  teams: {
    away: {
      id: number,
      logo: string,
      name: string,
      winner: boolean
    },
    home: {
      id: number,
      logo: string,
      name: string,
      winner: boolean
    }
  }
}

export interface IPredictedFixture {
  id: number,
  fixtureId: number,
  predictionId: number,
  homeTeam: string,
  homeGoals: number,
  awayTeam: string,
  awayGoals: number
}

export interface IPrediction {
  id?: number | null,
  fixtureId: number,
  homeGoals: number,
  awayGoals: number,
  xG: number
}