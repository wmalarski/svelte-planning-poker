import type { Session } from '@supabase/supabase-js';
import type { Writable } from 'svelte/store';

import { createContext } from '$lib/utils/context';

export const sessionContext = createContext<Writable<Session | null>>();
