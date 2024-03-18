import type { Database } from '$lib/types/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';

export type WithSupabase<T> = T & {
	supabase: SupabaseClient<Database>;
};
