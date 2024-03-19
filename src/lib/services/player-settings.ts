import type { Cookies } from '@sveltejs/kit';

import { type Output, parse } from 'valibot';

import { type FormSchema, formSchema } from '../../routes/room/[roomId]/schema';

const PLAYER_SETTINGS_COOKIE_KEY = 'player-settings';

export const setPlayerSettingsCookie = (data: Output<FormSchema>, cookies: Cookies) => {
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
		const result = parse(formSchema, parsed);
		return result;
	} catch {
		return null;
	}
};
