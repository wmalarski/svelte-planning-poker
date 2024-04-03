import {
	getPlayerSettingsCookie,
	setPlayerSettingsCookie
} from '$lib/server/players';
import { playerCookieSchema } from '$lib/types/models';
import { type RequestHandler, json } from '@sveltejs/kit';
import { safeParseAsync } from 'valibot';

export const POST: RequestHandler = async ({ cookies, request }) => {
	const player = getPlayerSettingsCookie(cookies);
	const parsed = await safeParseAsync(playerCookieSchema, await request.json());

	if (!parsed.success || !player) {
		return json({ message: 'Invalid request' }, { status: 400 });
	}

	setPlayerSettingsCookie(
		{ ...player, ...parsed.output, id: player.id },
		cookies
	);

	return json({ message: 'Success' });
};
