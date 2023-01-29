
export interface IApiResponse {
  errors: null,
  paging: null,
  parameters: [],
  response: [],
  results: number,
}

export interface IRawFixture {
  fixture: {
    date: Date,
    id: number,
    status: {
      long: string,
      short: string
    },
    venue: {
      id: number,
      name: string
    }
  },
  goals: {
    away: number,
    home: number
  }, 
  league: {
    id: number,
    name: string,
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

export interface IFixture {
  id: number,
  created_at: Date,
  modified_at: Date,
  date: Date,
  homeTeamName: string,
  awayTeamName: string,
  homeTeamGoals: number,
  awayTeamGoals: number,
  leagueId: number,
  leagueName: string,
  round: string,
  roundInt: number,
  status: string,
  venueId: number,
  venueName: string
}

export interface IPredictedFixture {
  id: number,
  date: Date,
  fixtureId: number,
  predictionId: number,
  homeTeamName: string,
  homeTeamGoals: number,
  awayTeamName: string,
  awayTeamGoals: number
}

export interface ICompletePredictedFixture extends IPredictedFixture {
  actualHomeTeamGoals: number,
  actualAwayTeamGoals: number
}

export interface IPrediction {
  id: number,
  userId: string,
  fixtureId: number,
  dateSubmitted: Date,
  dateModified?: Date,
  homeGoals: number,
  awayGoals: number,
  homeWin: boolean,
  awayWin: boolean,
  xGprediction: number,
  gameComplete: boolean,
  roundComplete: boolean,
  pointsScored: number
}

export interface ICreatePrediction {
  id: number,
  fixtureId: number,
  homeGoals: number,
  awayGoals: number,
  xG: number
}

export interface ILeague {
  id: number,
  created_at: Date,
  modified_at: Date,
  created_by: string,
  name: string
}

export interface IProfile {
  id: number,
  userId: string,
  firstName: string,
  lastName: string,
  createdAt: Date,
  modifiedAt: Date,
  teamName: string,
  points: number
}

export interface IPredictionResult {
  correctScore: boolean,
  correctResult: boolean,
  noPoints: boolean
}