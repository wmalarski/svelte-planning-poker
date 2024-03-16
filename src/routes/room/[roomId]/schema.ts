import {
	type BaseSchema,
	type Input,
	type Output,
	boolean,
	object,
	optional,
	string
} from 'valibot';

const schema = object({
	name: string(),
	spectator: optional(boolean(), false)
});

export type FormSchema = typeof schema;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formSchema = schema as any as BaseSchema<Input<FormSchema>, Output<FormSchema>>;
