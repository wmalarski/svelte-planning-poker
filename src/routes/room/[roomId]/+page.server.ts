import {
	getPlayerSettingsCookie,
	setPlayerSettingsCookie
} from '$lib/server/players';
import { paths } from '$lib/utils/paths';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';

import type { Actions, PageServerLoad } from './$types';

import { formSchema } from './schema';

export const load: PageServerLoad = async ({ cookies }) => {
	const player = getPlayerSettingsCookie(cookies);
	const form = await superValidate(player, valibot(formSchema));
	return { form, player };
};

export const actions = {
	default: async ({ cookies, locals: { getUser }, params, request }) => {
		const [form, user] = await Promise.all([
			superValidate(request, valibot(formSchema)),
			getUser()
		]);

		if (!form.valid) {
			return fail(400, { form, message: 'Invalid request' });
		}

		const playerId = user?.id ?? crypto.randomUUID();
		setPlayerSettingsCookie({ ...form.data, id: playerId }, cookies);

		return redirect(302, paths.poker(params.roomId));
	}
} satisfies Actions;
