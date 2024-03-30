import {
	getPlayerSettingsCookie,
	setPlayerSettingsCookie
} from '$lib/services/players';
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
	default: async ({ cookies, locals: { getSession }, params, request }) => {
		const [form, session] = await Promise.all([
			superValidate(request, valibot(formSchema)),
			getSession()
		]);

		if (!form.valid) {
			return fail(400, { form, message: 'Invalid request' });
		}

		const playerId = session?.user.id ?? crypto.randomUUID();
		setPlayerSettingsCookie({ ...form.data, id: playerId }, cookies);

		return redirect(302, paths.poker(params.roomId));
	}
} satisfies Actions;
