import { supabase } from '../../supabase';

export const AuthSupabaseService = {
  async getLoggedIn() {
    const { data, error } = await supabase.auth.getSession();

    return !error && !!data.session;
  },
  async loginWithGoogle() {
    supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  },
};
