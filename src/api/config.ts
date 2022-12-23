import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api-football-v1.p.rapidapi.com/v3',
  headers: {
    'X-RapidAPI-Key': '315852a10dmsheb92b9dbbb0446dp1e8c37jsn76ac431971c5',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }
})