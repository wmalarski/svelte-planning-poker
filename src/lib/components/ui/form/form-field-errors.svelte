<script lang="ts">
	import { cn } from '$lib/components/ui/utils.js';
	import * as FormPrimitive from 'formsnap';

	type $$Props = {
		errorClasses?: null | string | undefined;
	} & FormPrimitive.FieldErrorsProps;

	let className: $$Props['class'] = undefined;
	export { className as class };
	export let errorClasses: $$Props['class'] = undefined;
</script>

<FormPrimitive.FieldErrors
	class={cn('text-sm font-medium text-destructive', className)}
	{...$$restProps}
	let:errorAttrs
	let:errors
	let:fieldErrorsAttrs
>
	<slot {errorAttrs} {errors} {fieldErrorsAttrs}>
		{#each errors as error}
			<div {...errorAttrs} class={cn(errorClasses)}>{error}</div>
		{/each}
	</slot>
</FormPrimitive.FieldErrors>
