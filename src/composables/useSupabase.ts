import { IProfile } from '@/types'
import { createClient } from '@supabase/supabase-js'
import { ref } from 'vue'
import useAuthUser from './useAuthUser'
import useProfile from './useProfile'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const profile = ref<IProfile | null>(null)

supabase.auth.onAuthStateChange(async(event, session) => {
  const { user } = useAuthUser()
  const { fetchProfileFromDb } = useProfile()

  user.value = session?.user || null
  profile.value = await fetchProfileFromDb()

})

export default function useSupabase() {
  return { supabase }
}