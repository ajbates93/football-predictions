import { supabase } from '../db'
import { useStorage } from '@vueuse/core'

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google'
  })
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
}

export const userLoggedIn = async () => {
  const res = await supabase.auth.getUser()
  return res
}