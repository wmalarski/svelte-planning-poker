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
	content: string([minLength(3), maxLength(150)])
});

export type FormSchema = typeof schema;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formSchema = schema as any as BaseSchema<Input<FormSchema>, Output<FormSchema>>;
