import { useAuthUser, useSupabase } from '@/composables'
import { ILeague, IProfile } from '@/types'


export default function useProfile() {
  const { user } = useAuthUser()
  const { supabase } = useSupabase()

  const fetchProfileFromDb = async () => {
    const userId = user.value?.id
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('userId', userId)
      .single()

    if (error) throw error

    if (data)
      return data as IProfile
    // if profile doesn't exist, then create
    else {
      const create = createProfileOnDb()
      return create
    }
  }

  const createProfileOnDb = async () => {
    const now = new Date()
    const userId = user.value?.id
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        userId: userId,
        createdAt: now,
        modifiedAt: null,
        teamName: '',
        points: 0,
        firstName: '',
        lastName: ''
      })
      .select()
      .single()

    if (error) throw error

    return data as IProfile
  }

  const fetchLeaguesFromDb = async () => {
    const userId = user.value?.id
    if (!userId)
      return
    const { data, error } = await supabase
      .from('leagues')
      .select()
      .eq('created_by', userId)

    if (error) console.error(error)

    return data as ILeague[]
  }

  const createLeagueOnDb = async (leagueName: string) => {
    const userId = user.value?.id
    const now = new Date()
    if (!userId)
      return
    const { data, error } = await supabase
      .from('leagues')
      .insert({
        created_at: now,
        modified_at: null,
        created_by: userId,
        name: leagueName
      })
      .select()
      .single()

    if (error) console.error(error)

    return data as ILeague
  }

  return {
    fetchProfileFromDb,
    createProfileOnDb,
    fetchLeaguesFromDb,
    createLeagueOnDb
  }
}