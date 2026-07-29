import { LocalHabitRepository } from './repository/local.repository';
import { SupabaseHabitRepository } from './repository/supabase.repository';

export const HabitRepository = SupabaseHabitRepository;
