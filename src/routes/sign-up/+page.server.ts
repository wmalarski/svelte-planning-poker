import { paths } from '$lib/utils/paths';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';

import type { Actions, PageServerLoad } from './$types';

import { formSchema } from './schema';

export const load: PageServerLoad = async () => {
	const form = await superValidate(valibot(formSchema));
	return { form };
};

export const actions = {
	default: async ({ locals: { supabase }, request, url }) => {
		const form = await superValidate(request, valibot(formSchema));

		if (!form.valid) {
			return fail(400, { form, message: 'Invalid request' });
		}

		const response = await supabase.auth.signUp({
			email: form.data.email,
			options: { emailRedirectTo: `${url.origin}${paths.signUpSuccess}` },
			password: form.data.password
		});

		if (response.error) {
			return fail(500, { form, message: response.error.message });
		}

		return { form, message: 'Please check your email for a magic link to log into the website.' };
	}
} satisfies Actions;
