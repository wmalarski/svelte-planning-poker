<script context="module" lang="ts">
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	import type { FormPath, SuperForm } from 'sveltekit-superforms';
	type T = Record<string, unknown>;
	type U = unknown;
</script>

<script
	generics="T extends Record<string, unknown>, U extends FormPath<T>"
	lang="ts"
>
	import { cn } from '$lib/components/ui/utils.js';
	import * as FormPrimitive from 'formsnap';

	type $$Props = FormPrimitive.FieldsetProps<T, U>;

	export let form: SuperForm<T>;
	export let name: U;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<FormPrimitive.Fieldset
	class={cn('space-y-2', className)}
	{form}
	let:constraints
	let:errors
	let:tainted
	let:value
	{name}
>
	<slot {constraints} {errors} {tainted} {value} />
</FormPrimitive.Fieldset>
