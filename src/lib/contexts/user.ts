import type { User } from '@supabase/supabase-js';

import { createContext } from '$lib/utils/context';

export const userContext = createContext<() => User | undefined>();
