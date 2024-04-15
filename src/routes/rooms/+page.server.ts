import { insertRoom, selectsRoom } from '$lib/services/rooms';
import { paths } from '$lib/utils/paths';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';

import type { Actions, PageServerLoad } from './$types';

import { formSchema } from './schema';

export const load: PageServerLoad = async ({
	locals: { supabase },
	parent
}) => {
	const { user } = await parent();

	if (!user) {
		return redirect(302, paths.signIn);
	}

	const [roomsResult, form] = await Promise.all([
		selectsRoom({ ownerId: user?.id, supabase }),
		superValidate(valibot(formSchema))
	]);

	const rooms = roomsResult.data || [];

	return { form, rooms };
};

export const actions = {
	default: async ({ locals: { getUser, supabase }, request }) => {
		const [form, user] = await Promise.all([
			superValidate(request, valibot(formSchema)),
			getUser()
		]);

		if (!form.valid || !user?.id) {
			return fail(400, { form, message: 'Invalid request' });
		}

		const response = await insertRoom({
			description: form.data.description,
			name: form.data.name,
			playerId: user.id,
			supabase
		});

		if (response.error) {
			return fail(500, { form, message: response.error.message });
		}

		return redirect(302, paths.room(response.data.id));
	}
} satisfies Actions;
