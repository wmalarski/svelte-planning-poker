import { boolean, object, optional, string } from 'valibot';

export const formSchema = object({
	name: string(),
	spectator: optional(boolean(), false)
});

export type FormSchema = typeof formSchema;
