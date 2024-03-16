import { maxLength, minLength, object, string } from 'valibot';

export const formSchema = object({
	description: string([minLength(3), maxLength(150)]),
	name: string([minLength(3), maxLength(30)])
});

export type FormSchema = typeof formSchema;
