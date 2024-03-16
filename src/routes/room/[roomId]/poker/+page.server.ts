import { paths } from '$lib/utils/paths';
import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import { getPlayerSettingsCookie } from '../player-settings';

export const load: PageServerLoad = ({ cookies, params }) => {
	const player = getPlayerSettingsCookie(cookies);

	if (!player) {
		return redirect(302, paths.room(params.roomId));
	}

	return { player };
};
