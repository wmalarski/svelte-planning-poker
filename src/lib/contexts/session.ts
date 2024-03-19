import type { Session } from '@supabase/supabase-js';

import { createContext } from '$lib/utils/context';

export const sessionContext = createContext<() => Session | null>();
