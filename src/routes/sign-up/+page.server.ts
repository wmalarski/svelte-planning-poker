import type { BaseSchema, Input, Output } from 'valibot';

import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';

import type { PageServerLoad } from './$types.js';

import { type FormSchema, formSchema } from './schema';

export const load: PageServerLoad = async () => {
	const schema = formSchema as any as BaseSchema<Input<FormSchema>, Output<FormSchema>> & {
		expects: string;
	};
	return {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		form: await superValidate(valibot(schema))
	};
};
