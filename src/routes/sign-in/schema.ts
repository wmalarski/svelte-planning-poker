import {
	type BaseSchema,
	type Input,
	type Output,
	email,
	object,
	string
} from 'valibot';

const schema = object({
	email: string([email()]),
	password: string()
});

export type FormSchema = typeof schema;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formSchema = schema as any as BaseSchema<
	Input<FormSchema>,
	Output<FormSchema>
>;
