<script lang="ts">
	import { cn } from '$lib/components/ui/utils.js';
	import { Button as ButtonPrimitive } from 'bits-ui';

	import { Spinner } from '../spinner';
	import { type Events, type Props, buttonVariants } from './index.js';

	type $$Props = Props;
	type $$Events = Events;

	let className: $$Props['class'] = undefined;
	export let variant: $$Props['variant'] = 'default';
	export let size: $$Props['size'] = 'default';
	export let builders: $$Props['builders'] = [];
	export let isLoading: boolean = false;
	export { className as class };
</script>

<ButtonPrimitive.Root
	{builders}
	class={cn(buttonVariants({ className, size, variant }))}
	type="button"
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
	{#if isLoading}
		<Spinner />
	{/if}
</ButtonPrimitive.Root>
