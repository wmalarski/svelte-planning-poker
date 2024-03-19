import type { Database } from '$lib/types/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';

import { createContext } from '$lib/utils/context';

export const supabaseContext = createContext<() => SupabaseClient<Database>>();
