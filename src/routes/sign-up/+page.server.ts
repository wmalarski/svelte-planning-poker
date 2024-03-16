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

const failure = true;

export const actions = {
	default: async ({ locals: { supabase }, request, url }) => {
		const form = await superValidate(request, valibot(formSchema));

		if (failure) {
			return fail(400, {
				message: 'Message',
				success: false
			});
		}

		if (!form.valid) {
			return fail(400, { message: 'Invalid request', success: false });
		}

		const response = await supabase.auth.signUp({
			email: form.data.email,
			options: { emailRedirectTo: `${url.origin}${paths.signUpSuccess}` },
			password: form.data.password
		});

		console.log({ response });

		if (response.error) {
			return fail(500, { message: 'Server error. Try again later.', success: false });
		}

		return {
			message: 'Please check your email for a magic link to log into the website.',
			success: true
		};
	}
} satisfies Actions;
