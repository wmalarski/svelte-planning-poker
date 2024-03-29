import type { Cookies } from '@sveltejs/kit';

import { type Output, boolean, object, optional, parse, string } from 'valibot';

const PLAYER_SETTINGS_COOKIE_KEY = 'player-settings';

export const playerCookieSchema = object({
	id: optional(string(), () => crypto.randomUUID()),
	name: string(),
	spectator: optional(boolean(), false)
});

export const setPlayerSettingsCookie = (
	data: Output<typeof playerCookieSchema>,
	cookies: Cookies
) => {
	const value = JSON.stringify(data);

	cookies.set(PLAYER_SETTINGS_COOKIE_KEY, value, {
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 7,
		path: '/',
		sameSite: 'strict'
	});
};

export const getPlayerSettingsCookie = (cookies: Cookies) => {
	const value = cookies.get(PLAYER_SETTINGS_COOKIE_KEY);

	if (!value) {
		return null;
	}

	try {
		const parsed = JSON.parse(value);
		const result = parse(playerCookieSchema, parsed);
		return result;
	} catch {
		return null;
	}
};
