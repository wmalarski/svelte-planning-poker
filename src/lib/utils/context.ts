import { getContext, setContext } from 'svelte';

/**
 * The context object.
 */
export type Context<T> = {
	get: () => T;
	set: (ctx: T) => T;
};

function randomContextName() {
	return `$$context_${crypto.randomUUID()}`;
}

/**
 * Creates a context.
 */
export function createContext<T>(key = randomContextName()): Context<T> {
	return {
		get: () => getContext<T>(key),
		set: (ctx: T) => setContext(key, ctx)
	};
}
