import type { Database } from '$lib/types/supabase';

import {
	PUBLIC_SUPABASE_ANON_KEY,
	PUBLIC_SUPABASE_URL
} from '$env/static/public';
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ depends, fetch }) => {
	depends('supabase:auth');

	const supabase = createBrowserClient<Database>(
		PUBLIC_SUPABASE_URL,
		PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				get(key) {
					if (!isBrowser()) {
						return null;
					}

					const cookie = parse(document.cookie);
					return cookie[key];
				}
			},
			global: { fetch }
		}
	);

	const result = await supabase.auth.getSession();

	return { supabase, user: result.data.session?.user };
};
