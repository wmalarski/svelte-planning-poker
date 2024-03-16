import { paths } from '$lib/utils/paths';
import { fail } from '@sveltejs/kit';
import { decode } from 'decode-formdata';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { type BaseSchema, type Input, type Output, safeParseAsync } from 'valibot';

import type { Actions, PageServerLoad } from './$types';

import { type FormSchema, formSchema } from './schema';

export const load: PageServerLoad = async () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const schema = formSchema as any as BaseSchema<Input<FormSchema>, Output<FormSchema>>;
	return {
		form: await superValidate(valibot(schema))
	};
};

export const actions = {
	default: async ({ locals: { supabase }, request, url }) => {
		const form = await request.formData();
		const parsed = await safeParseAsync(formSchema, decode(form));

		if (!parsed.success) {
			return fail(400, { issues: parsed.issues, message: 'Invalid request', success: false });
		}

		const response = await supabase.auth.signUp({
			email: parsed.output.email,
			options: { emailRedirectTo: `${url.origin}${paths.signUpSuccess}` },
			password: parsed.output.password
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