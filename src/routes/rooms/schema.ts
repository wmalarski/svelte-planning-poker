import {
	type BaseSchema,
	type Input,
	type Output,
	maxLength,
	minLength,
	object,
	string
} from 'valibot';

const schema = object({
	description: string([minLength(3), maxLength(150)]),
	name: string([minLength(3), maxLength(30)])
});

export type FormSchema = typeof schema;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formSchema = schema as any as BaseSchema<Input<FormSchema>, Output<FormSchema>>;
