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
	const { session } = await parent();

	if (!session) {
		return redirect(302, paths.signIn);
	}

	const [roomsResult, form] = await Promise.all([
		selectsRoom({ ownerId: session.user.id, supabase }),
		superValidate(valibot(formSchema))
	]);

	const rooms = roomsResult.data || [];

	return { form, rooms };
};

export const actions = {
	default: async ({ locals: { supabase }, request }) => {
		const form = await superValidate(request, valibot(formSchema));

		if (!form.valid) {
			return fail(400, { form, message: 'Invalid request' });
		}

		const response = await insertRoom({
			description: form.data.description,
			name: form.data.name,
			supabase
		});

		if (response.error) {
			return fail(500, { form, message: response.error.message });
		}

		return redirect(302, paths.room(response.data.id));
	}
} satisfies Actions;
