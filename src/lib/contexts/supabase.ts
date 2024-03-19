import type { Database } from '$lib/types/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Writable } from 'svelte/store';

import { createContext } from '$lib/utils/context';

export const supabaseContext =
	createContext<Writable<SupabaseClient<Database>>>();
