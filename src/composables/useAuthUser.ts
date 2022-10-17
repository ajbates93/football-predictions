import { ref } from 'vue'
import { supabase } from '../db'
import { SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from '@supabase/supabase-js'
const user = ref(null)

interface RegisterProps {
  email: string,
  password: string,
  meta: any
}

export default function useAuthUser() {
  const register = async (credentials: SignUpWithPasswordCredentials) => {
    const { data, error } = await supabase.auth.signUp(credentials)
  }

  const signIn = async (credentials: SignInWithPasswordCredentials) => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials)
  }
  
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
  }

  return {
    user,
    register,
    signIn,
    signInWithGoogle,
    signOut
  }
}