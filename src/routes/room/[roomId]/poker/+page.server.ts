import { paths } from '$lib/utils/paths';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';

import type { Actions, PageServerLoad } from './$types';

import { getPlayerSettingsCookie } from '../player-settings';
import { formSchema } from './schema';

export const load: PageServerLoad = async ({ cookies, locals: { supabase }, params }) => {
	const player = getPlayerSettingsCookie(cookies);

	if (!player) {
		return redirect(302, paths.room(params.roomId));
	}

	const [tasksResult, addTaskForm] = await Promise.all([
		supabase.from('tasks').select().eq('room_id', params.roomId).range(0, 100),
		superValidate(valibot(formSchema))
	]);
	const tasks = tasksResult.data || [];

	return { addTaskForm, player, tasks };
};

export const actions = {
	createTask: async ({ locals: { supabase }, params, request }) => {
		const form = await superValidate(request, valibot(formSchema));

		if (!form.valid) {
			return fail(400, { form, message: 'Invalid request' });
		}

		const response = await supabase
			.from('tasks')
			.insert({ content: form.data.content, finished: false, room_id: params.roomId })
			.select()
			.single();

		if (response.error) {
			return fail(500, { form, message: response.error.message });
		}

		return { form, message: 'Success', success: true };
	}
} satisfies Actions;
