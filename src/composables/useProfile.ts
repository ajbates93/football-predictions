import { useAuthUser, useSupabase } from '@/composables'

const { user } = useAuthUser()

export default function useProfile() {
  const { supabase } = useSupabase()

  const fetchProfile = async () => {
    const userId = user.value?.id
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('userId', userId)

    if (error) throw error

    if (data.length > 0)
      return data
    // if profile doesn't exist, then create
    else {
      const create = createProfile()
      return create
    }
  }

  const createProfile = async () => {
    const now = new Date()
    const userId = user.value?.id
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        userId: userId,
        createdAt: now,
        teamName: ''
      })
      .select()

    if (error) throw error

    return data
  }

  return {
    fetchProfile,
    createProfile
  }
}