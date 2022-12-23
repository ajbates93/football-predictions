import { IApiResponse } from '../types'
import { api } from './config'


export const useExternalFixturesApi = () => ({
  async fetchFixtures() {
    try { return await api.get<IApiResponse>('/fixtures?league=39&season=2022') } 
    catch (ex: any) { return ex.errors }
  }
})