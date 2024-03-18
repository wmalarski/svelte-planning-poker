import { selectTasks } from '$lib/services/tasks';
import { paths } from '$lib/utils/paths';
import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import { getPlayerSettingsCookie } from '../player-settings';

export const load: PageServerLoad = async ({ cookies, locals: { supabase }, params }) => {
	const player = getPlayerSettingsCookie(cookies);

	if (!player) {
		return redirect(302, paths.room(params.roomId));
	}

	const tasks = await selectTasks({ roomId: params.roomId, supabase });

	return { player, tasks };
};
