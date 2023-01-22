import { ref } from 'vue'
import useSupabase from './useSupabase'
import { SignInWithPasswordCredentials, Session } from '@supabase/supabase-js'
const user = ref<Session["user"] | null>(null)

export default function useAuthUser() {
  const { supabase } = useSupabase()
  
  const register = async ({ email, password, ...meta }: { email: string, password: string, meta: any}) => {
    const { data, error } = await supabase.auth.signUp({
      email, password, options: {
        data: meta,
        emailRedirectTo: "${window.location.origin}/email-confirmation?confirmationSuccess=true"
      }, 
    })
    if (error) throw error
  }

  const signIn = async (credentials: SignInWithPasswordCredentials) => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials)
    if (error) throw error
  }
  
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const isLoggedIn = () => {
    return !!user.value
  }

  const isAdmin = () => {
    return !!user.value && user.value.email === "ajbates93@gmail.com"
  }

  const sendPasswordResetEmail = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
  }

  return {
    user,
    register,
    signIn,
    signInWithGoogle,
    signOut,
    isLoggedIn,
    isAdmin,
  }
}