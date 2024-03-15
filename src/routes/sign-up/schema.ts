import { email, object, string } from 'valibot';

export const formSchema = object({
	email: string([email()]),
	password: string()
});

export type FormSchema = typeof formSchema;
