import { playerCookieSchema } from '$lib/types/models';
import { type BaseSchema, type Input, type Output } from 'valibot';

export type FormSchema = typeof playerCookieSchema;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formSchema = playerCookieSchema as any as BaseSchema<
	Input<FormSchema>,
	Output<FormSchema>
>;
