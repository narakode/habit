import { supabase } from '../supabase';

export function useAuth() {
  async function checkLoggedIn() {
    const { data, error } = await supabase.auth.getSession();

    return !error && !!data.session;
  }

  return { checkLoggedIn };
}
