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
  async getUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      return [null, error];
    }

    return [data.user, error];
  },
  async getProfile() {
    const { data, error } = await supabase.from('user_profiles').select();

    if (error) {
      return [null, error];
    }

    if (!data.length) {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert({ timezone: Intl.DateTimeFormat().resolvedOptions().timeZone })
        .select();

      if (error) {
        return [null, error];
      }

      return [data[0], error];
    }

    return [data[0], error];
  },
  async logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return [null, error];
    }

    return [true, null];
  },
};
