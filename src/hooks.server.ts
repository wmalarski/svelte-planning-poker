import type { Database } from '$lib/types/supabase';
import type { Handle } from '@sveltejs/kit';

import {
	PUBLIC_SUPABASE_ANON_KEY,
	PUBLIC_SUPABASE_URL
} from '$env/static/public';
import { getThemeModeCookie } from '$lib/utils/theme';
import { createServerClient } from '@supabase/ssr';

export const handle: Handle = ({ event, resolve }) => {
	event.locals.supabase = createServerClient<Database>(
		PUBLIC_SUPABASE_URL,
		PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				get: (key) => event.cookies.get(key),
				remove: (key, options) => {
					event.cookies.delete(key, { ...options, path: '/' });
				},
				set: (key, value, options) => {
					event.cookies.set(key, value, { ...options, path: '/' });
				}
			}
		}
	);

	event.locals.getUser = async () => {
		const result = await event.locals.supabase.auth.getUser();
		return result.data.user;
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		},
		transformPageChunk({ html }) {
			return html.replace('%theme%', getThemeModeCookie(event.cookies));
		}
	});
};
